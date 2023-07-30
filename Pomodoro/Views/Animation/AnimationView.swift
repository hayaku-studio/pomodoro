//
//  AnimationView.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI
import SwiftUIFontIcon
import SwiftUITooltip

struct AnimationView: View {
    @EnvironmentObject private var modelData: ModelData
    @Environment(\.managedObjectContext) var managedObjectContext
    
    @State private var isPlaying = false
    @State private var animationTimer: Timer?
    @State private var workTimeTimer: Timer?
    @State private var previousTranslation = 0
    @State private var isTimerGreaterThanZero = true
    
    @State var tooltipHideTimer: Timer?
    @State var isTooltipVisible = false
    var tooltipConfig = DefaultTooltipConfig()
    
    init() {
        let backgroundcolor = Color("Settings Card Background")
        tooltipConfig.borderColor = backgroundcolor
        tooltipConfig.backgroundColor = backgroundcolor
    }
    
    var body: some View {
        VStack(spacing: 0) {
            ZStack {
                if modelData.isPopoverShown {
                    switch modelData.flowType {
                    case .focus:
                        modelData.pomodoro.view().scaledToFit().frame(width: 200, height: 200)
                    default:
                        modelData.coffee.view().scaledToFit().frame(width: 200, height: 200)
                    }
                }
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
                            setAnimationTime(seconds: modelData.timeSeconds)
                            if (modelData.timeSeconds > 0) {
                                isTimerGreaterThanZero = true
                            } else {
                                if isTimerGreaterThanZero {
                                    triggerTimerPing()
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
            .offset(y: -12)
            HStack {
                AnimationButtonView(action: isTimerGreaterThanZero ? toggleTimers : openTooltip, imageName: isPlaying ? "pause" : "play", isDisabled: !isTimerGreaterThanZero)
                .tooltip(isTooltipVisible, side: .top, config: tooltipConfig) {
                    Text("Drag the timer left ← to start.")
                }
                AnimationButtonView(action: resetTimer, imageName: "gobackward", isDisabled: false)
                AnimationButtonView(action: skipToNextFlowType, imageName: "forward.end", isDisabled: false)
                
            }
            .offset(y: -16)
        }
    }
    
    func resetTimer() {
        switch modelData.flowType {
        case .focus:
            modelData.timeSeconds = modelData.focusTimeIntervalMinutes*60
        case .rest:
            modelData.timeSeconds = modelData.restTimeIntervalMinutes*60
        case .longRest:
            modelData.timeSeconds = modelData.longRestTimeIntervalMinutes*60
        }
        setAnimationTime(seconds: modelData.timeSeconds)
        isTimerGreaterThanZero = true
    }
    
    func skipToNextFlowType() {
        modelData.currentCompletedIntervals += 1
        switch modelData.flowType {
        case .focus:
            modelData.flowType = FlowType.rest
            modelData.timeSeconds = modelData.restTimeIntervalMinutes*60
        default:
            if modelData.currentCompletedIntervals == modelData.requiredCompletedIntervals {
                modelData.flowType = FlowType.longRest
                modelData.timeSeconds = modelData.longRestTimeIntervalMinutes*60
            } else {
                modelData.flowType = FlowType.focus
                modelData.timeSeconds = modelData.focusTimeIntervalMinutes*60
            }
        }
        setAnimationTime(seconds: modelData.timeSeconds)
        isTimerGreaterThanZero = true
        startTimers()
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
        workTimeTimer?.invalidate()
        workTimeTimer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) {_ in
            switch modelData.flowType {
            case .focus:
                incrementTodaysWorkTimeMinutes(context: managedObjectContext)
            default:
                incrementTodaysRestTimeMinutes(context: managedObjectContext)
            }
        }
        animationTimer?.invalidate()
        animationTimer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) {_ in
            decrementTime()
        }
    }
    
    func pauseTimers() {
        isPlaying = false
        // TODO: pause the animation (for performance reasons), without causing the "later ping" bug
        //  modelData.pomodoro.pause()
        animationTimer?.invalidate()
        workTimeTimer?.invalidate()
    }
    
    func decrementTime() {
        modelData.timeSeconds -= 1
        setAnimationTime(seconds: modelData.timeSeconds)
        if modelData.timeSeconds <= 0 {
            timerFinished()
        }
    }
    
    func timerFinished() {
        // if-statement needed because triggerInputs play when RiveModel plays again
        // therefore, without this, the ping animation plays when you close the popover, wait for 00:00, wait a few seconds, and reopen the popover
        if modelData.isPopoverShown {
            triggerTimerPing()
        }
        playSound(volume: modelData.pingVolume)
        modelData.timeSeconds = 0
        isTimerGreaterThanZero = false
        pauseTimers()
        switch modelData.flowType {
        case .focus:
            if modelData.automaticallyGoFromFocus {
                skipToNextFlowType()
            }
        case .rest:
            if modelData.automaticallyGoFromRest {
                skipToNextFlowType()
            }
        case .longRest:
            if modelData.automaticallyGoFromLongRest {
                skipToNextFlowType()
            }
        }
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
    
    private func setAnimationTime(seconds: Int) {
        switch modelData.flowType {
        case .focus:
            modelData.pomodoro.setInput("timeMinutes", value: Float(seconds)/60)
        default:
            modelData.coffee.setInput("timeMinutes", value: Float(seconds)/60)
        }
    }
    
    private func triggerTimerPing() {
        switch modelData.flowType {
        case .focus:
            modelData.pomodoro.triggerInput("finishPing")
        default:
            modelData.coffee.triggerInput("finishPing")
        }
    }
}

struct AnimationView_Previews: PreviewProvider {
    static var previews: some View {
        AnimationView().environmentObject(ModelData())
    }
}
