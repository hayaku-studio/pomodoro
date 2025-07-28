//
//  PointerStyleModifiers.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI

// MARK: - Pointer Style Modifiers

/// Link pointer style modifier for clickable elements with optional disabled state
struct LinkPointerStyleModifier: ViewModifier {
    let isDisabled: Bool

    init(isDisabled: Bool = false) {
        self.isDisabled = isDisabled
    }

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isDisabled ? .default : .link)
        } else {
            content
        }
    }
}

/// Conditional pointer style modifier that switches between grab idle and grab active
struct DragPointerStyleModifier: ViewModifier {
    let isDragging: Bool

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isDragging ? .grabActive : .grabIdle)
        } else {
            content
        }
    }
}

// MARK: - View Extensions

extension View {
    /// Applies link pointer style for clickable elements
    func linkPointerStyle(isDisabled: Bool = false) -> some View {
        modifier(LinkPointerStyleModifier(isDisabled: isDisabled))
    }

    /// Applies conditional drag pointer style
    func dragPointerStyle(isDragging: Bool) -> some View {
        modifier(DragPointerStyleModifier(isDragging: isDragging))
    }
}
