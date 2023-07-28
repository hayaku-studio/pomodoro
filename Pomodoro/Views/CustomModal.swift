//
//  CustomModal.swift
//  Pomodoro
//
//  Created by David Speers on 13/06/2023.
//

import SwiftUI
import SwiftUIFontIcon

struct CustomModal: ViewModifier {
    var actionOnDismiss: () -> Void
    
    func body(content: Content) -> some View {
        // TODO: make what's under the modal, not change
        Rectangle()
            .fill(.black.opacity(0.15))
            .onTapGesture {
                actionOnDismiss()
            }
        Group {
            content
                .padding(16)
                .background(Color("Modal Content Background"))
                .mask(RoundedRectangle(cornerRadius: 20, style: .continuous))
                .shadow(radius: 5, x: 0, y: 3)
                .shadow(radius: 30, x: 0, y: 30)
        }
            .padding(16)
            .transition(.move(edge: .top)
                .combined(with: .opacity))
            .overlay(alignment: .top) {
                FontIcon.button(.materialIcon(code: .close), action: actionOnDismiss)
                    .foregroundColor(Color("Dark Mode Button Contrast"))
                    .background(Circle().fill(Color("Button Active")))
                    .frame(width: 40, height: 40)
                    .frame(maxWidth: .infinity, alignment: .trailing) // TODO: less hacky alignment
            }
            .padding(.vertical, 16)
            .zIndex(1)
    }
}

extension View {
    func customModal(actionOnDismiss: @escaping () -> Void) -> some View {
        modifier(CustomModal(actionOnDismiss: actionOnDismiss))
    }
}
