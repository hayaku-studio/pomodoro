//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

final class ModelData: ObservableObject {
    @Published var pomoTimer = PomoTimer()
    @Published var isPlaying = false
    var timer: Timer?
    @Published var time = 0.0
    var previousTranslation = 0.0
}
