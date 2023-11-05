//
//  Rive.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 06/10/2023.
//

import Foundation
import RiveRuntime

func updateTimeInput(riveViewModel: RiveViewModel, minutes: Float) {
    riveViewModel.setInput("timeMinutes", value: minutes)
    let loopedMinutes = minutes.truncatingRemainder(dividingBy: 25)
    let magnificationFactor: Float = 15.0
    let absoluteDifference0 = abs(loopedMinutes < 12.5 ? 0 - loopedMinutes : 25 - loopedMinutes)
    riveViewModel.setInput("0 Magnified", value: (100 - absoluteDifference0 * magnificationFactor))
    for timeToMagnify: Float in [5, 20] {
        let absoluteDifference = abs(loopedMinutes < abs(timeToMagnify - 12.5) ? timeToMagnify - loopedMinutes : timeToMagnify - loopedMinutes)
        riveViewModel.setInput("\(Int(timeToMagnify)) Magnified", value: (100 - absoluteDifference * magnificationFactor))
    }
    for timeToMagnify in [10, 15] {
        riveViewModel.setInput("\(timeToMagnify) Magnified", value: 100 - abs(Float(timeToMagnify) - loopedMinutes) * magnificationFactor)
    }
}
