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
    @State var pomoTimer: PomoTimer
    let pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine")
    
    var body: some View {
        VStack {
            Button(action: {}) {
                Text("")
            }
            .opacity(0)
            .frame(height: 0)
            ZStack {
                pomodoro.view().scaledToFit().frame(width: 200, height: 200)
                Circle()
                //.stroke(.green) // uncomment to see hitbox
                    .opacity(0.0)
                    .contentShape(Circle())
                    .frame(width: 160)
                //.onTapGesture() // TODO: On too many taps give a drag hint - https://www.instagram.com/p/CewsSvBrTBa/
                    .gesture(DragGesture()
                        .onChanged {gesture in
                            let newTranslation = gesture.translation.width/20
                            let incrementalTranslation = newTranslation - pomoTimer.previousTranslation
                            pomoTimer.previousTranslation = newTranslation
                            pomoTimer.time -= incrementalTranslation
                            if pomoTimer.time > 100 {
                                pomoTimer.time = 100
                            } else if pomoTimer.time < 0 {
                                pomoTimer.time = 0
                            }
                            pomodoro.setInput("timeMinutes", value: pomoTimer.time)
                        }
                        .onEnded {gesture in
                            pomoTimer.previousTranslation = 0
                            if pomoTimer.time > 0 {
                                startTimer()
                            }
                        }
                    )
            }
            FontIcon.button(.materialIcon(code: pomoTimer.isPlaying ? .pause_circle_filled : .play_circle_filled), action: toggleTimer, fontsize: 30)
                .foregroundColor(Color("Pomodoro Primary"))
                .frame(width: 40, height: 40.0)
        }
    }
    
    func toggleTimer() {
        if pomoTimer.isPlaying {
            pauseTimer()
        } else if pomoTimer.time > 0 {
            startTimer()
        }
    }
    
    func startTimer() {
        pomoTimer.isPlaying = true
        pomoTimer.timer?.invalidate()
        pomoTimer.timer = Timer.scheduledTimer(withTimeInterval: 6, repeats: true) {_ in
            decrementTime()
        }
    }
    
    func pauseTimer() {
        pomoTimer.isPlaying = false
        pomoTimer.timer?.invalidate()
    }
    
    func decrementTime() {
        pomoTimer.time -= 0.1
        pomodoro.setInput("timeMinutes", value: pomoTimer.time)
        if pomoTimer.time <= 0 {
            pomoTimer.time = 0
            pauseTimer()
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView(pomoTimer: PomoTimer())
    }
}
