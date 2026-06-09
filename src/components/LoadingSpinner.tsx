export default function LoadingSpinner({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3" role="status">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-space-border" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  );
}
