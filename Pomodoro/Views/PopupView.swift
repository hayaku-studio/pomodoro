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
                    .frame(height: 0)
                    Spacer()
                    FontIcon.button(.materialIcon(code: .settings), action: openSettings)
                        .foregroundColor(Color("Pomodoro Primary"))
                        .frame(width: 40, height: 40)
                }
                AnimationView()
            }
            if showSettings {
                Rectangle()
                    .fill(.black.opacity(0.15))
                    .onTapGesture {
                        closeSettings()
                    }
                SettingsView()
            }
        }
    }
    
    func openSettings() {
        showSettings = true
    }
    
    func closeSettings() {
        showSettings = false
    }
}

struct PopupView_Previews: PreviewProvider {
    static var previews: some View {
        PopupView()
    }
}
