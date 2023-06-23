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

struct WeeklyCalendarGraph: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var calendarEntries: [CalendarEntry]
    @State private var highlightedCapsuleIndex: Int?
    
    private let context: NSManagedObjectContext
    
    init(context: NSManagedObjectContext) {
        self.context = context
        calendarEntries = getCalendarEntriesForWeek(context: context, date: Date.now)
    }
    
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
                    if let unwrappedIndex = highlightedCapsuleIndex {
                        let date = calendarEntries[unwrappedIndex].date!
                        Text(verbatim: "\(date.xget(.day)) \(date.xmonth) \(date.xget(.year))")
                        let totalMinutesForIndex = Int(calendarEntries[unwrappedIndex].workTimeMinutes)
                        Text("\(totalMinutesForIndex.getCompletedHoursStringFromMinutes) \(totalMinutesForIndex.getRemainderMinutesStringFromMinutes)")
                    } else {
                        Text(verbatim: getWeekRange(calendarEntries: calendarEntries))
                        let totalMinutesForRange = getTotalWorkMinutes(calendarEntries: calendarEntries)
                        Text("\(totalMinutesForRange.getCompletedHoursStringFromMinutes) \(totalMinutesForRange.getRemainderMinutesStringFromMinutes)")
                    }
                }
                Spacer()
                FontIcon.button(.materialIcon(code: .chevron_right), action: nextWeek, padding: 4, fontsize: 24)
                    .foregroundColor(Color("Disabled Button"))
            }
            GeometryReader { proxy in
                VStack {
                    HStack(spacing: 0) {
                        ForEach(Array(calendarEntries.enumerated()), id: \.offset) { index, observation in
                            VStack {
                                Spacer()
                                CalendarCapsule(
                                    index: index,
                                    color: Color(index == highlightedCapsuleIndex ? "Pomodoro Primary" : "Disabled Button"),
                                    height: Double(observation.workTimeMinutes) / Double(upperBoundMinutes) * proxy.size.height
                                )
                                .animation(.ripple(index: index))
                                Text("**\(observation.date!.xdayOfWeek)**")
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
    
    func previousWeek() {
        modelData.calendarPastWeeks += 1
        updateCalendarEntries()
    }
    
    func nextWeek() {
        modelData.calendarPastWeeks -= 1
        updateCalendarEntries()
    }
    
    func updateCalendarEntries() {
        if let date = Calendar.current.date(byAdding: .day, value: -(7*modelData.calendarPastWeeks), to: Date.now) {
            calendarEntries = getCalendarEntriesForWeek(context: context, date: date)
        }
    }
    
    func getWeekRange(calendarEntries: [CalendarEntry]) -> String {
        let firstDate = calendarEntries.first!.date!
        let lastDate = calendarEntries.last!.date!
        // TODO: when going over the month/year, maybe expand on first date
        return "\(firstDate.xget(.day)) - \(lastDate.xget(.day)) \(lastDate.xmonth) \(lastDate.xget(.year))"
    }
    
    func getTotalWorkMinutes(calendarEntries: [CalendarEntry]) -> Int {
        return calendarEntries.map({Int($0.workTimeMinutes)}).reduce(0, +)
    }
}

extension Int {
    // TODO: simplify expression
    var getCompletedHoursStringFromMinutes: String {
        let completedHours = Int(self / 60)
        if completedHours == 1 {
            return "1 hour"
        } else {
            return "\(completedHours) hours"
        }
    }
    
    var getRemainderMinutesStringFromMinutes: String {
        let completedMinutes = Int(self % 60)
        if completedMinutes == 1 {
            return "1 minute"
        } else {
            return "\(completedMinutes) minutes"
        }
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
