//
//  SettingsView.swift
//  Pomodoro
//
//  Created by David Speers on 07/06/2023.
//

import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var modelData: ModelData
    
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
                        value: $modelData.pingVolume,
                        in: 0...1
                    ) { editing in
                        if (editing == false) {
                            UserDefaults.standard.set(modelData.pingVolume, forKey: "pingVolume") // TODO: reduce possibility of bugs by having "pingVolume" be some global var (maybe something like Keys.PingVolume)
                        }
                    }
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
        .padding()
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
