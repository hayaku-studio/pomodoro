//
//  CalendarFormat.swift
//  Pomodoro
//
//  Created by David Speers on 15/06/2023.
//

import Foundation

enum CalendarFormat: String, CaseIterable, Identifiable {
    case week = "Week"
    case month = "Month"
    case year = "Year"
    
    var id: String { rawValue }
}
