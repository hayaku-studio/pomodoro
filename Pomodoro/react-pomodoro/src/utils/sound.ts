// Sound utility for playing notification sounds
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isInitialized = false;

  constructor() {
    // Don't auto-initialize to avoid issues with autoplay policies
    // Initialize on first user interaction
  }

  private async initializeAudio(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create audio context with fallback for webkit
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();

      // Load the notification sound
      await this.loadNotificationSound();
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  private async loadNotificationSound(): Promise<void> {
    if (!this.audioContext) return;

    try {
      const response = await fetch("/Reception Bell.mp3");
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error("Failed to load Reception Bell sound:", error);
      // Fallback to generated sound if file loading fails
      await this.generateFallbackSound();
    }
  }

  private async generateFallbackSound(): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Generate a simple bell-like tone as fallback
      const sampleRate = this.audioContext.sampleRate;
      const duration = 0.3; // 300ms
      const frequency = 800; // 800Hz bell-like tone

      const frameCount = sampleRate * duration;
      const arrayBuffer = this.audioContext.createBuffer(
        1,
        frameCount,
        sampleRate,
      );
      const channelData = arrayBuffer.getChannelData(0);

      // Generate a bell-like sound with decay
      for (let i = 0; i < frameCount; i++) {
        const t = i / sampleRate;
        const decay = Math.exp(-t * 3); // Exponential decay
        const wave = Math.sin(2 * Math.PI * frequency * t) * decay;
        channelData[i] = wave * 0.3; // Reduce amplitude
      }

      this.audioBuffer = arrayBuffer;
    } catch (error) {
      console.error("Failed to generate fallback sound:", error);
    }
  }

  public async playSound(volume: number = 0.5): Promise<void> {
    // Initialize audio on first play to comply with autoplay policies
    if (!this.isInitialized) {
      await this.initializeAudio();
    }

    if (!this.audioContext || !this.audioBuffer) {
      console.warn("Audio system not available");
      return;
    }

    try {
      // Resume audio context if it's suspended (required by browsers for autoplay policy)
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      // Create new audio source for each play
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      // Connect source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Set volume (normalized to 0-1 range, then divided by 5 like in original macOS app)
      // This matches the Swift implementation: player?.volume = volume/5
      gainNode.gain.value = Math.max(0, Math.min(1, volume)) / 5;

      // Set buffer and play
      source.buffer = this.audioBuffer;
      source.start();
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  }

  public async loadCustomSound(audioUrl: string): Promise<void> {
    if (!this.audioContext) return;

    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error("Failed to load custom sound:", error);
    }
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();

// Convenience function that matches the original Swift implementation
export const playSound = (volume: number = 0.5): void => {
  // Add a small delay like in the original Swift implementation
  // TODO: understand async better and check if the 10ms delay actually helps the animation smoothness
  setTimeout(() => {
    soundManager.playSound(volume).catch((error) => {
      console.warn("Sound playback failed:", error);
    });
  }, 10);
};
