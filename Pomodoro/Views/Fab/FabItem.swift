//
//  FabItem.swift
//  Pomodoro
//
//  Created by David Speers on 29/06/2023.
//

import SwiftUI

struct FabItem: View {
    var imageName: String
    var buttonText: String
    
    @State private var isHovered = false
    
    var fontSize: CGFloat {
        return isHovered ? 15 : 14
    }
    var iconSize: CGFloat {
        return isHovered ? 17 : 16
    }
    
    var body: some View {
        ZStack {
            Rectangle()
                .fill(Color(isHovered ? "FAB Background Hovered" : "FAB Background"))
                .setFabItemFrame()
                .cornerRadius(8)
                .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 1)
                // TODO: work on some nice overlay here
//                .overlay(
//                    RoundedRectangle(cornerRadius: 8)
//                        .stroke(Color(hex: 0xF4F4F4), lineWidth: 1)
//                )
                .scaleEffect(isHovered ? 1.1 : 1)
            HStack {
                Text(buttonText)
                    .font(.system(size: fontSize, design: .default))
                    .foregroundColor(Color("Button Active"))
                    .offset(y: -1)
                    .fixedSize(horizontal: true, vertical: true)
                Spacer()
                Image(systemName: imageName)
                    .resizable()
                    .scaledToFit()
                    .foregroundColor(Color("Button Active"))
                    .frame(width: iconSize, height: iconSize)
            }
            .padding(.horizontal, 8)
            .setFabItemFrame()
        }
        .offset(x: 4)
        .onHover { isHovered in
            self.isHovered = isHovered
        }
    }
}

extension View {
    func setFabItemFrame() -> some View {
        self.frame(width: 100, height: 30)
    }
}

struct FabIconTextButton_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            FabItem(imageName: "timer", buttonText: "Timer")
            FabItem(imageName: "gearshape", buttonText: "Settings")
            FabItem(imageName: "chart.bar", buttonText: "Stats")
        }
    }
}

