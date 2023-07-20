//
//  PomodoroIconView.swift
//  Pomodoro
//
//  Created by David Speers on 04/06/2023.
//

import SwiftUI

struct PomodoroIconView: View {
    @EnvironmentObject private var modelData: ModelData
    
    var body: some View {
        let minutes = Int(modelData.timeSeconds/60)
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
                    .font(minutes == 100 ? .custom("SF Pro", size: 7) : .footnote)
                    .fontWeight(.semibold)
                    .offset(y: 2)
                    .foregroundColor(Color("Dark Mode Contrast"))
            }
            ZStack {
                switch modelData.flowType {
                case .focus:
                    Image("Tomato Icon")
                default:
                    Image("Coffee Cup Icon")
                        .offset(x: 2, y: 2)
                }
                Text("\(String(format: "%02d", Int(modelData.timeSeconds%60)))")
                    .font(.footnote)
                    .fontWeight(.semibold)
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
