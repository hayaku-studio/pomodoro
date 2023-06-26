//
//  Animation.swift
//  Pomodoro
//
//  Created by David Speers on 26/06/2023.
//

import Foundation
import SwiftUI

extension Animation {
    static func xripple(index: Int) -> Animation {
        Animation.spring(dampingFraction: 0.5)
            .speed(2)
            .delay(0.03 * Double(index))
    }
}
