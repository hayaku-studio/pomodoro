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

// TODO: implement
//func getDateToTimeWorkedMapForRange(from: Date, to: Date) -> KeyValuePairs<Date, Int> {
//
//}

func getCalendarEntriesForCurrentWeek(context: NSManagedObjectContext) -> [CalendarEntry] {
    let today = Date.now
    let startOfWeekMonday = getMonday(myDate: today)
    let endOfWeekSunday = getSunday(myDate: today)
    
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "((date >= %@) AND (date <= %@)) || (date = nil)", startOfWeekMonday as NSDate, endOfWeekSunday as NSDate)
    fetchRequest.fetchLimit = 7
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    let currentWeek = getCurrentWeek()
    
    return currentWeek.map { date in
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

func getCalendarEntry(context: NSManagedObjectContext, date: Date) -> CalendarEntry? {
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

private func getCurrentWeek() -> [Date] {
    var calendar = Calendar.autoupdatingCurrent
    calendar.firstWeekday = 2 // Start on Monday (or 1 for Sunday)
    let today = calendar.startOfDay(for: Date())
    var week = [Date]()
    if let weekInterval = calendar.dateInterval(of: .weekOfYear, for: today) {
        for i in 0...6 {
            if let day = calendar.date(byAdding: .day, value: i, to: weekInterval.start) {
                week += [day]
            }
        }
    }
    return week
}
