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
        VStack {
            Text("Hello")
            RiveViewModel(fileName: "pomodoro_timer").view().scaledToFit().frame(width: 200, height: 200)
            Text("There")
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView()
    }
}
