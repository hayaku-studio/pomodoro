//
//  AnimationView.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI
import SwiftUIFontIcon
import SwiftUITooltip
import RiveRuntime

struct AnimationView: View {
    @EnvironmentObject private var modelData: ModelData
    @Environment(\.managedObjectContext) var managedObjectContext
    
    @State private var isPlaying = false
    @State private var animationTimer: Timer?
    @State private var workTimeTimer: Timer?
    @State private var previousTranslation = 0
    @State private var isTimerGreaterThanZero = false
    
    @State private var pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine") // TODO: in all documentation, `let` is used instead of `@State var`. However after opening the Settings modal, the animation breaks. This somehow fixes it
    
    @State var tooltipHideTimer: Timer?
    @State var isTooltipVisible = false
    var tooltipConfig = DefaultTooltipConfig()
    
    init() {
        let backgroundcolor = Color("Settings Card Background")
        tooltipConfig.borderColor = backgroundcolor
        tooltipConfig.backgroundColor = backgroundcolor
    }
    
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
                            pauseTimers() // TODO: find a better way to do this (instead of calling pauseTimers hundreds of times)
                            isTooltipVisible = false
                            let timerSnapValue = isOptionKeyPressed() ? 60 : modelData.timerSnap.numberValue
                            let newTranslation = Int(Float(gesture.translation.width)*5.0/Float(timerSnapValue))*timerSnapValue
                            let incrementalTranslation = newTranslation - previousTranslation
                            previousTranslation = newTranslation
                            let amountOfSecondsFromSnap = modelData.timeSeconds % timerSnapValue
                            if amountOfSecondsFromSnap == 0 {
                                modelData.timeSeconds -= incrementalTranslation
                            } else if gesture.translation.width > 0 {
                                modelData.timeSeconds -= amountOfSecondsFromSnap
                            } else {
                                modelData.timeSeconds += timerSnapValue - amountOfSecondsFromSnap
                            }
                            if modelData.timeSeconds > 6000 {
                                modelData.timeSeconds = 6000
                            } else if modelData.timeSeconds < 0 {
                                modelData.timeSeconds = 0
                            }
                            pomodoro.setInput("timeMinutes", value: Float(modelData.timeSeconds)/60)
                            if (modelData.timeSeconds > 0) {
                                isTimerGreaterThanZero = true
                            } else {
                                if isTimerGreaterThanZero {
                                    playSound(volume: modelData.pingVolume)
                                }
                                isTimerGreaterThanZero = false
                            }
                        }
                        .onEnded {gesture in
                            previousTranslation = 0
                            if modelData.timeSeconds > 0 {
                                startTimers()
                            }
                        }
                    )
            }
            FontIcon.button(.materialIcon(code: isPlaying ? .pause : .play_arrow), action: isTimerGreaterThanZero ? toggleTimers : openTooltip, padding: 4, fontsize: 24)
                .foregroundColor(Color("Dark Mode Button Contrast"))
                .background(Circle().fill(Color(isTimerGreaterThanZero ? "Pomodoro Primary" : "Disabled Button")))
                .frame(width: 36, height: 36)
                .offset(y: -8)
                .tooltip(isTooltipVisible, side: .top, config: tooltipConfig) {
                    Text("Drag the timer left ← to start.")
                }
        }
    }
    
    func toggleTimers() {
        if isPlaying {
            pauseTimers()
        } else if modelData.timeSeconds > 0 {
            startTimers()
        }
    }
    
    func startTimers() {
        isPlaying = true
        animationTimer?.invalidate()
        animationTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) {_ in
            decrementTime()
        }
        workTimeTimer?.invalidate()
        workTimeTimer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) {_ in
            incrementTodaysWorkTimeMinutes(context: managedObjectContext)
        }
    }
    
    func pauseTimers() {
        isPlaying = false
        animationTimer?.invalidate()
        workTimeTimer?.invalidate()
    }
    
    func decrementTime() {
        modelData.timeSeconds -= 1
        pomodoro.setInput("timeMinutes", value: Float(modelData.timeSeconds)/60)
        if modelData.timeSeconds <= 0 {
            timerFinished()
        }
    }
    
    func timerFinished() {
        playSound(volume: modelData.pingVolume)
        modelData.timeSeconds = 0
        pauseTimers()
    }
    
    func openTooltip() {
        isTooltipVisible = true
        tooltipHideTimer?.invalidate()
        tooltipHideTimer = Timer.scheduledTimer(withTimeInterval: 2, repeats: true) {_ in
            isTooltipVisible = false
        }
    }
    
    func isOptionKeyPressed() -> Bool {
        return NSEvent.modifierFlags.contains(.option)
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView().environmentObject(ModelData())
    }
}
