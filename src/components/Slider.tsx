import { ChangeEventHandler, ReactNode } from "react";

export function Slider({
  className,
  value,
  onChange,
  min,
  max,
  step,
  children,
}: {
  className?: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  min: number;
  max: number;
  step: number;
  children: ReactNode;
}) {
  return (
    <div className={`flex ${className}`}>
      {children}
      <input
        className="grow"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}
