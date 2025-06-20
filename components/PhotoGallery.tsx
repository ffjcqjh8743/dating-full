interface Props {
  photos: string[];
  isPremium: boolean;
}

export default function PhotoGallery({ photos, isPremium }: Props) {
  const visiblePhotos = isPremium ? photos : photos.slice(0, 2);

  return (
    <div className="grid grid-cols-2 gap-2">
      {visiblePhotos.map((src, i) => (
        <img key={i} src={src} alt="user" className="w-full h-40 object-cover rounded" />
      ))}
      {!isPremium && photos.length > 2 && (
        <div className="col-span-2 text-center text-gray-500 text-sm">
          🔒 Остальные фото доступны в Premium
        </div>
      )}
    </div>
  );
}
