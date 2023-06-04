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
    @State var isPlaying = false
    @State var timer: Timer?
    @State var time = 0.0
    @State var previousTranslation = 0.0
    
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
                //.stroke(.black.opacity(0.1)) // uncomment to see hitbox
                    .opacity(0.0)
                    .contentShape(Circle())
                    .frame(width: 150)
                //.onTapGesture() // TODO: On too many taps give a drag hint - https://www.instagram.com/p/CewsSvBrTBa/
                    .gesture(DragGesture()
                        .onChanged {gesture in
                            let newTranslation = gesture.translation.width/20
                            let incrementalTranslation = newTranslation - previousTranslation
                            previousTranslation = newTranslation
                            time -= incrementalTranslation
                            if time > 100 {
                                time = 100
                            } else if time < 0 {
                                time = 0
                            }
                            pomodoro.setInput("timeMinutes", value: time)
                        }
                        .onEnded {gesture in
                            previousTranslation = 0
                            if time > 0 {
                                startTimer()
                            }
                        }
                    )
            }
            FontIcon.button(.materialIcon(code: isPlaying ? .pause_circle_filled : .play_circle_filled), action: toggleTimer, fontsize: 30)
                .foregroundColor(Color("Pomodoro Primary"))
                .frame(width: 40, height: 40.0)
        }
    }
    
    func toggleTimer() {
        if isPlaying {
            pauseTimer()
        } else if time > 0 {
            startTimer()
        }
    }
    
    func startTimer() {
        isPlaying = true
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 6, repeats: true) {_ in
            decrementTime()
        }
    }
    
    func pauseTimer() {
        isPlaying = false
        timer?.invalidate()
    }
    
    func decrementTime() {
        time -= 0.1
        pomodoro.setInput("timeMinutes", value: time)
        if time <= 0 {
            time = 0
            pauseTimer()
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView()
    }
}
