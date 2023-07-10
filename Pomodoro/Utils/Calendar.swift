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
    let earliestCalendarEntries = try! context.fetch(fetchRequest)
    if earliestCalendarEntries.isEmpty {
        return Date.now
    } else {
        return earliestCalendarEntries[0].date ?? Date.now
    }
}

func getCalendarEntriesForWeek(context: NSManagedObjectContext, date: Date) -> [CalendarGraphEntry] {
    let startOfWeekMonday = getMonday(myDate: date)
    let endOfWeekSunday = getSunday(myDate: date)
    return getCalendarEntriesBetweenTwoDates(context: context, beginDate: startOfWeekMonday, endDate: endOfWeekSunday).map {
        var calendarEntry = $0
        calendarEntry.label = calendarEntry.date.xdayOfWeek
        return calendarEntry
    }
}

func getCalendarEntriesForMonth(context: NSManagedObjectContext, date: Date) -> [CalendarGraphEntry] {
    let firstDayOfMonth = getMonthStart(date: date)
    let lastDayOfMonth = getMonthEnd(date: date)
    let allDates = getCalendarEntriesBetweenTwoDates(context: context, beginDate: firstDayOfMonth, endDate: lastDayOfMonth)
    return allDates.enumerated().map {(index, value) in
        let showLabel = (index == 0) || ((index % 5 == 4) && !(index == 29)) || (index == allDates.count-1)
        var calendarEntry = value
        calendarEntry.label = showLabel ? String(index+1) : nil
        return calendarEntry
    }
}

func getCalendarEntriesForYear(context: NSManagedObjectContext, date: Date) -> [CalendarGraphEntry] {
    var monthEntries = [CalendarGraphEntry]()
    let calendar = Calendar.current
    let currentYear = calendar.component(.year, from: date)
    let firstDayOfYear = DateComponents(calendar: calendar, year: currentYear).date!
    for month in 0..<12 {
        let firstDayOfMonth = calendar.date(byAdding: .month, value: month, to: firstDayOfYear)!
        let lastDayOfMonth = calendar.date(byAdding: DateComponents(month: month+1, day: -1), to: firstDayOfYear)!
        let allDates = getCalendarEntriesBetweenTwoDates(
            context: context,
            beginDate: firstDayOfMonth,
            endDate: lastDayOfMonth
        )
        monthEntries.append(CalendarGraphEntry(date: firstDayOfMonth, workTimeMinutes: allDates.map{Int($0.workTimeMinutes)}.reduce(0, +), label: String(firstDayOfMonth.xmonth.prefix(1))))
    }
    return monthEntries
}

func getCalendarEntriesBetweenTwoDates(context: NSManagedObjectContext, beginDate: Date, endDate: Date) -> [CalendarGraphEntry] {
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "(date >= %@) AND (date <= %@)", beginDate as NSDate, endDate as NSDate)
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    let allDates = getDatesBetween(beginDate: beginDate, endDate: endDate)
    
    return allDates.map { date in
        if let entry = calendarEntries.first(where: { $0.date == date }) {
            return CalendarGraphEntry(date: entry.date!, workTimeMinutes: Int(entry.workTimeMinutes))
        } else {
            return CalendarGraphEntry(date: date, workTimeMinutes: 0)
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

private func getMonthStart(date: Date) -> Date {
    let components = Calendar.current.dateComponents([.year, .month], from: date)
    return Calendar.current.date(from: components)!
}

func getMonthEnd(date: Date) -> Date {
    let components = Calendar.current.dateComponents([.year, .month], from: date) as NSDateComponents
    components.month += 1
    components.day = 1
    components.day -= 1
    return Calendar.current.date(from: components as DateComponents)!
}
