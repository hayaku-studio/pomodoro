//
//  AnimationView.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI
import SwiftUIFontIcon
import RiveRuntime

struct AnimationView: View {
    let pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine")
    @State var timer: Timer?
    @State var time = 0.0
    
    var body: some View {
        VStack {
            Button(action: {}) {
                Text("")
            }
            .opacity(0)
            .frame(height: 0)
            pomodoro.view().scaledToFit().frame(width: 200, height: 200)
            FontIcon.button(.materialIcon(code: .play_circle_filled), action: startTimer)
        }
    }
    
    func startTimer() {
        pomodoro.play()
        pomodoro.triggerInput("start")
        timer = Timer.scheduledTimer(withTimeInterval: 0.02, repeats: true) {_ in
            incrementTime()
        }
    }
    
    func incrementTime() {
        time += 10
        pomodoro.setInput("time", value: time)
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView()
    }
}
