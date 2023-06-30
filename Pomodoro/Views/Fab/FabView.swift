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
    @State var isOpen = false
    
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
                FabIconTextButton(imageName: "gearshape", buttonText: "Settings").onTapGesture {
                    settingsAction()
                    closeButtons()
                },
                FabIconTextButton(imageName: "chart.bar", buttonText: "Statistics").onTapGesture {
                    statsAction()
                    closeButtons()
                }
            ],
            isOpen: $isOpen
        )
        .straight()
        .direction(.bottom)
        .alignment(.left)
        .spacing(8)
        .initialOpacity(0)
    }
    
    func closeButtons() {
        withAnimation {
            isOpen = false
        }
    }
}

struct FabView_Previews: PreviewProvider {
    static var previews: some View {
        FabView(settingsAction: {}, statsAction: {})
    }
}
