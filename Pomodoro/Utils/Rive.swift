//
//  Rive.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 06/10/2023.
//

import Foundation
import RiveRuntime

func updateTimeInput(riveViewModel: RiveViewModel, minutes: Int) {
    riveViewModel.setInput("timeMinutes", value: Float(minutes))
    if Float(minutes%5) < 2.5 {
        riveViewModel.setInput("timeHasPlus2.5", value: false)
        riveViewModel.setInput("timePlus2.5AsPercentage", value: Float((minutes%5)*40))
    } else {
        riveViewModel.setInput("timeHasPlus2.5", value: true)
        riveViewModel.setInput("timePlus2.5AsPercentage", value: Float((Float(minutes%5)-2.5)*40))
    }
    if minutes < 10 {
        riveViewModel.setInput("timeMinutes0To10", value: Float(minutes*10))
    } else {
        riveViewModel.setInput("timeMinutes0To10", value: 100.0)
    }
}
