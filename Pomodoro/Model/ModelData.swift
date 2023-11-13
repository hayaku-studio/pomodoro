//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation
import RiveRuntime

final class ModelData: ObservableObject {
    var progressPercentageTimer: Timer?
    
    @Published var isPopoverShown = false {
        willSet {
            if !newValue {
                pomodoro.pause()
                coffee.pause()
            }
        }
    }
    @Published var pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Pomodoro Timer")
    @Published var coffee = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Coffee Cup Timer")
    @Published var timeSeconds = 0
    @Published var currentCompletedIntervals: Int = 0 {
        didSet {
            progressPercentageTimer?.invalidate()
            if currentCompletedIntervals == 0 {
                return
            } else if currentCompletedIntervals > requiredCompletedIntervals {
                currentCompletedIntervals = 0
            } else {
                var oldProgressPercentage = Float(oldValue*100/requiredCompletedIntervals)
                let newProgressPercentage = Float((currentCompletedIntervals*100)/requiredCompletedIntervals)
                progressPercentageTimer?.invalidate()
                progressPercentageTimer = Timer.scheduledTimer(withTimeInterval: 0.02, repeats: true) {_ in
                    oldProgressPercentage += 0.5
                    if oldProgressPercentage > newProgressPercentage {
                        self.progressPercentageTimer?.invalidate()
                    }
                }
            }
        }
    }
    @Published var automaticallyGoFromFocus: Bool
    @Published var automaticallyGoFromRest: Bool
    @Published var automaticallyGoFromLongRest: Bool
    @Published var requiredCompletedIntervals: Int
    @Published var focusTimeIntervalMinutes: Int
    @Published var restTimeIntervalMinutes: Int
    @Published var longRestTimeIntervalMinutes: Int
    @Published var flowType = FlowType.focus {
        didSet {
            coffee.setInput("isHighlighted", value: flowType == FlowType.longRest)
        }
    }
    @Published var pingVolume: Float
    @Published var timerSnap: TimerSnap
    
    init() {
        let defaults = UserDefaults.standard
        
        let requiredCompletedIntervalsKey = "requiredCompletedIntervals"
        if defaults.object(forKey: requiredCompletedIntervalsKey) == nil {
            requiredCompletedIntervals = 8
        } else {
            requiredCompletedIntervals = defaults.integer(forKey: requiredCompletedIntervalsKey)
        }
        
        let automaticallyGoFromFocusKey = "automaticallyGoFromFocus"
        if defaults.object(forKey: automaticallyGoFromFocusKey) == nil {
            automaticallyGoFromFocus = true
        } else {
            automaticallyGoFromFocus = defaults.bool(forKey: automaticallyGoFromFocusKey)
        }
        let automaticallyGoFromRestKey = "automaticallyGoFromRest"
        if defaults.object(forKey: automaticallyGoFromRestKey) == nil {
            automaticallyGoFromRest = true
        } else {
            automaticallyGoFromRest = defaults.bool(forKey: automaticallyGoFromRestKey)
        }
        let automaticallyGoFromLongRestKey = "automaticallyGoFromLongRest"
        if defaults.object(forKey: automaticallyGoFromLongRestKey) == nil {
            automaticallyGoFromLongRest = true
        } else {
            automaticallyGoFromLongRest = defaults.bool(forKey: automaticallyGoFromLongRestKey)
        }
        
        let focusTimeIntervalMinutesKey = "focusTimeIntervalMinutes"
        if defaults.object(forKey: focusTimeIntervalMinutesKey) == nil {
            focusTimeIntervalMinutes = 25
        } else {
            focusTimeIntervalMinutes = defaults.integer(forKey: focusTimeIntervalMinutesKey)
        }
        let restTimeIntervalMinutesKey = "restTimeIntervalMinutes"
        if defaults.object(forKey: restTimeIntervalMinutesKey) == nil {
            restTimeIntervalMinutes = 5
        } else {
            restTimeIntervalMinutes = defaults.integer(forKey: restTimeIntervalMinutesKey)
        }
        let longRestTimeIntervalMinutesKey = "longRestTimeIntervalMinutes"
        if defaults.object(forKey: longRestTimeIntervalMinutesKey) == nil {
            longRestTimeIntervalMinutes = 15
        } else {
            longRestTimeIntervalMinutes = defaults.integer(forKey: longRestTimeIntervalMinutesKey)
        }
        
        let pingVolumeKey = "pingVolume"
        if defaults.object(forKey: pingVolumeKey) == nil {
            pingVolume = 0.5
        } else {
            pingVolume = defaults.float(forKey: pingVolumeKey)
        }
        
        let timerSnapKey = "timerSnap"
        timerSnap = TimerSnap(rawValue: defaults.string(forKey: timerSnapKey) ?? "")  ?? TimerSnap.seconds10
        
        timeSeconds = focusTimeIntervalMinutes * 60
        updateTimeInput(riveViewModel: pomodoro, minutes: Float(focusTimeIntervalMinutes))
    }
}
