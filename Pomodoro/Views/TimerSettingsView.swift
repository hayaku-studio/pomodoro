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
    @State private var flowType = FlowType.focus
    @State private var pomodoro = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Timer Artboard")
    @State private var coffee = RiveViewModel(fileName: "pomodoro_timer", stateMachineName: "State Machine", artboardName: "Coffee Cup Artboard")
    @State private var previousTranslation = 0
    @State private var timeMinutes = 0
    
    var body: some View {
        VStack {
            Picker("", selection: $flowType) {
                ForEach(FlowType.allCases) { format in
                    Text(format.id).tag(format)
                }
            }
            .pickerStyle(.segmented)
            .onReceive([self.flowType].publisher.first()) { (value) in
                print(value)
            }
            Text("Set \(flowType.rawValue) Time")
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
                            setTimerTime(seconds: timeMinutes)
                        }
                        .onEnded {gesture in
                            previousTranslation = 0
                        }
                    )
            }
            .background(Color("Modal Content Background"))
            .mask(RoundedRectangle(cornerRadius: 20, style: .continuous))
            .shadow(radius: 5, x: 0, y: 3)
            .shadow(radius: 30, x: 0, y: 30)
        }
    }
    
    private func setTimerTime(seconds: Int) {
        switch flowType {
        case .focus:
            pomodoro.setInput("timeMinutes", value: Float(seconds))
        default:
            coffee.setInput("timeMinutes", value: Float(seconds))
        }
    }
}

struct TimerSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        TimerSettingsView()
    }
}
