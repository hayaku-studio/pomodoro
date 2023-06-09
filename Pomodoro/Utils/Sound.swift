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
    guard let url = Bundle.main.url(forResource: "Reception Bell", withExtension: "mp3") else { return }
    do {
        player = try AVAudioPlayer(contentsOf: url, fileTypeHint: AVFileType.mp3.rawValue)
        player?.volume = volume // relative to system audio
        guard let player = player else { return }
        player.play()
    } catch let error {
        print(error.localizedDescription)
    }
}
