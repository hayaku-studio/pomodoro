//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

final class ModelData: ObservableObject {
    @Published var timeSeconds = 0
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
