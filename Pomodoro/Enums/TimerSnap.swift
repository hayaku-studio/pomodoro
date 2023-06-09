//
//  TimerSnap.swift
//  Pomodoro
//
//  Created by David Speers on 09/06/2023.
//

enum TimerSnap: String, CaseIterable, Identifiable {
    case seconds3 = "3 Seconds"
    case seconds10 = "10 Seconds"
    case seconds15 = "15 Seconds"
    case seconds30 = "30 Seconds"
    case minute = "Minute"
    
    var id: String { rawValue }
    
    var numberValue: Int {
        switch self {
        case .seconds3:
            return 3
        case .seconds10:
            return 10
        case .seconds15:
            return 15
        case .seconds30:
            return 30
        case .minute:
            return 60
        }
    }
}
