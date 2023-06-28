//
//  CalendarCapsuleGraph.swift
//  Pomodoro
//
//  Created by David Speers on 26/06/2023.
//

import SwiftUI

struct CalendarCapsuleGraph: View {
    @EnvironmentObject private var modelData: ModelData

    var calendarEntries: [CalendarGraphEntry]
    @Binding var highlightedCapsuleIndex: Int?
    
    var upperBoundMinutes: Int {
        return max(calendarEntries.map {$0.workTimeMinutes}.max() ?? 0, 1)
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
                            // TODO: this Text makes some CalendarCapsules wider
                            Text("**\(observation.label ?? "")**")
                                .fixedSize(horizontal: true, vertical: true)
                        }
                        .padding([.leading, .trailing], modelData.calendarFormat == CalendarFormat.month ? proxy.size.width / 240 : proxy.size.width / 120)
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
