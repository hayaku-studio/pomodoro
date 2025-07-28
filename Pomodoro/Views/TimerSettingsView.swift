//
//  TimerSettingsView.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 10/07/2023.
//

import Combine
import RiveRuntime
import SwiftUI

struct TimerSettingsView: View {
    let minRequiredCompletedIntervals = 4
    let maxRequiredCompletedIntervals = 16

    @EnvironmentObject private var modelData: ModelData

    @State private var flowType = FlowType.focus
    @State private var pomodoro = RiveViewModel(
        fileName: "pomodoro_timer", stateMachineName: "State Machine",
        artboardName: "Pomodoro Timer")
    @State private var coffee = RiveViewModel(
        fileName: "pomodoro_timer", stateMachineName: "State Machine",
        artboardName: "Coffee Cup Timer")
    @State private var previousTranslation = 0
    @State private var timeMinutes = 0 {
        didSet {
            setAnimationTime(minutes: timeMinutes)
        }
    }

    var body: some View {
        VStack(alignment: .leading) {
            Picker("", selection: $flowType) {
                ForEach(FlowType.allCases) { format in
                    Text(format.id).tag(format)
                }
            }
            .pickerStyle(.segmented)
            .onChange(of: flowType) { (value: FlowType) in
                //                coffee.setInput("isHighlighted", value: value == FlowType.longRest)
                switch value {
                case .focus:
                    timeMinutes = modelData.focusTimeIntervalMinutes
                case .rest:
                    timeMinutes = modelData.restTimeIntervalMinutes
                //                case .longRest:
                //                    timeMinutes = modelData.longRestTimeIntervalMinutes
                }
            }
            Text("Set Timer Interval")
                .font(.headline)
                .padding(.leading, 10)
            Text("Click and Drag the timer to set.")
                .font(.caption)
                .foregroundColor(Color("Settings Heading Text"))
                .padding(.leading, 10)
            HStack {
                Spacer()
                ZStack {
                    let frameSize = 150.0
                    if modelData.isPopoverShown {
                        switch flowType {
                        case .focus:
                            pomodoro.view().scaledToFit().frame(width: frameSize, height: frameSize)
                        default:
                            coffee.view().scaledToFit().frame(width: frameSize, height: frameSize)
                        }
                    }
                    // TODO: better solution
                    Rectangle()
                        //                    .stroke(.green) // uncomment to see hitbox
                        .opacity(0)
                        .contentShape(Rectangle())
                        .frame(width: frameSize, height: frameSize)
                        //.onTapGesture() // TODO: On too many taps give a drag hint - https://www.instagram.com/p/CewsSvBrTBa/
                        .dragPointerStyle(isDragging: previousTranslation != 0)
                        .gesture(
                            DragGesture()
                                .onChanged { gesture in
                                    let newTranslation = Int(Float(gesture.translation.width) / 6)
                                    let incrementalTranslation =
                                        newTranslation - previousTranslation
                                    previousTranslation = newTranslation
                                    timeMinutes -= incrementalTranslation
                                    if timeMinutes > 90 {
                                        timeMinutes = 90
                                    } else if timeMinutes < 1 {
                                        timeMinutes = 1
                                    }
                                }
                                .onEnded { _ in
                                    previousTranslation = 0
                                    var timeIntervalMinutesKey = ""
                                    switch flowType {
                                    case .focus:
                                        modelData.focusTimeIntervalMinutes = timeMinutes
                                        timeIntervalMinutesKey = "focusTimeIntervalMinutes"
                                    case .rest:
                                        modelData.restTimeIntervalMinutes = timeMinutes
                                        timeIntervalMinutesKey = "restTimeIntervalMinutes"
                                    //                                case .longRest:
                                    //                                    modelData.longRestTimeIntervalMinutes = timeMinutes
                                    //                                    timeIntervalMinutesKey = "longRestTimeIntervalMinutes"
                                    }
                                    UserDefaults.standard.set(
                                        timeMinutes, forKey: timeIntervalMinutesKey)
                                    // TODO: reduce possibility of bugs by having key be some global var
                                }
                        )
                }
                .background(Color("Modal Content Background"))
                .mask(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .shadow(radius: 5, x: 0, y: 3)
                .shadow(radius: 30, x: 0, y: 30)
                Spacer()
            }
            switch flowType {
            case .focus:
                Toggle("Start Break Automatically", isOn: $modelData.automaticallyGoFromFocus)
                    .onChange(of: modelData.automaticallyGoFromFocus) { (value: Bool) in
                        UserDefaults.standard.set(value, forKey: "automaticallyGoFromFocus")
                    }
            case .rest:
                Toggle("Start Focus Automatically", isOn: $modelData.automaticallyGoFromRest)
                    .onChange(of: modelData.automaticallyGoFromRest) { (value: Bool) in
                        UserDefaults.standard.set(value, forKey: "automaticallyGoFromRest")
                    }
            //            case .longRest:
            //                Toggle("Start Focus Automatically", isOn: $modelData.automaticallyGoFromLongRest)
            //                    .onChange(of: modelData.automaticallyGoFromLongRest) { (value: Bool) in
            //                        UserDefaults.standard.set(value, forKey: "automaticallyGoFromLongRest")
            //                    }
            }
            //            if flowType == .longRest {
            //                HStack{
            //                    Text("Long Break After Intervals")
            //                    NumberButton(action: decrementRequiredCompletedIntervals, imageName: "minus", isDisabled: modelData.requiredCompletedIntervals == minRequiredCompletedIntervals)
            //                    Text(String(Int(modelData.requiredCompletedIntervals/2)))
            //                    NumberButton(action: incrementRequiredCompletedIntervals, imageName: "plus", isDisabled: modelData.requiredCompletedIntervals == maxRequiredCompletedIntervals)
            //                }
            //            }
        }.onAppear {
            timeMinutes = modelData.focusTimeIntervalMinutes
        }
    }

    private func setAnimationTime(minutes: Int) {
        switch flowType {
        case .focus:
            updateTimeInput(riveViewModel: pomodoro, minutes: Float(minutes))
        default:
            updateTimeInput(riveViewModel: coffee, minutes: Float(minutes))
        }
    }

    private func decrementRequiredCompletedIntervals() {
        modelData.requiredCompletedIntervals -= 2
        UserDefaults.standard.set(
            modelData.requiredCompletedIntervals, forKey: "requiredCompletedIntervals")
        // TODO: test more and come up with better logic
        if modelData.requiredCompletedIntervals <= modelData.currentCompletedIntervals {
            modelData.flowType = .focus
            modelData.currentCompletedIntervals = 0
        }
    }

    private func incrementRequiredCompletedIntervals() {
        modelData.requiredCompletedIntervals += 2
        UserDefaults.standard.set(
            modelData.requiredCompletedIntervals, forKey: "requiredCompletedIntervals")
    }
}

struct TimerSettingsView_Previews: PreviewProvider {
    static var previews: some View {
        TimerSettingsView()
    }
}

struct NumberButton: View {
    var action: () -> Void
    var imageName: String
    var isDisabled: Bool

    var body: some View {
        Button {
            if !isDisabled {
                action()
            }
        } label: {
            Image(systemName: imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 12, height: 12)
                .padding(4)
                .foregroundColor(Color(isDisabled ? "Button Disabled" : "Dark Mode Contrast"))
                .background(Color("Number Button"))
                .cornerRadius(2)
        }
        .buttonStyle(.plain)
        .linkPointerStyle(isDisabled: isDisabled)
    }
}
