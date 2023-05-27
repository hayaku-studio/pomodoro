//
//  AnimationView.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI
import RiveRuntime

struct AnimationView: View {
    var body: some View {
        RiveViewModel(fileName: "pomodoro_timer").view()
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView()
    }
}
