//
//  FabIconTextButton.swift
//  Pomodoro
//
//  Created by David Speers on 29/06/2023.
//

import SwiftUI

struct FabIconTextButton: View {
    var imageName: String
    var buttonText: String
    
    @State private var isHovered = false
    let imageWidth: CGFloat = 16
    
    var body: some View {
        HStack {
            Text(buttonText)
                .font(.system(size: 14, design: .default))
                .foregroundColor(Color("Button Active"))
                .offset(y: -1)
                .fixedSize(horizontal: true, vertical: true)
            Spacer()
            Image(systemName: imageName)
                .resizable()
                .scaledToFit()
                .foregroundColor(Color("Button Active"))
                .frame(width: imageWidth, height: imageWidth)
        }
        .padding(.horizontal, 8)
        .frame(width: 100, height: 30)
        .background(Color(isHovered ? "FAB Background Hovered" : "FAB Background"))
        .cornerRadius(8)
        .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 1)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color(hex: 0xF4F4F4), lineWidth: 1)
        )
        .onHover { isHovered in
            self.isHovered = isHovered
        }
    }
}

struct FabIconTextButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            FabIconTextButton(imageName: "timer", buttonText: "Timer")
            FabIconTextButton(imageName: "gearshape", buttonText: "Settings")
            FabIconTextButton(imageName: "chart.bar", buttonText: "Stats")
        }
    }
}

