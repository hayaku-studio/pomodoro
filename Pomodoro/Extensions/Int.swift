//
//  Int.swift
//  Pomodoro
//
//  Created by David Speers on 25/06/2023.
//

import Foundation

extension Int {
    // TODO: simplify expression
    var xgetCompletedHoursStringFromMinutes: String {
        let completedHours = Int(self / 60)
        if completedHours == 1 {
            return "1 hour"
        } else {
            return "\(completedHours) hours"
        }
    }
    
    var xgetRemainderMinutesStringFromMinutes: String {
        let completedMinutes = Int(self % 60)
        if completedMinutes == 1 {
            return "1 minute"
        } else {
            return "\(completedMinutes) minutes"
        }
    }
}
