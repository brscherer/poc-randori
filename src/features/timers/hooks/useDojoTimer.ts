import { useState, useRef, useEffect } from "react";
import { useInterval } from "../../../common/hooks/useInterval";

export interface DojoTimerOptions {
  planningDuration?: number;
  rotationDuration?: number;
  onRotate: () => void;
}

export function useDojoTimer({ planningDuration = 15 * 60, rotationDuration = 2 * 60, onRotate }: DojoTimerOptions) {
  const [phase, setPhase] = useState<"planning" | "rotating">("planning");
  const [timeLeft, setTimeLeft] = useState(planningDuration);
  const [running, setRunning] = useState(false);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useInterval(
    () => {
      if (timeLeft <= 1) {
        if (phaseRef.current === "planning") {
          setPhase("rotating");
          setTimeLeft(rotationDuration);
        } else {
          onRotate();
          setTimeLeft(rotationDuration);
        }
      } else {
        setTimeLeft((t) => t - 1);
      }
    },
    running ? 1000 : null
  );

  const start = () => setRunning(true);
  const stop = () => {
    setRunning(false);
  };

  return { phase, timeLeft, running, start, stop };
}
