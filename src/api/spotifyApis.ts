import { SpotifyAlbumModel } from "../models";
import { spotifyHandler } from "./api";

export async function fetchArtistId(artistFullName: string) {
  const response = await spotifyHandler.get("search", {
    params: {
      q: artistFullName,
      type: "artist",
    },
  });

  const items = response.data.artists.items;
  if (items && items.length > 0) {
    return items[0].id;
  }
}

export async function fetchArtistAlbums(
  artistId: string
): Promise<SpotifyAlbumModel[]> {
  return (await spotifyHandler.get(`artists/${artistId}/albums`)).data.items;
}
