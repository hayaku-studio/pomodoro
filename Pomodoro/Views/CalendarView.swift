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
    
    let dateFormatter: DateFormatter
    
    init() {
        dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .long
        dateFormatter.timeStyle = .short
        
        //        calendarEntries =
    }
    
    var body: some View {
        VStack {
            HStack {
                Picker("", selection: $modelData.calendarFormat) {
                    ForEach(CalendarFormat.allCases) { format in
                        Text(format.id).tag(format)
                    }
                }
                .pickerStyle(.segmented)
            }
            ForEach(getCurrentWeek(context: managedObjectContext), id: \.self) {entry in
                if let date = entry?.date {
                    Text(date, formatter: dateFormatter)
                }
                Text(String(entry?.workTimeMinutes ?? 0))
            }
        }
    }
}

struct CalendarView_Previews: PreviewProvider {
    static var previews: some View {
        CalendarView()
    }
}
