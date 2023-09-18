"use client";

export function PrimaryButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<Element>;
}) {
  return (
    <button
      className={`bg-slate-950 border border-current px-5 py-3 h-12 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
