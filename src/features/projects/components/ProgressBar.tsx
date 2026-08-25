interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-600">
        <span>Progresso</span>
        <span>{normalizedValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={normalizedValue} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${normalizedValue}%` }} />
      </div>
    </div>
  );
}

