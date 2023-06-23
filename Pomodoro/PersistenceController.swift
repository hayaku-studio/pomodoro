//
//  PersistenceController.swift
//  Pomodoro
//
//  Created by David Speers on 14/06/2023.
//

import Foundation
import CoreData

struct PersistenceController {
    // A singleton for our entire app to use
    static let shared = PersistenceController()
    
    // Storage for Core Data
    let container: NSPersistentContainer
    
    // TODO: doesn't seem to work
    // A test configuration for SwiftUI previews
    static var preview: PersistenceController = {
        let controller = PersistenceController(inMemory: true)
        
        // Create 10 example calendar entries.
        for _ in 0..<10 {
            let entry = CalendarEntry(context: controller.container.viewContext)
            entry.date = Date.now
            entry.workTimeMinutes = 120
        }
        
        return controller
    }()
    
    // An initializer to load Core Data, optionally able
    // to use an in-memory store.
    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "DataModel")
        
        if inMemory {
            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")
        }
        
        // TODO: look into this mergePolicy and if it's necessary
        // https://www.hackingwithswift.com/read/38/6/how-to-make-a-core-data-attribute-unique-using-constraints
        // container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        
        container.loadPersistentStores { description, error in
            
            if let error = error {
                fatalError("Unresolved Init Error: \(error.localizedDescription)")
            }
        }
    }
    
    func save() {
        let context = container.viewContext
        
        if context.hasChanges {
            do {
                try context.save()
            } catch {
                print("Unresolved Save Error: \(error)")
            }
        }
    }
}
