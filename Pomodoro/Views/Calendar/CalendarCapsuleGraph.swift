//
//  CalendarCapsuleGraph.swift
//  Pomodoro
//
//  Created by David Speers on 26/06/2023.
//

import SwiftUI

struct CalendarCapsuleGraph: View {
    var calendarEntries: [CalendarGraphEntry]
    @Binding var highlightedCapsuleIndex: Int?
    
    var upperBoundMinutes: Int {
        let largestWorkTimeMinutes = calendarEntries.map {$0.workTimeMinutes}.max() ?? 0
        if largestWorkTimeMinutes == 0 {
            return 60
        } else {
            return 60 * Int(ceil(Double(largestWorkTimeMinutes) / 60.0))
        }
    }
    
    var body: some View {
        GeometryReader { proxy in
            VStack {
                HStack(spacing: 0) {
                    ForEach(Array(calendarEntries.enumerated()), id: \.offset) { index, observation in
                        VStack(spacing: 4) {
                            Spacer()
                            CalendarCapsule(
                                index: index,
                                color: Color(index == highlightedCapsuleIndex ? "Pomodoro Primary" : "Disabled Button"),
                                height: Double(observation.workTimeMinutes) / Double(upperBoundMinutes) * (proxy.size.height-32)
                            )
                            .animation(.xripple(index: index))
                            Text("**\(observation.label ?? "")**")
                        }
                        .padding([.leading, .trailing], proxy.size.width / 120)
                        .onHover { isHovering in
                            if isHovering {
                                highlightedCapsuleIndex = index
                            } else {
                                highlightedCapsuleIndex = nil
                            }
                        }
                    }
                }
            }
        }
    }
}

//struct CalendarCapsuleGraph_Previews: PreviewProvider {
//    static var previews: some View {
//        CalendarCapsuleGraph()
//    }
//}
