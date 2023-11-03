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
    if loopedMinutes <= 5 {
        riveViewModel.setInput("0 Magnified", value: (5-loopedMinutes)*20)
        riveViewModel.setInput("5 Magnified", value: loopedMinutes*20)
    } else if loopedMinutes <= 10 {
        riveViewModel.setInput("5 Magnified", value: (10-loopedMinutes)*20)
        riveViewModel.setInput("10 Magnified", value: (loopedMinutes-5)*20)
    } else if loopedMinutes <= 15 {
        riveViewModel.setInput("10 Magnified", value: (15-loopedMinutes)*20)
        riveViewModel.setInput("15 Magnified", value: (loopedMinutes-10)*20)
    } else if loopedMinutes <= 20 {
        riveViewModel.setInput("15 Magnified", value: (20-loopedMinutes)*20)
        riveViewModel.setInput("20 Magnified", value: (loopedMinutes-15)*20)
    } else if loopedMinutes <= 25 {
        riveViewModel.setInput("20 Magnified", value: (25-loopedMinutes)*20)
        riveViewModel.setInput("0 Magnified", value: (loopedMinutes-20)*20)
    }
}
