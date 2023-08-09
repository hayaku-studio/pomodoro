//
//  IntervalTrackingView.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 31/07/2023.
//

import SwiftUI

struct IntervalTrackingView: View {
    @EnvironmentObject private var modelData: ModelData
    
    var body: some View {
        let numberOfCircles = Int(modelData.requiredCompletedIntervals/2)
        let numberOfCompletedIntervals = Int(modelData.currentCompletedIntervals/2)
        let isLastCircleHalfCompleted = modelData.currentCompletedIntervals%2 == 1
        HStack {
            ForEach(0..<numberOfCircles, id: \.self) {i in
                if i < numberOfCompletedIntervals {
                    ProgressCircle(intervalProgress: .completed)
                } else if i == numberOfCompletedIntervals && isLastCircleHalfCompleted {
                    ProgressCircle(intervalProgress: .halfCompleted)
                } else {
                    ProgressCircle(intervalProgress: .notStarted)
                }
            }
        }
    }
}

struct IntervalTrackingView_Previews: PreviewProvider {
    static var previews: some View {
        let modelData = ModelData()
        modelData.requiredCompletedIntervals = 10
        modelData.currentCompletedIntervals = 7  
        return IntervalTrackingView().environmentObject(modelData)
    }
}

struct ProgressCircle: View {
    @State var intervalProgress: IntervalProgress
    
    var body: some View {
        ZStack {
            if intervalProgress != .notStarted {
                Circle()
                    .trim(from: 0, to: 0.5)
                    .rotationEffect(.degrees(90), anchor: .center)
                    .foregroundColor(Color(hex: 0xEC5E4A))
            }
            if intervalProgress == .completed {
                Circle()
                    .trim(from: 0, to: 0.5)
                    .rotationEffect(.degrees(-90), anchor: .center)
                    .foregroundColor(Color(hex: 0x4D4E51))
            }
            Circle()
                .strokeBorder(Color.black,lineWidth: 1)
        }
        .frame(width: 12, height: 12)
        

    }
}
