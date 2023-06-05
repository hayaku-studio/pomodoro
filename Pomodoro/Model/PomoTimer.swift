//
//  Timer.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

struct PomoTimer {
    var isPlaying = false
    var timer: Timer?
    var time = 0.0
    var previousTranslation = 0.0
}
