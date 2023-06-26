//
//  YearlyCalendarView.swift
//  Pomodoro
//
//  Created by David Speers on 25/06/2023.
//

import SwiftUI

struct YearlyCalendarGraph: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var calendarEntries: [CalendarEntry]
    @State private var calendarPastYears: Int
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext, calendarPastYears: Int) {
        self.context = context
        self.calendarPastYears = calendarPastYears
        _calendarEntries = State(initialValue: getCalendarEntriesForWeek(context: context, date: Calendar.current.date(byAdding: .day, value: -(7*calendarPastYears), to: Date.now) ?? Date.now))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            CalendarNavigationView(calendarEntries: $calendarEntries, calendarPastYears: $calendarPastYears, highlightedCapsuleIndex: $highlightedCapsuleIndex)
            CalendarCapsuleGraph(calendarEntries: calendarEntries, highlightedCapsuleIndex: $highlightedCapsuleIndex)
        }
    }
}
