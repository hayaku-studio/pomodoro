//
//  Calendar.swift
//  Pomodoro
//
//  Created by David Speers on 15/06/2023.
//

import Foundation
import SwiftUI

func saveCalendarEntry(context: NSManagedObjectContext, date: Date, workTimeMinutes: Int64) {
    let entry = getCalendarEntry(context: context, date: date) ?? CalendarEntry(context: context)
    entry.date = date
    entry.workTimeMinutes = workTimeMinutes
    PersistenceController.shared.save()
}

func getCalendarEntry(context: NSManagedObjectContext, date: Date) -> CalendarEntry? {
    let fetchRequest = CalendarEntry.fetchRequest()
    fetchRequest.predicate = NSPredicate(format: "date == %@", date as NSDate)
    fetchRequest.fetchLimit = 1
    
    // TODO: catch error
    let calendarEntries = try! context.fetch(fetchRequest)
    
    return calendarEntries.first
}
