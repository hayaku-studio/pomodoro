//
//  FabView.swift
//  Pomodoro
//
//  Created by David Speers on 29/06/2023.
//

import SwiftUI
import SwiftUIFontIcon
import FloatingButton


struct FabView: View {
    
    @Binding var showFabMenu: Bool
    var timerAction: () -> Void
    var settingsAction: () -> Void
    var statsAction: () -> Void
    
    var body: some View {
        let button = FontIcon.text(.materialIcon(code: .menu), fontsize: 24).padding(4)
            .foregroundColor(Color("Button Active"))
            .frame(width: 28, height: 28)
            .offset(y: 8)
        FloatingButton(
            mainButtonView: button,
            buttons: [
                FabItem(imageName: "timer", buttonText: "Timer").onTapGesture {
                    timerAction()
                    closeButtons()
                },
                FabItem(imageName: "gearshape", buttonText: "Settings").onTapGesture {
                    settingsAction()
                    closeButtons()
                },
                FabItem(imageName: "chart.bar", buttonText: "Statistics").onTapGesture {
                    statsAction()
                    closeButtons()
                }
            ],
            isOpen: $showFabMenu
        )
        .straight()
        .direction(.bottom)
        .alignment(.left)
        .spacing(8)
        .initialOpacity(0)
    }
    
    func closeButtons() {
        withAnimation {
            showFabMenu = false
        }
    }
}

struct FabView_Previews: PreviewProvider {
    static var previews: some View {
        FabView(showFabMenu: .constant(false), timerAction: {}, settingsAction: {}, statsAction: {})
    }
}
