//
//  Timer.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

struct PomoTimer {
    // TODO: I think timeSeconds is the only variable that needs to be here. Everything else can stay in Animation View
    var isPlaying = false
    var timer: Timer?
    var previousTranslation = 0
}
