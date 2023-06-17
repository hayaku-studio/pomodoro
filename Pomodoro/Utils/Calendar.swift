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

//func saveCalendarEntry(context: NSManagedObjectContext, date: Date, workTimeMinutes: Int64) {
//    let entry = getCalendarEntry(context: context, date: date) ?? CalendarEntry(context: context)
//    entry.date = date
//    entry.workTimeMinutes = workTimeMinutes
//    PersistenceController.shared.save()
//}

func getCurrentWeek(context: NSManagedObjectContext) -> [CalendarEntry] {
    var today = Date.now

    let startOfWeekMonday = getMonday(myDate: today)
    let endOfWeekSunday = getSunday(myDate: today)
    
    // TODO: I don't think these dates are timezone independant
//    let df = DateFormatter()
//    df.dateFormat = "yyyy-MM-dd HH:mm"
//    print(df.string(from: startOfWeekMonday))
//    print(endOfWeekSunday)
    
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "((date > %@) AND (date <= %@)) || (date = nil)", startOfWeekMonday as NSDate, endOfWeekSunday as NSDate)

    fetchRequest.fetchLimit = 7
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    
    print(calendarEntries)
    
    return calendarEntries
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
