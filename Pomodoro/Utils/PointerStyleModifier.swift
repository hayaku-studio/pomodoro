//
//  PointerStyleModifiers.swift
//  Pomodoro
//
//  Created by David Speers on 27/05/2023.
//

import SwiftUI

// MARK: - Basic Pointer Styles

/// Default pointer style modifier
struct DefaultPointerStyleModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(.default)
        } else {
            content
        }
    }
}

/// Link pointer style modifier for clickable elements
struct LinkPointerStyleModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(.link)
        } else {
            content
        }
    }
}

/// Grab idle pointer style modifier for draggable elements
struct GrabIdlePointerStyleModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(.grabIdle)
        } else {
            content
        }
    }
}

/// Grab active pointer style modifier for actively dragged elements
struct GrabActivePointerStyleModifier: ViewModifier {
    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(.grabActive)
        } else {
            content
        }
    }
}

// MARK: - Conditional Pointer Styles

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

/// Conditional pointer style modifier for hover states
struct HoverPointerStyleModifier: ViewModifier {
    let isHovered: Bool

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isHovered ? .link : .default)
        } else {
            content
        }
    }
}

/// Conditional pointer style modifier for disabled states
struct DisabledPointerStyleModifier: ViewModifier {
    let isDisabled: Bool

    func body(content: Content) -> some View {
        if #available(macOS 15.0, *) {
            content.pointerStyle(isDisabled ? .default : .link)
        } else {
            content
        }
    }
}

// MARK: - View Extensions

extension View {
    /// Applies default pointer style
    func defaultPointerStyle() -> some View {
        modifier(DefaultPointerStyleModifier())
    }

    /// Applies link pointer style for clickable elements
    func linkPointerStyle() -> some View {
        modifier(LinkPointerStyleModifier())
    }

    /// Applies grab idle pointer style for draggable elements
    func grabIdlePointerStyle() -> some View {
        modifier(GrabIdlePointerStyleModifier())
    }

    /// Applies grab active pointer style for actively dragged elements
    func grabActivePointerStyle() -> some View {
        modifier(GrabActivePointerStyleModifier())
    }

    /// Applies conditional drag pointer style
    func dragPointerStyle(isDragging: Bool) -> some View {
        modifier(DragPointerStyleModifier(isDragging: isDragging))
    }

    /// Applies conditional hover pointer style
    func hoverPointerStyle(isHovered: Bool) -> some View {
        modifier(HoverPointerStyleModifier(isHovered: isHovered))
    }

    /// Applies conditional disabled pointer style
    func disabledPointerStyle(isDisabled: Bool) -> some View {
        modifier(DisabledPointerStyleModifier(isDisabled: isDisabled))
    }
}
