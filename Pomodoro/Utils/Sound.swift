//
//  Sound.swift
//  Pomodoro
//
//  Created by David Speers on 06/06/2023.
//

import AVFoundation

var player: AVAudioPlayer?

// TODO: remove volume parameter. I should just be able to get it from modelData
func playSound(volume: Float) {
    // TODO: understand async better and check if the 10ms delay actually helps the animation smoothness (in testing it seemed to, although the first time still has a slight jump)
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.01) {
        guard let url = Bundle.main.url(forResource: "Reception Bell", withExtension: "mp3") else { return }
        do {
            player = try AVAudioPlayer(contentsOf: url, fileTypeHint: AVFileType.mp3.rawValue)
            player?.volume = volume/5 // relative to system audio. Divide by 5 because file volume is too high
            guard let player = player else { return }
            player.play()
        } catch let error {
            print(error.localizedDescription)
        }
    }
}
