//
//  MonthlyCalendarGraph.swift
//  Pomodoro
//
//  Created by David Speers on 27/06/2023.
//

import SwiftUI

struct MonthlyCalendarGraph: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var calendarEntries: [CalendarGraphEntry]
    @State private var calendarPastMonths: Int
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext, calendarPastMonths: Int) {
        self.context = context
        self.calendarPastMonths = calendarPastMonths
        _calendarEntries = State(initialValue: getCalendarEntriesForMonth(context: context, date: Calendar.current.date(byAdding: .year, value: -calendarPastMonths, to: Date.now) ?? Date.now))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            CalendarNavigationView(calendarEntries: $calendarEntries, calendarPast: $calendarPastMonths, highlightedCapsuleIndex: $highlightedCapsuleIndex, calendarFormat: CalendarFormat.month)
            CalendarCapsuleGraph(calendarEntries: calendarEntries, highlightedCapsuleIndex: $highlightedCapsuleIndex)
        }
    }
}

//struct MonthlyCalendarGraph_Previews: PreviewProvider {
//    static var previews: some View {
//        MonthlyCalendarGraph()
//    }
//}
