//
//  CalendarGraph.swift
//  Pomodoro
//
//  Created by David Speers on 18/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct WeeklyCalendarGraph: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var calendarPastWeeks: Int
    @State private var calendarEntries: [CalendarGraphEntry]
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext, calendarPastWeeks: Int) {
        self.context = context
        self.calendarPastWeeks = calendarPastWeeks
        _calendarEntries = State(initialValue: getCalendarEntriesForWeek(context: context, date: Calendar.current.date(byAdding: .day, value: -(7*calendarPastWeeks), to: Date.now) ?? Date.now))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            CalendarNavigationView(calendarEntries: $calendarEntries, calendarPast: $calendarPastWeeks, highlightedCapsuleIndex: $highlightedCapsuleIndex, calendarFormat: CalendarFormat.week)
            CalendarCapsuleGraph(calendarEntries: calendarEntries, highlightedCapsuleIndex: $highlightedCapsuleIndex)
        }
    }
}

//struct CalendarGraph_Previews: PreviewProvider {
//    static var hike = ModelData().hikes[0]
//
//    static var previews: some View {
//        Group {
//            CalendarGraph(hike: hike, path: \.elevation)
//                .frame(height: 200)
//            CalendarGraph(hike: hike, path: \.heartRate)
//                .frame(height: 200)
//            CalendarGraph(hike: hike, path: \.pace)
//                .frame(height: 200)
//        }
//    }
//}
