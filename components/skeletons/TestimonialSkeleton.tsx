export default function TestimonialSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
          <div className="flex mb-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="w-5 h-5 bg-gray-200 rounded mr-1"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}