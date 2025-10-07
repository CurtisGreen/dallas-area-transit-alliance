export default function LoadingCalendarPage() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex items-center gap-3 text-slate-600">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
        <span className="text-sm font-medium">Loading calendar…</span>
      </div>
    </div>
  );
}
