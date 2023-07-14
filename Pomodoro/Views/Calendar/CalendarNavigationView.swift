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
    
    @Binding var calendarEntries: [CalendarGraphEntry]
    @Binding var calendarPast: Int
    @Binding var highlightedCapsuleIndex: Int?
    var calendarFormat: CalendarFormat
    
    var body: some View {
        HStack {
            FontIcon.button(.materialIcon(code: .chevron_left), action: previous, padding: 4, fontsize: 24)
                .foregroundColor(Color(isEarliestCalendarEntryOlderThanFirstCalendarEntry() ? "Button Active" : "Button Disabled"))
            Spacer()
            CalendarNavigationTextView(calendarEntries: calendarEntries, highlightedCapsuleIndex: highlightedCapsuleIndex, calendarFormat: calendarFormat)
            Spacer()
            FontIcon.button(.materialIcon(code: .chevron_right), action: next, padding: 4, fontsize: 24)
                .foregroundColor(Color(calendarPast > 0 ? "Button Active" : "Button Disabled"))
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
        if let earliestDateInCurrentCalendarEntries = calendarEntries.first?.date, let earliestCalendarEntryDate = modelData.earliestCalendarEntryDate {
            if earliestCalendarEntryDate < earliestDateInCurrentCalendarEntries  {
                return true
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
            var dateComponent = DateComponents()
            dateComponent.month = -calendarPast
            if let date = Calendar.current.date(byAdding: dateComponent, to: Date.now) {
                calendarEntries = getCalendarEntriesForMonth(context: managedObjectContext, date: date)
            }
        case .year:
            var dateComponent = DateComponents()
            dateComponent.year = -calendarPast
            if let date = Calendar.current.date(byAdding: dateComponent, to: Date.now) {
                calendarEntries = getCalendarEntriesForYear(context: managedObjectContext, date: date)
            }
        }
    }
}

//struct CalendarNavigationView_Previews: PreviewProvider {
//    static var previews: some View {
//        CalendarNavigationView()
//    }
//}
