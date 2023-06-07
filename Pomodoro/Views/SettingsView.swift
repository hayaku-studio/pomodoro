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
        VStack(alignment: .leading, spacing: 24) {
            Text("Settings")
                .font(.largeTitle)
            Text("Ping Volume")
            Slider(value: $volume, in: 0...100)
        }
        .padding(30)
        .background(.white)
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
