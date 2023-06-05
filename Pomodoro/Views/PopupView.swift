//
//  PopupView.swift
//  Pomodoro
//
//  Created by David Speers on 05/06/2023.
//

import SwiftUI

struct PopupView: View {
    @EnvironmentObject private var modelData: ModelData
    
    var body: some View {
        AnimationView(pomoTimer: modelData.pomoTimer)
    }
}

struct PopupView_Previews: PreviewProvider {
    static var previews: some View {
        PopupView().environmentObject(ModelData())
    }
}
