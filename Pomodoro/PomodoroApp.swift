//
//  PomodoroApp.swift
//  Pomodoro
//
//  Created by David Speers on 25/05/2023.
//

import SwiftUI

@main
struct PomodoroApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
        
    // dummy component so that the App doesn't complain.
    // TODO: Search if there's a way to remove this
    var body: some Scene {
        WindowGroup {
            Group {}
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate, ObservableObject {
    private var statusItem: NSStatusItem!
    private let popover = NSPopover()
    
    @MainActor func applicationDidFinishLaunching(_ notification: Notification) {
        let pomodoroIcon = PomodoroIconView()
        let iconView = NSHostingView(rootView: pomodoroIcon)
        iconView.frame = NSRect(x: 0, y: 0, width: 40, height: 22)
        
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        
        if let statusButton = statusItem.button {
            statusButton.addSubview(iconView)
            statusButton.frame = iconView.frame
            statusButton.action = #selector(togglePopover)
        }
        
        popover.contentSize = NSSize(width: 300, height: 300)
        popover.behavior = .transient
        popover.contentViewController = NSHostingController(rootView: AnimationView())
    }
    
    @objc func togglePopover() {
        if let button = statusItem.button {
            if popover.isShown {
                popover.performClose(nil)
            } else {
                popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY)
                popover.contentViewController?.view.window?.makeKey()
            }
        }
    }
}
