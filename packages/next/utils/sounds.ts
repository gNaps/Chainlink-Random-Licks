import * as Tone from 'tone'

export const playMusic = (notes: string, sound: string) :void => {
    //const sound = useSound();
    console.log("ascolto notes ", notes);
    console.log("sound scelto ", sound);

    let synth: any;

    switch(sound) {
        case 'FMSynth':
            synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
            break;
        case 'MembraneSynth':
            synth = new Tone.PolySynth(Tone.MembraneSynth).toDestination();
            break;
        case 'MonoSynth':
            synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
            break;
        case 'MetalSynth':
            synth = new Tone.PolySynth(Tone.MetalSynth).toDestination();
            break;
        case 'AMSynth':
            synth = new Tone.PolySynth(Tone.AMSynth).toDestination();
            break;
        default:
            break;
    }
    
    const now: number = Tone.now();
    let time: number = 0;
    let index: number = 0;
    const sentence: Array<string> = [] 

    const process = (note: string) => {
        if(note !== "_") {
            synth.triggerAttack(`${note}4`, now + time);
            sentence.push(`${note}4`);
        }
        time += 0.5;
    };
    
    for (let note of notes) {
        if(index > 7) {
            break;
        }
        process(note);
        index++;
    }

    console.log("frase da eseguire", sentence);
    console.log("tempo ", time);
    console.log("now + time ", now + time);

    synth.triggerRelease(sentence, now + time);
}