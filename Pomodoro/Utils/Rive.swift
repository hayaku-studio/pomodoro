//
//  Rive.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 06/10/2023.
//

import Foundation
import RiveRuntime

func updateTimeInput(riveViewModel: RiveViewModel, minutes: Float) {
    let truncatedMinutes = minutes.truncatingRemainder(dividingBy: 5.0)
    riveViewModel.setInput("timeMinutes", value: minutes)
    if truncatedMinutes < 2.5 {
        riveViewModel.setInput("timeHasPlus2.5", value: false)
        riveViewModel.setInput("timePlus2.5AsPercentage", value: truncatedMinutes*40)
    } else {
        riveViewModel.setInput("timeHasPlus2.5", value: true)
        riveViewModel.setInput("timePlus2.5AsPercentage", value: (truncatedMinutes-2.5)*40)
    }
    if minutes < 10 {
        riveViewModel.setInput("timeMinutes0To10", value: minutes*10)
    } else {
        riveViewModel.setInput("timeMinutes0To10", value: 100.0)
    }
}
