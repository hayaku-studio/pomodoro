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
    @Published var timeSeconds = 0
    @Published var flowType = FlowType.focus
    @Published var pingVolume: Float
    @Published var timerSnap: TimerSnap
    @Published var earliestCalendarEntryDate: Date?
    @Published var calendarFormat = CalendarFormat.week
    
    init() {
        let defaults = UserDefaults.standard
        
        let pingVolumeKey = "pingVolume"
        if defaults.object(forKey: pingVolumeKey) == nil {
            pingVolume = 0.5
        } else {
            pingVolume = defaults.float(forKey: pingVolumeKey)
        }
        
        let timerSnapKey = "timerSnap"
        timerSnap = TimerSnap(rawValue: defaults.string(forKey: timerSnapKey) ?? "")  ?? TimerSnap.seconds10
    }
}
