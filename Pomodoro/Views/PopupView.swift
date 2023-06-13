//
//  PopupView.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct PopupView: View {
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
                    FontIcon.button(.materialIcon(code: .equalizer), action: openSettings, fontsize: 24)
                        .foregroundColor(Color("Pomodoro Primary"))
                    Spacer()
                    FontIcon.button(.materialIcon(code: .settings), action: openSettings, fontsize: 24)
                        .foregroundColor(Color("Pomodoro Primary"))
                        .frame(width: 40, height: 40)
                }
                AnimationView()
            }
            if showSettings {
                SettingsView()
                    .customModal(actionOnDismiss: closeSettings)
            }
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
