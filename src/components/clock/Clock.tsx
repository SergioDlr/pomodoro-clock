import { useEffect, useState } from "react";
import Button from "../utilities/Button";
import Icon from "../utilities/Icon";
import playImage from "../../assets/images/play-white.png";
import pauseImage from "../../assets/images/pause-white.png";
import fastForward from "../../assets/images/forward-white.png";
let tiempoDeInicio = Date.now();
const Clock = ({ pomodoroDuration = 25, restDuration = 5 }) => {
  let tiempoRestanteEnMs = pomodoroDuration * (60 * 1000);
  const [fin, setFin] = useState(tiempoDeInicio + tiempoRestanteEnMs);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoRestanteEnMs);
  const [isPlaying, setPlaying] = useState(false);
  const [resting, setResting] = useState(false);

  const calcularNuevoFinal = (fTimpo: number): number => {
    return fTimpo - Date.now();
  };

  const pause = () => {
    setFin(Date.now() + tiempoRestante);
    setPlaying(!isPlaying);
  };

  const stop = () => {
    setPlaying(false);
    setTiempoRestante(tiempoRestanteEnMs);
  };

  const endPomodoro = () => {
    if (tiempoRestante <= 1000) {
      pause();
      setResting(true);
      setTiempoRestante(restDuration * 60 * 1000);
    }
  };

  useEffect(() => {
    const updateTime = 500;
    let tTimer = setTimeout(() => {
      if (isPlaying) {
        setTiempoRestante(calcularNuevoFinal(fin));
        endPomodoro();
      }
    }, updateTime);
    return () => {
      clearTimeout(tTimer);
    };
  }, [tiempoRestante, isPlaying]);

  let minutesRemaining = Math.floor(tiempoRestante / 60 / 1000);
  let secondsRemaining = Math.floor((tiempoRestante / 1000) % 60);

  const pauseOrPlay = () => {
    if (isPlaying) return <Icon img={pauseImage} />;
    return <Icon img={playImage} />;
  };

  return (
    <div className="text-white text-center ">
      <div
        className={`flex flex-row border-2 p-20 py-24 rounded-full m-auto max-w-min ${
          resting ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <h1 className="text-2xl">
          {minutesRemaining < 10 && `0`}
          {minutesRemaining}
        </h1>
        <h1 className="text-2xl">:</h1>
        <h1 className="text-2xl">
          {secondsRemaining < 10 && `0`}
          {secondsRemaining}
        </h1>
      </div>
      <Button name={pauseOrPlay()} action={pause} bgColor="bg-black"></Button>
      <Button name={<Icon img={fastForward} />} action={stop} bgColor="bg-black"></Button>
    </div>
  );
};

export default Clock;
