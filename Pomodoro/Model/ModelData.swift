//
//  ModelData.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import Foundation

final class ModelData: ObservableObject {
    @Published var pomoTimer = PomoTimer()
}
