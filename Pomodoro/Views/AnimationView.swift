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
    @EnvironmentObject private var modelData: ModelData
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
                            let newTranslation = Int(gesture.translation.width)*3
                            let incrementalTranslation = newTranslation - modelData.pomoTimer.previousTranslation
                            modelData.pomoTimer.previousTranslation = newTranslation
                            modelData.pomoTimer.timeSeconds -= incrementalTranslation
                            if modelData.pomoTimer.timeSeconds > 6000 {
                                modelData.pomoTimer.timeSeconds = 6000
                            } else if modelData.pomoTimer.timeSeconds < 0 {
                                modelData.pomoTimer.timeSeconds = 0
                            }
                            pomodoro.setInput("timeMinutes", value: Float(modelData.pomoTimer.timeSeconds/60))
                        }
                        .onEnded {gesture in
                            modelData.pomoTimer.previousTranslation = 0
                            if modelData.pomoTimer.timeSeconds > 0 {
                                startTimer()
                            }
                        }
                    )
            }
            FontIcon.button(.materialIcon(code: modelData.pomoTimer.isPlaying ? .pause_circle_filled : .play_circle_filled), action: toggleTimer, fontsize: 30)
                .foregroundColor(Color("Pomodoro Primary"))
                .frame(width: 40, height: 40.0)
        }
    }
    
    func toggleTimer() {
        if modelData.pomoTimer.isPlaying {
            pauseTimer()
        } else if modelData.pomoTimer.timeSeconds > 0 {
            startTimer()
        }
    }
    
    func startTimer() {
        modelData.pomoTimer.isPlaying = true
        modelData.pomoTimer.timer?.invalidate()
        modelData.pomoTimer.timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) {_ in
            decrementTime()
        }
    }
    
    func pauseTimer() {
        modelData.pomoTimer.isPlaying = false
        modelData.pomoTimer.timer?.invalidate()
    }
    
    func decrementTime() {
        modelData.pomoTimer.timeSeconds -= 1
        pomodoro.setInput("timeMinutes", value: Float(modelData.pomoTimer.timeSeconds/60))
        if modelData.pomoTimer.timeSeconds <= 0 {
            modelData.pomoTimer.timeSeconds = 0
            pauseTimer()
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView().environmentObject(ModelData())
    }
}
