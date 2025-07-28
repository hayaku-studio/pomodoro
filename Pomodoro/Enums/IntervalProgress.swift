//
//  IntervalProgress.swift
//  Pomodoro Timer
//
//  Created by David Speers on 31/07/2023.
//

import Foundation

enum IntervalProgress: String, CaseIterable, Identifiable {
    case notStarted = "0"
    case halfCompleted = "50"
    case completed = "100"
    
    var id: String { rawValue }
}
