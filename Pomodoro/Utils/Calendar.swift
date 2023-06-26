//
//  Calendar.swift
//  Pomodoro
//
//  Created by David Speers on 15/06/2023.
//

import Foundation
import SwiftUI

func incrementTodaysWorkTimeMinutes(context: NSManagedObjectContext) {
    let today = Calendar.current.startOfDay(for: Date.now)
    let entry = getCalendarEntry(context: context, date: today)
    if let unwrappedEntry = entry {
        unwrappedEntry.workTimeMinutes = unwrappedEntry.workTimeMinutes + 1
    } else {
        let newEntry = CalendarEntry(context: context)
        newEntry.date = today
        newEntry.workTimeMinutes = 1
    }
    PersistenceController.shared.save()
}

func getEarliestCalendarEntryDate(context: NSManagedObjectContext) -> Date {
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "date == min(date)")
    fetchRequest.fetchLimit = 1
    // TODO: catch error
    return try! context.fetch(fetchRequest)[0].date ?? Date.now
}

func getCalendarEntriesForWeek(context: NSManagedObjectContext, date: Date) -> [CalendarGraphEntry] {
    let startOfWeekMonday = getMonday(myDate: date)
    let endOfWeekSunday = getSunday(myDate: date)
    return getCalendarEntriesBetweenTwoDates(context: context, beginDate: startOfWeekMonday, endDate: endOfWeekSunday).map {
        if let date = $0.date {
            return CalendarGraphEntry(date: date, workTimeMinutes: Int($0.workTimeMinutes))
            
        }
        else {
            // TODO: handle
            // TODO: why is workTimeMinutes not optional?
            return CalendarGraphEntry(date: Date.now, workTimeMinutes: Int($0.workTimeMinutes))
        }
    }
}

func getCalendarEntriesBetweenTwoDates(context: NSManagedObjectContext, beginDate: Date, endDate: Date) -> [CalendarEntry] {
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "(date >= %@) AND (date <= %@)", beginDate as NSDate, endDate as NSDate)
    fetchRequest.fetchLimit = 7
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    let allDates = getDatesBetween(beginDate: beginDate, endDate: endDate)
    
    return allDates.map { date in
        if let entry = calendarEntries.first(where: { $0.date == date }) {
            return entry
        } else {
            // TODO: are entries being created, and does this affect performance? I think since I'm not saving, they aren't. And performance affect should be neglible.
            let emptyEntry = CalendarEntry(context: context)
            emptyEntry.date = date
            emptyEntry.workTimeMinutes = 0
            return emptyEntry
        }
    }
}


private func getDatesBetween(beginDate: Date, endDate: Date) -> [Date] {
    let calendar = Calendar.current
    var week = [Date]()
    if beginDate > endDate {
        // TODO: handle
        print("Error: beginDate is older than endDate")
    } else {
        if let daysBetween = calendar.dateComponents([.day], from: beginDate, to: endDate).day {
            for i in 0...daysBetween {
                if let day = calendar.date(byAdding: .day, value: i, to: beginDate) {
                    week += [day]
                }
            }
        } else {
            // TODO: handle
            print("Unexpected getDatesBetween Error")
        }
    }
    return week
}

private func getCalendarEntry(context: NSManagedObjectContext, date: Date) -> CalendarEntry? {
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "date == %@", date as NSDate)
    fetchRequest.fetchLimit = 1
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    
    return calendarEntries.first
}

private func getMonday(myDate: Date) -> Date {
    let calendar = Calendar.current
    var components = calendar.dateComponents([.weekOfYear, .yearForWeekOfYear], from: myDate)
    components.weekday = 2 // Monday
    return calendar.date(from: components)!
}

private func getSunday(myDate: Date) -> Date {
    let calendar = Calendar.current
    var components = calendar.dateComponents([.weekOfYear, .yearForWeekOfYear], from: myDate)
    components.weekday = 1 // Sunday
    return calendar.date(from: components)!
}
