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

    var body: some Scene {
        Settings {}
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    private var modelData = ModelData()
    private var statusItem: NSStatusItem!
    private var menu: NSMenu!
    private let popover = NSPopover()
    private let persistenceController = PersistenceController.shared
    
    @MainActor func applicationDidFinishLaunching(_ notification: Notification) {
        let pomodoroIcon = PomodoroIconView().environmentObject(modelData).environment(\.managedObjectContext, persistenceController.container.viewContext)
        let iconView = NSHostingView(rootView: pomodoroIcon)
        iconView.frame = NSRect(x: 0, y: 0, width: 44, height: 20)
        
        menu = NSMenu()
//        menu.addItem(NSMenuItem(title: "Play", action: #selector(togglePopover), keyEquivalent: ""))
//        menu.addItem(.separator())
        menu.addItem(NSMenuItem(title: "Quit", action: #selector(closeApp), keyEquivalent: ""))

        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        
        if let statusButton = statusItem.button {
            statusButton.addSubview(iconView)
            statusButton.frame = iconView.frame
            statusButton.sendAction(on: [.leftMouseUp, .rightMouseUp])
            statusButton.action = #selector(statusMenuButtonTouched(_:))
        }
        
        popover.contentSize = NSSize(width: 290, height: 200)
        popover.contentViewController = NSHostingController(rootView: PopupView().environmentObject(modelData).environment(\.managedObjectContext, persistenceController.container.viewContext))
    }
    
    func applicationWillResignActive(_ notification: Notification) {
        closePopover()
    }
    
    @objc func togglePopover() {
        if let button = statusItem.button {
            if popover.isShown {
                closePopover()
            } else {
                modelData.isPopoverShown = true
                popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY)
                popover.contentViewController?.view.window?.makeKey()
                NSApp.activate(ignoringOtherApps: true)
            }
        }
    }
    
    @objc private func statusMenuButtonTouched(_ sender: NSStatusBarButton) {
        guard let event = NSApp.currentEvent else { return }
        switch event.type {
        case .rightMouseUp:
            statusItem.menu = menu
            statusItem.button?.performClick(nil)
            statusItem.menu = nil
        default:
            togglePopover()
        }
    }
    
    @objc func closeApp() {
        NSApplication.shared.terminate(self)
    }
    
    func closePopover() {
        modelData.isPopoverShown = false
        popover.performClose(nil)
    }
    
}
