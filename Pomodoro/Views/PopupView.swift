//
//  PopupView.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct PopupView: View {
    @EnvironmentObject private var modelData: ModelData
    @Environment(\.managedObjectContext) private var managedObjectContext
    
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
                    FabView(settingsAction: openSettings, statsAction: openCalendar)
                    Spacer()
                }
                .offset(x: -40, y: -8)
                .zIndex(1)
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
        }.onAppear() {
            modelData.earliestCalendarEntryDate = getEarliestCalendarEntryDate(context: managedObjectContext)
        }
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
