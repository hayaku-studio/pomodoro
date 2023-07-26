//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation
import RiveRuntime

final class ModelData: ObservableObject {
    @Published var isPopoverShown = false {
        willSet {
            if !newValue {
                pomodoro.pause()
                coffee.pause()
            }
        }
    }
    @Published var pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Timer Artboard")
    @Published var coffee = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Coffee Cup Artboard")
    @Published var progressIndicator = RiveViewModel(fileName: "progress_indicator", stateMachineName: "State Machine")
    @Published var timeSeconds = 0
    @Published var currentCompletedIntervals = 0 {
        didSet {
            if currentCompletedIntervals > requiredCompletedIntervals {
                currentCompletedIntervals = 0
            }
            progressIndicator.setInput("progressPercentage", value: Float((currentCompletedIntervals*100)/requiredCompletedIntervals))
        }
    }
    @Published var requiredCompletedIntervals: Int
    @Published var focusTimeIntervalMinutes: Int
    @Published var restTimeIntervalMinutes: Int
    @Published var longRestTimeIntervalMinutes: Int
    @Published var flowType = FlowType.focus
    @Published var pingVolume: Float
    @Published var timerSnap: TimerSnap
    @Published var earliestCalendarEntryDate: Date?
    @Published var calendarFormat = CalendarFormat.week
    
    init() {
        let defaults = UserDefaults.standard
        
        let requiredCompletedIntervalsKey = "requiredCompletedIntervals"
        if defaults.object(forKey: requiredCompletedIntervalsKey) == nil {
            requiredCompletedIntervals = 8
        } else {
            requiredCompletedIntervals = defaults.integer(forKey: requiredCompletedIntervalsKey)
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
        pomodoro.setInput("timeMinutes", value: Float(focusTimeIntervalMinutes))
    }
}
