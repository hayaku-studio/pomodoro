//
//  CalendarEntryCapsule.swift
//  Pomodoro
//
//  Created by David Speers on 17/06/2023.
//

import SwiftUI

struct CalendarCapsule: View, Equatable {
    var index: Int
    var color: Color
    var height: Double
    
    var body: some View {
        Capsule()
            .fill(color)
            .frame(height: height)
    }
}

struct CalendarCapsule_Previews: PreviewProvider {
    static var previews: some View {
        CalendarCapsule(
            index: 0,
            color: .red,
            height: 150
        )
    }
}
