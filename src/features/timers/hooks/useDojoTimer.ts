import { useState } from "react";
import { useInterval } from "../../../common/hooks/useInterval";

export interface DojoTimerOptions {
  planningDuration?: number;
  rotationDuration?: number;
  onRotate: () => void;
  onFinish: () => void;
}

export function useDojoTimer({
  // planningDuration = 15 * 60,
  // rotationDuration = 2 * 60,
  planningDuration = 5,
  rotationDuration = 2,
  onRotate,
  onFinish,
}: DojoTimerOptions) {
  const [phase, setPhase] = useState<"planning" | "rotating">("planning");
  const [timeLeft, setTimeLeft] = useState(planningDuration);
  const [running, setRunning] = useState(false);

  useInterval(
    () => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (phase === "planning") {
            setPhase("rotating");
            return rotationDuration;
          } else {
            onRotate();
            return rotationDuration;
          }
        }
        return t - 1;
      });
    },
    running ? 1000 : null
  );

  const start = () => setRunning(true);
  const stop = () => {
    setRunning(false);
    onFinish();
  };

  return { phase, timeLeft, running, start, stop };
}
