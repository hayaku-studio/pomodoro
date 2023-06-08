//
//  SettingsView.swift
//  Pomodoro
//
//  Created by David Speers on 07/06/2023.
//

import SwiftUI

struct SettingsView: View {
    @State private var soundToggle = true
    @State private var volume: Double = 0
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Settings")
                .font(.largeTitle)
            VStack {
                Toggle(isOn: $soundToggle) {
                    Text("Ping on Timer Completion")
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .toggleStyle(SwitchToggleStyle())
                if soundToggle {
                    VStack {
                        Divider()
                        HStack {
                            Text("Volume")
                            Spacer()
                            Button("Test", action: playSound)
                        }
                        HStack {
                            Label("Low Volume", systemImage: "volume.1")
                                .labelStyle(.iconOnly)
                            Slider(
                                value: $volume,
                                in: 0...1,
                                step: 0.05
                            )
                            Label("High Volume", systemImage: "volume.3.fill")
                                .labelStyle(.iconOnly)
                        }
                    }
                }
            }
            .padding(8)
            .background(Color("Settings Card Background"))
            .mask(RoundedRectangle(cornerRadius: 8, style: .continuous))
        }
        .padding(30)
        .background(Color("Settings Background"))
        .mask(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(radius: 5, x: 0, y: 3)
        .shadow(radius: 30, x: 0, y: 30)
        .overlay(RoundedRectangle(cornerRadius: 20, style: .continuous)
            .stroke(.linearGradient(colors: [.white.opacity(0.8), .white.opacity(0.1)], startPoint: .topLeading, endPoint: .bottomTrailing))
        )
        .padding()
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
