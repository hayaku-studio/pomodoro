//
//  PopupView.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct PopupView: View {
    @Environment(\.managedObjectContext) var managedObjectContext
    
    @State private var showCalendar = false
    @State private var showSettings = false
    
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    Button(action: {}) {
                        Text("")
                    }
                    .opacity(0)
                    .frame(width: 0, height: 0)
                    FontIcon.button(.materialIcon(code: .equalizer), action: openCalendar, fontsize: 24)
                        .foregroundColor(Color("Pomodoro Primary"))
                    Button("Insert today") {
                        saveCalendarEntry(context: managedObjectContext, date: Calendar.current.startOfDay(for: Date.now), workTimeMinutes: 120)
                    }
                    Spacer()
                    FontIcon.button(.materialIcon(code: .settings), action: openSettings, fontsize: 24)
                        .foregroundColor(Color("Pomodoro Primary"))
                        .frame(width: 40, height: 40)
                }
                AnimationView()
            }
            if showCalendar {
                CalendarView()
                    .customModal(actionOnDismiss: closeCalendar)
            }
            if showSettings {
                SettingsView()
                    .customModal(actionOnDismiss: closeSettings)
            }
        }
    }
    
    // TODO: extract calendar helper methods from Views
    func saveCalendarEntry(context: NSManagedObjectContext, date: Date, workTimeMinutes: Int64) {
        let entry: CalendarEntry?
        
        @FetchRequest(sortDescriptors: [SortDescriptor(\.date)], predicate: NSPredicate(format: "date == %@", date as NSDate)) var calendarEntries: FetchedResults<CalendarEntry>
//        fetchCalendarEvent.limit = 1 // TODO: implement limit. Although there should only ever be 1 event anyway
        
        if calendarEntries.count == 0 {
           // insert
           entry = CalendarEntry(context: context)
        } else {
           // update
           entry = calendarEntries.first
        }
        entry?.date = date
        entry?.workTimeMinutes = workTimeMinutes
        PersistenceController.shared.save()
    }
    
    func openCalendar() {
        withAnimation(.spring()) {
            showCalendar = true
        }
    }
    
    func closeCalendar() {
        withAnimation(.spring()) {
            showCalendar = false
        }
    }
    
    func openSettings() {
        withAnimation(.spring()) {
            showSettings = true
        }
    }
    
    func closeSettings() {
        withAnimation(.spring()) {
            showSettings = false
        }
    }
}

struct PopupView_Previews: PreviewProvider {
    static var previews: some View {
        PopupView()
    }
}
