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

class AppDelegate: NSObject, NSApplicationDelegate, ObservableObject {
    private var modelData = ModelData()
    private var statusItem: NSStatusItem!
    private let popover = NSPopover()
    private let persistenceController = PersistenceController.shared
    
    @MainActor func applicationDidFinishLaunching(_ notification: Notification) {
        let pomodoroIcon = PomodoroIconView().environmentObject(modelData).environment(\.managedObjectContext, persistenceController.container.viewContext)
        let iconView = NSHostingView(rootView: pomodoroIcon)
        iconView.frame = NSRect(x: 0, y: 0, width: 44, height: 20)
        
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        
        if let statusButton = statusItem.button {
            statusButton.addSubview(iconView)
            statusButton.frame = iconView.frame
            statusButton.action = #selector(togglePopover)
        }
        
        popover.contentSize = NSSize(width: 290, height: 200)
        popover.behavior = .transient
        popover.contentViewController = NSHostingController(rootView: PopupView().environmentObject(modelData).environment(\.managedObjectContext, persistenceController.container.viewContext))
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
