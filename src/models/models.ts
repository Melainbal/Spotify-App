export type AlbumImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyAlbumModel = {
  id: string;
  name: string;
  images: AlbumImage[];
  album_group: string;
  album_type: string;
  release_date: string;
};
