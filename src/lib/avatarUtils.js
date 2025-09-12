const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarImage = (userId) => {
  const images = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop",
  ];

  const index = parseInt(userId.slice(-1)) % images.length;
  return images[index];
};

export { getInitials, getAvatarImage };
