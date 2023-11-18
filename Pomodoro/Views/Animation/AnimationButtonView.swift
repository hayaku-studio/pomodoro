//
//  AnimationButtonView.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 22/07/2023.
//

import SwiftUI

struct AnimationButtonView: View {
    @EnvironmentObject private var modelData: ModelData
    
    var action: () -> Void
    var imageName: String
    var isDisabled: Bool
    
    var body: some View {
        var bgColor = ""
        switch modelData.flowType {
        case .focus:
            bgColor = isDisabled ? "Pomodoro Disabled" : "Pomodoro Primary"
        case .rest:
            bgColor = isDisabled ? "Button Disabled" : "Button Active"
//        case .longRest:
//            bgColor = isDisabled ? "Coffee Highlighted Disabled": "Coffee Highlighted"
        }
        return Button {
            if !isDisabled {            
                action()
            }
        } label: {
            // TODO: custom icons, add number inside reset, maybe shadows and animations
            Image(systemName: imageName)
                .resizable()
                .scaledToFit()
                .frame(width: 16, height: 16)
                .padding(.horizontal, 10)
                .padding(.vertical, 10)
                .foregroundColor(Color("Button Contrast"))
                .background(Color(bgColor))
                .cornerRadius(8)
        }
        .buttonStyle(.plain)
    }
}

//struct AnimationButtonView_Previews: PreviewProvider {
//    static var previews: some View {
//        AnimationButtonView()
//    }
//}
