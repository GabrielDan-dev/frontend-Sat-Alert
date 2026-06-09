interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="card-space p-6 border-sev-critico/40 bg-sev-critico/5 text-center">
      <div className="text-3xl mb-2">⚠️</div>
      <p className="text-sev-critico font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost mt-4">
          Tentar novamente
        </button>
      )}
    </div>
  );
}
