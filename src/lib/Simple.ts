type AudioNodeAccessor = () => AudioNode;

const SinOsc = (audioContext : BaseAudioContext) 
    : [AudioNodeAccessor, {
        play:(freq?:number)=>void,
        pause:()=>void
        stop:()=>void
    }] => {
    let osc : OscillatorNode= new OscillatorNode(audioContext,{
                frequency: 440,
                type:"sine"
            });
    return [()=>osc, {
        play:(freq?:number)=>{
            osc.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq??440, audioContext.currentTime);
            osc.start();
        },
        pause:()=>{
            osc.stop();
            osc.disconnect();
            osc= new OscillatorNode(audioContext,{
                frequency: 440,
                type:"sine"
            });
        },
        stop:()=>{
            osc.stop();
            osc.disconnect();
        }
    }];
};

const Analyzer = (audioContext : BaseAudioContext) : AnalyserNode => {
    const analyzer : AnalyserNode
        = new AnalyserNode(audioContext, {
            smoothingTimeConstant: 1,
            fftSize: 2048
        });
    return analyzer;
};

const Simple = {
    SinOsc,
    Analyzer
};

export default Simple;

