import classNames from "classnames";
import { useRef } from "react";
import { TimePickerProps } from "../../core";
import { useTimeConfig, useTransforms } from "../../core/hooks/time";
import { DisableTime } from "./disableTime";
import { Transform } from "./transform";

export const TimePicker = ({
  minTime,
  maxTime,
  hoursStep = 1,
  minutesStep = 1,
}: TimePickerProps) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const config = useTimeConfig({
    handleRef,
    minTime,
    maxTime,
    hoursStep,
    minutesStep,
  });

  const transforms = useTransforms({ mode: config.mode, maxTime, minTime });

  return (
    <div className="time-panel panel-elevation">
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={classNames(
          "time-clock-area",
          config.handleGrabbed && "time-clock-handle-grab",
        )}
        {...config.clockEvents}
      >
        <div
          ref={handleRef}
          className={classNames(
            ...config.handleClasses,
            config.handleGrabbed && "time-clock-handle-grab",
          )}
          {...config.handleEvents}
          style={{
            transform: config.transform,
          }}
        />
        <DisableTime mode={config.mode} maxTime={maxTime} minTime={minTime} />
        <Transform
          transforms={transforms}
          activeTickClassName={config.activeTickClassName}
          {...{ minTime, maxTime }}
        />
      </div>
    </div>
  );
};
