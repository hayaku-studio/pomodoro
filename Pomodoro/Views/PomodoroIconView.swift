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
        HStack {
//            Image("Tomato Icon Play")
            Text(String(floor(modelData.time)))
                .foregroundColor(Color("Dark Mode Contrast"))
        }
    }
    
    func callThing() {
        print(String(floor(modelData.time)))
    }
}

struct PomodoroIconView_Previews: PreviewProvider {
    static var previews: some View {
        PomodoroIconView().environmentObject(ModelData())
    }
}
