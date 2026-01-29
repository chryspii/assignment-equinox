export default function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td>
            <div className="h-4 w-6 bg-gray-200 rounded" />
          </td>
          <td>
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </td>
          <td className="text-center">
            <div className="h-4 w-20 bg-gray-200 rounded mx-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}
