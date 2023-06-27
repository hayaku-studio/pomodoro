//
//  YearlyCalendarView.swift
//  Pomodoro
//
//  Created by David Speers on 25/06/2023.
//

import SwiftUI

// TODO: I'm not following DRY with all these hard coded CalendarGraphs
struct YearlyCalendarGraph: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var calendarEntries: [CalendarGraphEntry]
    @State private var calendarPastYears: Int
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext, calendarPastYears: Int) {
        self.context = context
        self.calendarPastYears = calendarPastYears
        _calendarEntries = State(initialValue: getCalendarEntriesForYear(context: context, date: Calendar.current.date(byAdding: .year, value: -calendarPastYears, to: Date.now) ?? Date.now))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            CalendarNavigationView(calendarEntries: $calendarEntries, calendarPast: $calendarPastYears, highlightedCapsuleIndex: $highlightedCapsuleIndex, calendarFormat: CalendarFormat.year)
            CalendarCapsuleGraph(calendarEntries: calendarEntries, highlightedCapsuleIndex: $highlightedCapsuleIndex)
        }
    }
}
