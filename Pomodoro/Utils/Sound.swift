//
//  Sound.swift
//  Pomodoro
//
//  Created by David Speers on 06/06/2023.
//

import AVFoundation

var player: AVAudioPlayer?

func playSound() {
    guard let url = Bundle.main.url(forResource: "Reception Bell", withExtension: "mp3") else { return }
    do {
        player = try AVAudioPlayer(contentsOf: url, fileTypeHint: AVFileType.mp3.rawValue)
        player?.volume = 0.1 // relative to system audio
        guard let player = player else { return }
        player.play()
    } catch let error {
        print(error.localizedDescription)
    }
}
