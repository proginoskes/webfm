import type {JSX, Component, Signal, Accessor, Setter} from "solid-js";
import { createSignal, createEffect } from "solid-js";
import Simple from "./lib/Simple";

enum AudioState {
    play = "play",
    pause = "pause",
    stop = "stop",
    notInitiated = "NI"
}

const App : Component = () => {

    const [audioState, setAudioState] : Signal<AudioState>=createSignal(AudioState.notInitiated);
    const [buttonAction, setButtonAction] : Signal<string>=createSignal("play");


    const audioContext : AudioContext 
        = new AudioContext();

    const gain = audioContext.createGain();
    gain.connect(audioContext.destination);

    const an = Simple.Analyzer(audioContext);


    const [osc, {play, pause, stop}] = Simple.SinOsc(audioContext);
    osc().connect(gain);
    gain.connect(an);

    createEffect(()=>{
        switch(audioState()){
            case AudioState.play:
                play();
                setButtonAction("pause");
                break;
            case AudioState.pause:
                pause();
                setButtonAction("play");
                break;
            case AudioState.stop:
                stop();
                break;
            default:
                break;
        }
    });

    console.log(navigator.mediaDevices);

    return <div id={`freq-screen`}>
        <button onClick={()=>{setAudioState(as=>{
            switch(as){
                case AudioState.play:
                    return AudioState.pause;
                case AudioState.pause:
                    return AudioState.play;
                default:return AudioState.play;
            }
        })}}>
            {audioState()}
        </button>
        <button onClick={()=>setAudioState(AudioState.stop)}>stop</button>
    </div>
};

export default App;