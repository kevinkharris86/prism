# PRISM — creative command deck for the Yamaha DGX-660

A tablet app (Chrome on the Lenovo Tab M9) that talks to the DGX-660 over USB MIDI.

## Easiest: no PC needed

Open **https://kevinkharris86.github.io/prism/** in Chrome on the tablet, then use Chrome menu →
**Add to Home screen**. After the first visit it works offline. Plug the tablet into the piano,
tap the PRISM icon, tap **Connect**. Every push to `main` updates the site automatically.

## Alternative: run it from the PC

1. On the PC, double-click **`start.bat`**. If Windows Firewall asks, choose **Allow** (private networks).
2. On the tablet (same Wi-Fi), open Chrome and go to the `https://192.168.x.x:8543` address shown in the
   start window. The first time, Chrome warns about the certificate: tap **Advanced → Proceed**.
3. Plug the cable in: USB-C into the tablet, USB-B into the piano's **USB TO HOST** port. Turn the piano on.
4. Tap **Connect** (top left) and allow MIDI. Allow "control & reprogram MIDI devices" too, because the
   global reverb, chorus and master volume controls need it.
5. Optional: Chrome menu → **Add to Home screen** gives you a full-screen app icon.

The PC must be running `start.bat` when you open PRISM, because it serves the page to the tablet.

## Is it safe for the keyboard?

Yes. PRISM only sends normal performance MIDI: notes, controllers, program changes, and the standard
GM/XG messages that any MIDI song file sends. It never writes to the piano's memory or firmware.
- Your panel voice (what the keys play) is left alone. PRISM plays its own sounds on MIDI channels 4–16.
- **PANIC** stops every note and turns Local Control back on.
- Switching the piano off and on always returns it to its normal state.

## What's inside

| Tab | Features |
|---|---|
| ✦ **Stage** | Note-particle visualizer, live chord name and key detection, quick on/off switches. **XY pad**: *Vector Mix* (one layer in each corner, like vector synths), *Filter*, *Bend + Vibe*, *Space*. **Tilt** the tablet to move the pad. |
| ✧ **Auto** | **Personas**: 10 one-tap setups (Movie Composer, Lo-fi Café, Gospel, Synthwave, Jazz Club…). **Chord Genius**: one finger in the left hand plays a full chord in your key, or Autopilot steps through hit progressions, or chords play themselves. **Never-Miss keys**: wrong notes bend into the key, pentatonic or chord. **Groove Band**: bass, chords and drums in 10 styles that follow your left hand, with fills and an ending. **Smart Combos**: matched 4-layer sounds by mood that can evolve every few bars. **Intensity Swell**, **Velocity Polish**, **Flourishes** (runs, glissando, cascade, sparkle, drum fill, big ending). |
| ∞ **Beyond** | **Game Room**: Simon Echo, Note Blaster and Name That Tune, played on the piano keys. **Melody Messages**: text becomes a tune and the tune decodes back to text. **Hands-free page turner** for PDF or photo sheet music (pedal double-tap, or the C8/B7 keys). **Dream Radio**: endless self-composing music with a sleep timer. **Piano alarm** and **practice timer / Pomodoro**. **Piano Macros**: a secret 4-note code triggers an action or a smart-home webhook. **Calm breathing**. **Practice stats** (streak, minutes, key heat-map, favourite chords). **Light show**. |
| ◈ **Fusion** | Stack up to 4 extra sounds on every key. Each layer has its own octave, semitone shift, volume, pan, **velocity range** (play harder to bring in another sound) and **zone** (left or right of the split). Includes one-tap fusion recipes. |
| ⚗ **Voice Lab** | Shape any part with the piano's XG engine: brightness, resonance, attack, decay, release, vibrato, glide, detune, reverb and chorus. Supports Bank MSB/LSB entry for the DGX's own panel voices. **Sound DNA**: mutate a sound, save it to a gene bank, **breed** two sounds into a new one. |
| ♫ **Perform** | **Arpeggiator** (8 patterns, latch; follows the style tempo), **Harmonizer** (in-key harmony voices with auto key detection), **Shimmer Echo** (repeats that climb octaves, spiral in fifths, or sparkle around your key). |
| ⟲ **Loops** | 3-track MIDI **looper** (starts on your first note, snaps to beats, overdub, a voice per track). **Double-tap the sustain pedal** to record hands-free. 16-step **drum machine** with kits, genre presets, a random groove button and swing. |
| ✺ **Magic** | **Echo Mind**: play a phrase and pause, and it improvises an answer that learns your style. **Aura**: a pad that follows every chord you hold. **Hum-to-Play**: sing into the tablet and the piano plays your melody. **Tilt Control**. **Command Keys**: the lowest 4 keys control PRISM. **Scene Morph**. |
| ⚙ **Setup** | Port selection, **Takeover mode** (Local Off: the keys play only PRISM sounds), **tempo clock out** (with External Clock ON on the piano, its styles follow PRISM), global reverb/chorus type, master volume, transpose, tune, MIDI monitor, backup/restore. |

**Scenes**: top bar **SAVE → 1–8** stores everything. Tap a number to recall it. **MORPH → number** glides
there over a few seconds.

## Tips

- If a sound doesn't respond to a Voice Lab slider, that parameter isn't supported for that voice in the
  DGX's XG-lite engine. That's harmless.
- If you hear notes doubled while using Dual on the piano, set *Setup → Listen to* to "Main voice only".
- Hum-to-Play works best with the piano volume low or with headphones, so the mic doesn't hear the piano.
- If you turned on *External Clock* on the piano for the clock feature, turn it back off afterwards.
  Otherwise the piano's styles will wait for a clock.

## Files

- `public/index.html`: the whole app (no libraries)
- `server.js`: tiny HTTPS server (no dependencies; reuses piano-trainer's certificate in `cert/`)
- Ports: http 8100, https 8543 (so it can run alongside piano-trainer)
