//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

final class ModelData: ObservableObject {
    @Published var timeSeconds = 0
    @Published var pingVolume: Float = 0.5
}
