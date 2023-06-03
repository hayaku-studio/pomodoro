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
            ZStack {
                pomodoro.view().scaledToFit().frame(width: 200, height: 200)
                Circle()
                //.stroke(.black.opacity(0.1)) // uncomment to see hitbox
                    .opacity(0.0)
                    .contentShape(Circle())
                    .frame(width: 150)
                //.onTapGesture() // TODO: On too many taps give a drag hint - https://www.instagram.com/p/CewsSvBrTBa/
                    .gesture(DragGesture().onChanged {value in
                        print(value)
                    })
            }
            FontIcon.button(.materialIcon(code: .play_circle_filled), action: startTimer)
            FontIcon.button(.materialIcon(code: .pause_circle_filled), action: pauseTimer)
        }
    }
    
    func startTimer() {
        pomodoro.play()
        pomodoro.triggerInput("start")
        timer = Timer.scheduledTimer(withTimeInterval: 6, repeats: true) {_ in
            incrementTime()
        }
    }
    
    func pauseTimer() {
        timer?.invalidate()
    }
    
    func incrementTime() {
        time += 0.1
        pomodoro.setInput("timeMinutes", value: time)
        if time == 100 {
            
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView()
    }
}
