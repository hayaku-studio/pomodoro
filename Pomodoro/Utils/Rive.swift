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
    for timeToMagnify in TimeToMagnify.allCases {
        riveViewModel.setInput(timeToMagnify.id, value: getMagnificationFactor(timeToMagnify: timeToMagnify, timeMinutes: minutes))
    }
}

func getMagnificationFactor(timeToMagnify: TimeToMagnify, timeMinutes: Float) -> Float {
    let loopedMinutes = timeMinutes.truncatingRemainder(dividingBy: 25)
    let magnificationFactor: Float = 10.0
    switch timeToMagnify {
    case .time0:
        let absoluteDifference0 = abs(loopedMinutes < 12.5 ? 0 - loopedMinutes : 25 - loopedMinutes)
        return 100 - absoluteDifference0 * magnificationFactor
    case .time10, .time15:
        return 100 - abs(timeToMagnify.numberValue - loopedMinutes) * magnificationFactor
    case .time5, .time20:
        let absoluteDifference = abs(loopedMinutes < abs(timeToMagnify.numberValue - 12.5) ? timeToMagnify.numberValue - loopedMinutes : timeToMagnify.numberValue - loopedMinutes)
        return 100 - absoluteDifference * magnificationFactor
    }}
