export default function formatDate(isoDate?: string): string{
    return isoDate ? isoDate.slice(0, 10) : '';
}