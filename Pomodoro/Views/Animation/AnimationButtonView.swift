//
//  AnimationButtonView.swift
//  Whimsical Pomodoro Timer
//
//  Created by David Speers on 22/07/2023.
//

import SwiftUI

struct AnimationButtonView: View {
    @EnvironmentObject private var modelData: ModelData
    @State private var isHovered = false

    var action: () -> Void
    var imageName: String
    var isDisabled: Bool

    var body: some View {
        var bgColor = ""
        var gradientColors: [Color] = []

        switch modelData.flowType {
        case .focus:
            if isDisabled {
                bgColor = "Pomodoro Disabled"
                gradientColors = [
                    Color("Pomodoro Disabled"), Color("Pomodoro Disabled").opacity(0.8),
                ]
            } else {
                bgColor = "Pomodoro Primary"
                gradientColors = [
                    Color("Pomodoro Primary"), Color("Pomodoro Primary").opacity(0.7),
                ]
            }
        case .rest:
            if isDisabled {
                bgColor = "Button Disabled"
                gradientColors = [Color("Button Disabled"), Color("Button Disabled").opacity(0.8)]
            } else {
                bgColor = "Button Active"
                gradientColors = [Color("Button Active"), Color("Button Active").opacity(0.7)]
            }
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
                .background(
                    LinearGradient(
                        gradient: Gradient(colors: gradientColors),
                        startPoint: .bottomTrailing,
                        endPoint: .topLeading
                    )
                )
                .cornerRadius(8)
                .offset(y: isHovered && !isDisabled ? -2 : 0)
                .animation(.easeInOut(duration: 0.2), value: isHovered)
        }
        .buttonStyle(.plain)
        .modifier(ButtonPointerStyleModifier(isDisabled: isDisabled))
        .onHover { hovering in
            isHovered = hovering
        }
    }

}

struct ButtonPointerStyleModifier: ViewModifier {
    let isDisabled: Bool

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isDisabled ? .default : .link)
        } else {
            content
        }
    }
}

//struct AnimationButtonView_Previews: PreviewProvider {
//    static var previews: some View {
//        AnimationButtonView()
//    }
//}
