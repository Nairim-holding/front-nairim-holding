import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function SkeletonTable({
  rows = 5,
  columns = 21,
  showHeader = true,
  className,
  ...props
}: {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border", className)} {...props}>
      <table className="min-w-full text-sm text-left text-gray-700">
        {showHeader && (
          <thead className="bg-[#ECECEC] uppercase text-[#111111B2] h-[70px]">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th
                  key={i}
                  className={`py-2 px-5 text-center font-normal text-[14px] ${
                    i === columns - 1
                      ? "sticky right-0 bg-[#ECECEC] z-10 min-w-[50px]"
                      : "min-w-[50px]"
                  }`}>
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-2 px-3 ${
                    colIndex === columns - 1 ? "sticky right-0 bg-white z-10" : ""
                  }`}>
                  <div className="min-h-[50px] flex items-center justify-center">
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-skeleton relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent",
        "before:animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
