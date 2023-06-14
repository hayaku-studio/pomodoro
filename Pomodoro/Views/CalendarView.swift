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
    ]) var days: FetchedResults<Day>
    
    var body: some View {
        VStack {
            ForEach(days.reversed(), id: \.self) {day in
                Text("\(day.workTimeMinutes)")
            }
        }
    }
}

struct CalendarView_Previews: PreviewProvider {
    static var previews: some View {
        CalendarView()
    }
}
