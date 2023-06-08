//
//  SettingsView.swift
//  Pomodoro
//
//  Created by David Speers on 07/06/2023.
//

import SwiftUI

struct SettingsView: View {
    @State private var volume: Double = 0
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Settings")
                .font(.largeTitle)
            
            VStack(alignment: .leading, spacing: 4) {
                Text("PING VOLUME")
                    .font(.caption)
                    .foregroundColor(Color("Settings Heading Text"))
                    .padding(.leading, 8)
                    
                HStack {
                    Label("Low Volume", systemImage: "speaker.fill")
                        .labelStyle(.iconOnly)
                    Slider(
                        value: $volume,
                        in: 0...1
                    )
                    Label("High Volume", systemImage: "speaker.3.fill")
                        .labelStyle(.iconOnly)
                }
                .foregroundColor(Color("Settings Icon"))
                .padding(8)
                .background(Color("Settings Card Background"))
                .mask(RoundedRectangle(cornerRadius: 8, style: .continuous))
            }
        }
        .padding(16)
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
