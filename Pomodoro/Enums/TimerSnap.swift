//
//  TimerSnap.swift
//  Pomodoro
//
//  Created by David Speers on 09/06/2023.
//

enum TimerSnap: String, CaseIterable, Identifiable {
    case second = "1 Second"
    case seconds5 = "5 Seconds"
    case seconds10 = "10 Seconds"
    case seconds30 = "30 Seconds"
    case minute = "Minute"
    
    var id: String { rawValue }
    
    var numberValue: Int {
        switch self {
        case .second:
            return 1
        case .seconds5:
            return 5
        case .seconds10:
            return 10
        case .seconds30:
            return 30
        case .minute:
            return 60
        }
    }
}
