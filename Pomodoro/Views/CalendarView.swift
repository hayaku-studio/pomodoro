//
//  CalendarView.swift
//  Pomodoro
//
//  Created by David Speers on 13/06/2023.
//

import SwiftUI

struct CalendarView: View {
    @Environment(\.managedObjectContext) var managedObjectContext
    @FetchRequest(sortDescriptors: [
        SortDescriptor(\.date),
        SortDescriptor(\.workTimeMinutes, order: .reverse)
    ]) var calendarEntries: FetchedResults<CalendarEntry>
    
    let dateFormatter: DateFormatter
    
    init() {
        dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .long
        dateFormatter.timeStyle = .short
    }
    
    var body: some View {
        VStack {
            ForEach(calendarEntries.reversed(), id: \.self) {entry in
                if entry.date != nil {
                    Text(entry.date!, formatter: dateFormatter)
                }
                Text("\(entry.workTimeMinutes)")
            }
        }
    }
}

struct CalendarView_Previews: PreviewProvider {
    static var previews: some View {
        CalendarView()
    }
}
