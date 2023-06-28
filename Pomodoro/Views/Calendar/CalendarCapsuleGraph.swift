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
                        let isHovered = index == highlightedCapsuleIndex
                        let height = Double(observation.workTimeMinutes) / Double(upperBoundMinutes) * (proxy.size.height-32)
                        VStack(spacing: 4) {
                            Spacer()
                            CalendarCapsule(
                                index: index,
                                color: Color(isHovered ? "Pomodoro Primary" : "Disabled Button"),
                                height: height
                            )
                            .scaleEffect(isHovered ? 1.05 : 1, anchor: .bottom)
                            .animation(.xripple(index: index), value: height)
                            .offset(y: observation.label != nil ? 2 : 0)
                            ZStack {
                                Text("**\(observation.label ?? "")**")
                                    .fixedSize(horizontal: true, vertical: true)
                            }
                            .frame(maxWidth: 0)
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
