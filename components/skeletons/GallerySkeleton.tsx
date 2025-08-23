export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="relative aspect-square animate-pulse">
          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}