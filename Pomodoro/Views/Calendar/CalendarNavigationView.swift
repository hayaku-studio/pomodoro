//
//  CalendarNavigationView.swift
//  Pomodoro
//
//  Created by David Speers on 26/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct CalendarNavigationView: View {
    @EnvironmentObject private var modelData: ModelData
    @Environment(\.managedObjectContext) var managedObjectContext
    
    @Binding var calendarEntries: [CalendarEntry]
    @Binding var calendarPast: Int
    @Binding var highlightedCapsuleIndex: Int?
    var calendarFormat: CalendarFormat
    
    var body: some View {
        HStack {
            FontIcon.button(.materialIcon(code: .chevron_left), action: previous, padding: 4, fontsize: 24)
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
            FontIcon.button(.materialIcon(code: .chevron_right), action: next, padding: 4, fontsize: 24)
                .foregroundColor(Color(calendarPast > 0 ? "Pomodoro Primary" : "Disabled Button"))
        }
    }
    
    func previous() {
        if isEarliestCalendarEntryOlderThanFirstCalendarEntry()  {
            calendarPast += 1
            updateCalendarEntries()
        }
    }
    
    func next() {
        if calendarPast > 0 {
            calendarPast -= 1
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
        switch calendarFormat {
        case .week:
            if let date = Calendar.current.date(byAdding: .day, value: -(7*calendarPast), to: Date.now) {
                calendarEntries = getCalendarEntriesForWeek(context: managedObjectContext, date: date)
            }
        case .month:
            break
        case .year:
            var dateComponent = DateComponents()
            dateComponent.year = -calendarPast
            if let date = Calendar.current.date(byAdding: dateComponent, to: Date.now) {
                calendarEntries = getCalendarEntriesForWeek(context: managedObjectContext, date: date)
            }
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

//struct CalendarNavigationView_Previews: PreviewProvider {
//    static var previews: some View {
//        CalendarNavigationView()
//    }
//}
