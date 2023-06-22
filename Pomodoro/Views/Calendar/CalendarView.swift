//
//  CalendarView.swift
//  Pomodoro
//
//  Created by David Speers on 13/06/2023.
//

import SwiftUI

struct CalendarView: View {
    @EnvironmentObject private var modelData: ModelData
    @Environment(\.managedObjectContext) var managedObjectContext
    
    var body: some View {
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .long
        dateFormatter.timeStyle = .short
        return VStack {
            HStack {
                Picker("", selection: $modelData.calendarFormat) {
                    ForEach(CalendarFormat.allCases) { format in
                        Text(format.id).tag(format)
                    }
                }
                .pickerStyle(.segmented)
            }
            // TODO: remove commented code
            //            ForEach(getCalendarEntriesForCurrentWeek(context: managedObjectContext), id: \.self) {entry in
            //                if let date = entry.date {
            //                    Text(date, formatter: dateFormatter)
            //                }
            //                Text(String(entry.workTimeMinutes))
            //            }
            WeeklyCalendarGraph(calendarEntries: getCalendarEntriesForCurrentWeek(context: managedObjectContext))
        }
    }
}

struct CalendarView_Previews: PreviewProvider {
    static var previews: some View {
        CalendarView()
    }
}
