/**
 * Generative soundtrack: a filtered pad that changes chord with each scene,
 * plus a soft chime on scene cuts. No audio files, ~0 KB.
 */
const CHORDS: number[][] = [
  [110.0, 164.81, 246.94, 261.63], // Am(add9)
  [87.31, 130.81, 196.0, 220.0], // Fmaj7
  [130.81, 196.0, 293.66, 329.63], // Cadd9
  [98.0, 146.83, 220.0, 246.94], // G6
  [110.0, 164.81, 220.0, 293.66], // Asus4
  [87.31, 174.61, 220.0, 261.63], // F
  [130.81, 196.0, 246.94, 329.63], // Cmaj7
  [98.0, 196.0, 246.94, 293.66], // G
  [130.81, 196.0, 261.63, 392.0], // C
];

export class FilmAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: OscillatorNode[] = [];
  private scene = -1;
  /** Destination usable by MediaRecorder when exporting with sound. */
  stream: MediaStreamAudioDestinationNode | null = null;

  async start() {
    if (this.ctx) {
      await this.ctx.resume();
      return;
    }
    const ctx = new AudioContext();
    this.ctx = ctx;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.setTargetAtTime(0.09, ctx.currentTime, 0.8);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 380;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    this.stream = ctx.createMediaStreamDestination();
    filter.connect(master);
    master.connect(ctx.destination);
    master.connect(this.stream);

    CHORDS[0].forEach((f, i) => {
      for (const detune of [-6, 6]) {
        const o = ctx.createOscillator();
        o.type = i === 0 ? "sine" : "triangle";
        o.frequency.value = f;
        o.detune.value = detune;
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 0.5 : 0.22;
        o.connect(g).connect(filter);
        o.start();
        this.voices.push(o);
      }
    });
    this.master = master;
  }

  setScene(index: number) {
    if (!this.ctx || index === this.scene) return;
    const first = this.scene === -1;
    this.scene = index;
    const chord = CHORDS[index % CHORDS.length];
    const now = this.ctx.currentTime;
    this.voices.forEach((o, k) => o.frequency.setTargetAtTime(chord[Math.floor(k / 2)], now, 0.35));
    if (!first) this.chime(chord[3] * 2);
  }

  private chime(freq: number) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.18, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    o.connect(g).connect(this.master);
    o.start(now);
    o.stop(now + 1.7);
  }

  async pause() {
    await this.ctx?.suspend();
  }

  async stop() {
    const ctx = this.ctx;
    this.ctx = null;
    this.voices = [];
    this.scene = -1;
    this.stream = null;
    await ctx?.close();
  }
}
