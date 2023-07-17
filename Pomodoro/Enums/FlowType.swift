//
//  FlowType.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 13/07/2023.
//

import Foundation

enum FlowType: String, CaseIterable, Identifiable {
    case focus = "Focus"
    case rest = "Rest"
    
    var id: String { rawValue }
}
