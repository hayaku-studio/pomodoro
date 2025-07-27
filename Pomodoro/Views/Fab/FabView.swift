//
//  FabView.swift
//  Pomodoro
//
//  Created by David Speers on 29/06/2023.
//

import FloatingButton
import SwiftUI
import SwiftUIFontIcon

struct FabView: View {

    @Binding var showFabMenu: Bool
    var timerAction: () -> Void
    var settingsAction: () -> Void

    @State private var isMainButtonHovered = false

    var body: some View {
        let button = ZStack {
            if isMainButtonHovered {
                Circle().fill(
                    Color("FAB Background Hovered")
                        .opacity(isMainButtonHovered ? 1 : 0))
            }
            FontIcon.text(.materialIcon(code: showFabMenu ? .close : .menu), fontsize: 24)
                .foregroundColor(Color("Button Active"))
                .frame(width: 32, height: 32)
        }
        .onHover { isHovered in
            isMainButtonHovered = isHovered
        }
        .modifier(HoverButtonPointerStyleModifier(isHovered: isMainButtonHovered))
        FloatingButton(
            mainButtonView: button,
            buttons: [
                FabItem(imageName: "timer", buttonText: "Timer")
                    .onTapGesture {
                        timerAction()
                        closeButtons()
                    }
                    .modifier(ClickablePointerStyleModifier()),
                FabItem(imageName: "gearshape", buttonText: "Settings")
                    .onTapGesture {
                        settingsAction()
                        closeButtons()
                    }
                    .modifier(ClickablePointerStyleModifier()),
            ],
            isOpen: $showFabMenu
        )
        .straight()
        .direction(.bottom)
        .alignment(.left)
        .spacing(8)
        .initialOpacity(0)
        .offset(y: 10)
    }

    func closeButtons() {
        withAnimation {
            showFabMenu = false
        }
    }
}

struct HoverButtonPointerStyleModifier: ViewModifier {
    let isHovered: Bool

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isHovered ? .link : .default)
        } else {
            content
        }
    }
}

struct ClickablePointerStyleModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(.link)
        } else {
            content
        }
    }
}

struct FabView_Previews: PreviewProvider {
    static var previews: some View {
        FabView(showFabMenu: .constant(false), timerAction: {}, settingsAction: {})
    }
}
