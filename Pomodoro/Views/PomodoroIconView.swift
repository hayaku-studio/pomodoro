//
//  PomodoroIconView.swift
//  Pomodoro
//
//  Created by David Speers on 04/06/2023.
//

import SwiftUI

struct PomodoroIconView: View {
    @EnvironmentObject private var modelData: ModelData

    var body: some View {
        ZStack {
            Image("Tomato Icon Wide")
            Text("\(String(format: "%02d", Int(modelData.pomoTimer.timeSeconds/60)))" +
                 ":" +
                 "\(String(format: "%02d", Int(modelData.pomoTimer.timeSeconds % 60)))")
            .font(.footnote)
            .offset(y: 2)
            .foregroundColor(Color("Dark Mode Contrast"))
        }
    }
    
    
}

struct PomodoroIconView_Previews: PreviewProvider {
    static var previews: some View {
        PomodoroIconView().environmentObject(ModelData())
    }
}
