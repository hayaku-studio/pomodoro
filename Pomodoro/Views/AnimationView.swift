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
    
    @State var isPlaying = false
    @State var timer: Timer?
    @State var previousTranslation = 0
    
    let pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine")
    
    var body: some View {
        VStack {
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
                            pauseTimer() // TODO: find a better way to do this (instead of calling pauseTimer hundreds of times)
                            let newTranslation = Int(gesture.translation.width)*3
                            let incrementalTranslation = newTranslation - previousTranslation
                            previousTranslation = newTranslation
                            modelData.timeSeconds -= incrementalTranslation
                            if modelData.timeSeconds > 6000 {
                                modelData.timeSeconds = 6000
                            } else if modelData.timeSeconds < 0 {
                                modelData.timeSeconds = 0
                            }
                            pomodoro.setInput("timeMinutes", value: Float(modelData.timeSeconds)/60)
                        }
                        .onEnded {gesture in
                            previousTranslation = 0
                            if modelData.timeSeconds > 0 {
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
        } else if modelData.timeSeconds > 0 {
            startTimer()
        }
    }
    
    func startTimer() {
        isPlaying = true
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) {_ in
            decrementTime()
        }
    }
    
    func pauseTimer() {
        isPlaying = false
        timer?.invalidate()
    }
    
    func decrementTime() {
        modelData.timeSeconds -= 1
                        pomodoro.setInput("timeMinutes", value: Float(modelData.timeSeconds)/60)
        if modelData.timeSeconds <= 0 {
            timerFinished()
        }
    }
    
    func timerFinished() {
        playSound()
        modelData.timeSeconds = 0
        pauseTimer()
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView().environmentObject(ModelData())
    }
}
