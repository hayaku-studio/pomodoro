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
                // TODO: extract CustomModalView
                Rectangle()
                    .fill(.black.opacity(0.15))
                    .onTapGesture {
                        closeSettings()
                    }
                SettingsView()
                    .transition(.move(edge: .top)
                        .combined(with: .opacity))
                    .overlay(alignment: .top) {
                        FontIcon.button(.materialIcon(code: .close), action: closeSettings)
                            .foregroundColor(Color("Dark Mode Button Contrast"))
                            .background(Circle().fill(Color("Pomodoro Primary")))
                            .frame(width: 40, height: 40)
                            .frame(maxWidth: .infinity, alignment: .trailing) // TODO: less hacky alignment
                    }
                    .zIndex(1)
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
