import * as fcsynth from 'fcsynth'

export function play (cb) {
  const ac = new AudioContext()
  const nameMap = {f: fcsynth.frequency, tempo: fcsynth.tempo};
  const sb = new fcsynth.SynthBuilder(ac, nameMap);
  const synth = sb.build(
    sb.source2model(`m=gain(adsr(3000, 10, 3, 0.1, 5000))<-sin(fr(f*3.5)),
n=gain(lv(5))<-sin(fr(1)),
gain(adsr(y, 100, 1000, 0.25, 5000))<-sin(fr(f)<-(m+n))`),
    ac.destination,
    {
      tempo: 120,
      y: 0.75
    });

  setInterval(() => {
    synth.update(ac.currentTime);
  }, 1000);


  const startTime = ac.currentTime;
  let updateTime = startTime + 0.1;
  const notenums = [60, 64, 67, 71];
  function update () {
    const note = synth.note({
      f: notenum2frequency(randomChoice(notenums)),
      y: 0.5
    });

    setTimeout(cb, (updateTime - ac.currentTime) * 1000);
    note.on(updateTime);
    note.off(updateTime + 3);
    updateTime += 3;
  }
  update();
  setInterval(update, 3000);
}

function notenum2frequency (notenum) {
  return 6.875 * Math.pow(2, (notenum + 3) / 12);
}

function randomChoice (arr) {
  return arr[Math.random() * arr.length | 0];
}
