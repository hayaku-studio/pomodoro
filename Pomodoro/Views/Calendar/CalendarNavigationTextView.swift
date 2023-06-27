//
//  CalendarNavigationTextView.swift
//  Pomodoro
//
//  Created by David Speers on 27/06/2023.
//

import SwiftUI

struct CalendarNavigationTextView: View {
    var calendarEntries: [CalendarGraphEntry]
    var highlightedCapsuleIndex: Int?
    var calendarFormat: CalendarFormat
    
    var body: some View {
        VStack {
            if let unwrappedIndex = highlightedCapsuleIndex {
                let date = calendarEntries[unwrappedIndex].date
                Text(verbatim: "\(date.xget(.day)) \(date.xmonth) \(date.xget(.year))")
                let totalMinutesForIndex = Int(calendarEntries[unwrappedIndex].workTimeMinutes)
                Text("\(totalMinutesForIndex.xgetCompletedHoursStringFromMinutes) \(totalMinutesForIndex.xgetRemainderMinutesStringFromMinutes)")
            } else {
                Text(verbatim: getWeekRangeString(calendarEntries: calendarEntries))
                let totalMinutesForRange = getTotalWorkMinutes(calendarEntries: calendarEntries)
                Text("\(totalMinutesForRange.xgetCompletedHoursStringFromMinutes) \(totalMinutesForRange.xgetRemainderMinutesStringFromMinutes)")
            }
        }
    }
    
    func getWeekRangeString(calendarEntries: [CalendarGraphEntry]) -> String {
        if let firstDate = calendarEntries.first?.date {
            if let lastDate = calendarEntries.last?.date {
                // TODO: when going over the month/year, maybe expand on first date
                return "\(firstDate.xget(.day)) - \(lastDate.xget(.day)) \(lastDate.xmonth) \(lastDate.xget(.year))"
            }
        }
        return ""
    }
    
    func getTotalWorkMinutes(calendarEntries: [CalendarGraphEntry]) -> Int {
        return calendarEntries.map({Int($0.workTimeMinutes)}).reduce(0, +)
    }
}

//struct CalendarNavigationTextView_Previews: PreviewProvider {
//    static var previews: some View {
//        CalendarNavigationTextView()
//    }
//}
