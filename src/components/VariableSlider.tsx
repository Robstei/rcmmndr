import { ChangeEventHandler } from "react";

export function VariableSlider({
  value,
  min,
  max,
  step,
  onChange,
  name,
}: {
  value: string;
  min: string;
  max: string;
  step: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{name}</label>
      <input
        className="bg-slate-700 h-12 p-4 mr-5 grow w-20"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        id={name}
      />
    </div>
  );
}
