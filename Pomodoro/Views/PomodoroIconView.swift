//
//  PomodoroIconView.swift
//  Pomodoro
//
//  Created by David Speers on 04/06/2023.
//

import SwiftUI
import Foundation

struct PomodoroIconView: View {
    @EnvironmentObject private var modelData: ModelData
    
    var body: some View {
        let minutes = Int(ceilf(Float(modelData.timeSeconds)/60))
        let isFocusFlowType = modelData.flowType == FlowType.focus
        return HStack(alignment: .center, spacing: isFocusFlowType ? 2 : 0) {
            ZStack {
                if isFocusFlowType {
                    Image("Tomato Icon")
                }
                else {
                    Image("Coffee Cup Icon")
                        .offset(x: 2, y: 2)
                }
                Text("\(String(format: "%02d", minutes))")
                    .font(.footnote)
                    .fontWeight(.semibold)
                    .monospacedDigit()
                    .offset(y: 2)
                    .foregroundColor(Color("Dark Mode Contrast"))
            }
        }
    }
}

struct PomodoroIconView_Previews: PreviewProvider {
    static var previews: some View {
        PomodoroIconView().environmentObject(ModelData())
    }
}
