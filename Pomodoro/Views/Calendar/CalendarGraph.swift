//
//  CalendarGraph.swift
//  Pomodoro
//
//  Created by David Speers on 18/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

extension Animation {
    static func ripple(index: Int) -> Animation {
        Animation.spring(dampingFraction: 0.5)
            .speed(2)
            .delay(0.03 * Double(index))
    }
}

struct CalendarGraph: View {
    var calendarEntries: [CalendarEntry]
    
    var upperBoundMinutes: Int {
        let largestWorkTimeMinutes: Int64 = calendarEntries.map {$0.workTimeMinutes}.max() ?? 1
        return 60 * Int(ceil(Double(largestWorkTimeMinutes) / 60.0))
    }
    
    var body: some View {
        VStack {
            HStack {
                FontIcon.button(.materialIcon(code: .chevron_left), action: previousWeek, padding: 4, fontsize: 24)
                    .foregroundColor(Color("Pomodoro Primary"))
                Spacer()
                VStack {
                    Text("12th - 18th June 2023")
                    Text("2 hours 15 minutes")
                }
                Spacer()
                FontIcon.button(.materialIcon(code: .chevron_right), action: nextWeek, padding: 4, fontsize: 24)
                    .foregroundColor(Color("Disabled Button"))
            }
            GeometryReader { proxy in
                VStack {
                    Spacer()
                    HStack(alignment: .bottom, spacing: proxy.size.width / 120) {
                        ForEach(Array(calendarEntries.enumerated()), id: \.offset) { index, observation in
                            CalendarCapsule(
                                index: index,
                                color: Color("Pomodoro Primary"),
                                height: Double(observation.workTimeMinutes) / Double(upperBoundMinutes) * proxy.size.height
                            )
                            .animation(.ripple(index: index))
                        }
                    }
                }
            }
        }
    }
    
    func previousWeek() {
        print("Previous")
    }
    
    func nextWeek() {
        print("Next")
    }
}

//struct CalendarGraph_Previews: PreviewProvider {
//    static var hike = ModelData().hikes[0]
//
//    static var previews: some View {
//        Group {
//            CalendarGraph(hike: hike, path: \.elevation)
//                .frame(height: 200)
//            CalendarGraph(hike: hike, path: \.heartRate)
//                .frame(height: 200)
//            CalendarGraph(hike: hike, path: \.pace)
//                .frame(height: 200)
//        }
//    }
//}
