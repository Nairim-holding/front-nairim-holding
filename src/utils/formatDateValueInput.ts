export default function formatDateValueInput(isoString: string | null | undefined): string {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}