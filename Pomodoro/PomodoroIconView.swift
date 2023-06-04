//
//  PomodoroIconView.swift
//  Pomodoro
//
//  Created by David Speers on 04/06/2023.
//

import SwiftUI

struct PomodoroIconView: View {
    var body: some View {
        HStack {
            Image("Tomato Icon Play")
            Text("25")
                .foregroundColor(Color.white)
        }
    }
}

struct PomodoroIconView_Previews: PreviewProvider {
    static var previews: some View {
        PomodoroIconView()
    }
}
