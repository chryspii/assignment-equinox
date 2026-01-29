export default function DetailSkeleton () {
  return (
    <div className='border rounded p-4 space-y-3 animate-pulse mt-2'>
      {[...Array(6)].map((_, i) => (
        <div key={i} className='h-4 bg-gray-200 rounded w-3/4' />
      ))}
    </div>
  )
}