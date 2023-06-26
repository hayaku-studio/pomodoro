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
    @State private var calendarEntries: [CalendarEntry]
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext, calendarPastWeeks: Int) {
        self.context = context
        self.calendarPastWeeks = calendarPastWeeks
        _calendarEntries = State(initialValue: getCalendarEntriesForWeek(context: context, date: Calendar.current.date(byAdding: .day, value: -(7*calendarPastWeeks), to: Date.now) ?? Date.now))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                FontIcon.button(.materialIcon(code: .chevron_left), action: previousWeek, padding: 4, fontsize: 24)
                    .foregroundColor(Color(isEarliestCalendarEntryOlderThanFirstCalendarEntry() ? "Pomodoro Primary" : "Disabled Button"))
                Spacer()
                VStack {
                    if let unwrappedIndex = highlightedCapsuleIndex {
                        if let date = calendarEntries[unwrappedIndex].date {
                            Text(verbatim: "\(date.xget(.day)) \(date.xmonth) \(date.xget(.year))")
                            let totalMinutesForIndex = Int(calendarEntries[unwrappedIndex].workTimeMinutes)
                            Text("\(totalMinutesForIndex.xgetCompletedHoursStringFromMinutes) \(totalMinutesForIndex.xgetRemainderMinutesStringFromMinutes)")
                        }
                    } else {
                        Text(verbatim: getWeekRangeString(calendarEntries: calendarEntries))
                        let totalMinutesForRange = getTotalWorkMinutes(calendarEntries: calendarEntries)
                        Text("\(totalMinutesForRange.xgetCompletedHoursStringFromMinutes) \(totalMinutesForRange.xgetRemainderMinutesStringFromMinutes)")
                    }
                }
                Spacer()
                FontIcon.button(.materialIcon(code: .chevron_right), action: nextWeek, padding: 4, fontsize: 24)
                    .foregroundColor(Color(calendarPastWeeks > 0 ? "Pomodoro Primary" : "Disabled Button"))
            }
            CalendarCapsuleGraph(calendarEntries: calendarEntries, highlightedCapsuleIndex: $highlightedCapsuleIndex)
        }
    }
    
    func previousWeek() {
        if isEarliestCalendarEntryOlderThanFirstCalendarEntry()  {
            calendarPastWeeks += 1
            updateCalendarEntries()
        }
    }
    
    func nextWeek() {
        if calendarPastWeeks > 0 {
            calendarPastWeeks -= 1
            updateCalendarEntries()
        }
    }
    
    func isEarliestCalendarEntryOlderThanFirstCalendarEntry() -> Bool {
        if let earliestDateInCurrentCalendarEntries = calendarEntries[0].date {
            if let earliestCalendarEntryDate = modelData.earliestCalendarEntryDate {
                if earliestCalendarEntryDate < earliestDateInCurrentCalendarEntries  {
                    return true
                }
            }
        }
        return false
    }
    
    func updateCalendarEntries() {
        if let date = Calendar.current.date(byAdding: .day, value: -(7*calendarPastWeeks), to: Date.now) {
            calendarEntries = getCalendarEntriesForWeek(context: context, date: date)
        }
    }
    
    func getWeekRangeString(calendarEntries: [CalendarEntry]) -> String {
        if let firstDate = calendarEntries.first?.date {
            if let lastDate = calendarEntries.last?.date {
                // TODO: when going over the month/year, maybe expand on first date
                return "\(firstDate.xget(.day)) - \(lastDate.xget(.day)) \(lastDate.xmonth) \(lastDate.xget(.year))"
            }
        }
        return ""
    }
    
    func getTotalWorkMinutes(calendarEntries: [CalendarEntry]) -> Int {
        return calendarEntries.map({Int($0.workTimeMinutes)}).reduce(0, +)
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
