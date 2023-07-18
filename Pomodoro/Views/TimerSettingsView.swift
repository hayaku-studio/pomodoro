//
//  TimerSettingsView.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 10/07/2023.
//

import SwiftUI
import Combine
import RiveRuntime

struct TimerSettingsView: View {
    @EnvironmentObject private var modelData: ModelData
    
    @State private var flowType = FlowType.focus
    @State private var pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Timer Artboard")
    @State private var coffee = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Coffee Cup Artboard")
    @State private var previousTranslation = 0
    @State private var timeMinutes = 0
    
    var body: some View {
        VStack {
            Text("Set Timer Interval")
                .font(.headline)
            Picker("", selection: $flowType) {
                ForEach(FlowType.allCases) { format in
                    Text(format.id).tag(format)
                }
            }
            .pickerStyle(.segmented)
            .onReceive([self.flowType].publisher.first()) { (value: FlowType) in
                switch value {
                case .focus:
                    timeMinutes = modelData.focusTimeIntervalMinutes
                case .rest:
                    timeMinutes = modelData.restTimeIntervalMinutes
                case .longRest:
                    timeMinutes = modelData.longRestTimeIntervalMinutes
                }
                setTimerTime(minutes: timeMinutes)
            }
            ZStack {
                let frameSize = 150.0
                switch flowType {
                case .focus:
                    pomodoro.view().scaledToFit().frame(width: frameSize, height: frameSize)
                default:
                    coffee.view().scaledToFit().frame(width: frameSize, height: frameSize)
                }
                // TODO: better solution
                Rectangle()
                //                    .stroke(.green) // uncomment to see hitbox
                    .opacity(0)
                    .contentShape(Rectangle())
                    .frame(width: frameSize, height: frameSize)
                    .gesture(DragGesture()
                        .onChanged {gesture in
                            let newTranslation = Int(Float(gesture.translation.width)/6)
                            let incrementalTranslation = newTranslation - previousTranslation
                            previousTranslation = newTranslation
                            timeMinutes -= incrementalTranslation
                            if timeMinutes > 100 {
                                timeMinutes = 100
                            } else if timeMinutes < 1 {
                                timeMinutes = 1
                            }
                            setTimerTime(minutes: timeMinutes)
                        }
                        .onEnded {_ in
                            previousTranslation = 0
                            var timeIntervalMinutesKey = ""
                            switch flowType {
                            case .focus:
                                modelData.focusTimeIntervalMinutes = timeMinutes
                                timeIntervalMinutesKey = "focusTimeIntervalMinutes"
                            case .rest:
                                modelData.restTimeIntervalMinutes = timeMinutes
                                timeIntervalMinutesKey = "restTimeIntervalMinutes"
                            case .longRest:
                                modelData.longRestTimeIntervalMinutes = timeMinutes
                                timeIntervalMinutesKey = "longRestTimeIntervalMinutes"
                            }
                            UserDefaults.standard.set(timeMinutes, forKey: timeIntervalMinutesKey)
                            // TODO: reduce possibility of bugs by having key be some global var
                        }
                    )
            }
            .background(Color("Modal Content Background"))
            .mask(RoundedRectangle(cornerRadius: 20, style: .continuous))
            .shadow(radius: 5, x: 0, y: 3)
            .shadow(radius: 30, x: 0, y: 30)
        }
    }
    
    private func setTimerTime(minutes: Int) {
        switch flowType {
        case .focus:
            pomodoro.setInput("timeMinutes", value: Float(minutes))
        default:
            coffee.setInput("timeMinutes", value: Float(minutes))
        }
    }
}

struct TimerSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        TimerSettingsView()
    }
}
