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
    
    @State private var showFabMenu = false
    @State private var showCalendar = false
    @State private var showSettings = false
    @State private var showTimer = false
    
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    Button(action: {}) {
                        Text("")
                    }
                    .opacity(0)
                    .frame(width: 0, height: 0)
                    FabView(showFabMenu: $showFabMenu, timerAction: openTimer, settingsAction: openSettings, statsAction: openCalendar)
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
            if showFabMenu {
                // TODO: zIndexing seems to be weird. Rectangle is under the  AnimationView (to be expected with current code, but is even the case when I reduce AnimationView's zIndex)
                Rectangle()
                    .opacity(0.00001) // TODO: better solution
                    .onTapGesture {
                        showFabMenu = false
                    }
                    .zIndex(-1)
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

    func openTimer() {
        withAnimation(.spring()) {
            showTimer = true
        }
    }
    
    func closeTimer() {
        withAnimation(.spring()) {
            showTimer = false
        }
    }
}

struct PopupView_Previews: PreviewProvider {
    static var previews: some View {
        PopupView()
    }
}
