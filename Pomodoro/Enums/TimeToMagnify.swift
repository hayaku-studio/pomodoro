//
//  TimeToMagnify.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 18/11/2023.
//

import Foundation

enum TimeToMagnify: String, CaseIterable, Identifiable {
    case time0 = "0 Magnified"
    case time5 = "5 Magnified"
    case time10 = "10 Magnified"
    case time15 = "15 Magnified"
    case time20 = "20 Magnified"
    
    var id: String { rawValue }
    
    var numberValue: Float {
        switch self {
        case .time0:
            return 0
        case .time5:
            return 5
        case .time10:
            return 10
        case .time15:
            return 15
        case .time20:
            return 20
        }
    }
}
