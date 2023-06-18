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
        let minutes = Int(modelData.timeSeconds/60)
        return HStack {
            ZStack {
                Image("Tomato Icon")
                Text("\(String(format: "%02d", minutes))")
                    .font(minutes == 100 ? .custom("SF Pro", size: 7) : .footnote)
                    .fontWeight(.semibold)
                    .offset(y: 2)
                    .foregroundColor(Color("Dark Mode Contrast"))
            }.offset(x: 6)
            Text(":").offset(x: -2)
             ZStack {
                    Image("Tomato Icon")
                    Text("\(String(format: "%02d", Int(modelData.timeSeconds%60)))")
                .font(.footnote)
                .fontWeight(.semibold)
                .offset(y: 2)
                .foregroundColor(Color("Dark Mode Contrast"))
             }.offset(x: -6)
        }
    }
}

struct PomodoroIconView_Previews: PreviewProvider {
    static var previews: some View {
        PomodoroIconView().environmentObject(ModelData())
    }
}
