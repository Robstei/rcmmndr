import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  Artists,
  SavedTracks,
  Track,
  MultipleTrackFeatures,
} from "@/schemas/schemas";
import { prismaClient } from "@/prisma/prismaClient";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.time(`generateProfile`);
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(null, { status: 401 });
    }
    const accessToken = session.user.spotifyAccessToken;
    const tracks = await getAllLikedTracks(accessToken);
    const newTracks = await addUserToExistingTracks(tracks, session.user.id);

    const tracksWithArtistGenres = await addArtistGenres(
      newTracks,
      accessToken
    );

    const tracksWithFeautures = await addFeaturesToTracks(
      tracksWithArtistGenres,
      accessToken
    );

    await saveTrackWithFeatures(tracksWithFeautures, session.user.id);

    console.timeEnd(`generateProfile`);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}

async function addArtistGenres(tracks: Track[], accessToken: string) {
  const artistIdsWithoutGenreSet = new Set<string>();

  tracks.forEach((track) => {
    track.artists.forEach((artist) => {
      if (!artist.genres) {
        artistIdsWithoutGenreSet.add(artist.id);
      }
    });
  });
  const artistIdsWithoutGenre = Array.from(artistIdsWithoutGenreSet);
  const requests: Promise<unknown>[] = [];
  for (let i = 0; i < artistIdsWithoutGenre.length; i += 50) {
    const ids = artistIdsWithoutGenre.slice(i, i + 50);
    const request = fetch(
      `https://api.spotify.com/v1/artists?ids=${ids.join(",")}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then((request) => request.json());
    requests.push(request);
  }
  const results = await Promise.allSettled(requests);
  const newArtistsData = results
    .map((result) => {
      if (result.status === "rejected") {
        throw new Error("error gettings genre data for artists");
      }
      let parsedResults: Artists;
      try {
        parsedResults = Artists.parse(result.value);
      } catch (e) {
        console.log("error parsing artists in addArtistGenres");
        throw e;
      }
      return parsedResults.artists;
    })
    .reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue);
    }, []);

  for (const track of tracks) {
    track.artists.forEach((trackArtists) => {
      const newArtistData = newArtistsData.find((artist) => {
        return trackArtists.id === artist.id;
      });
      trackArtists.genres = newArtistData?.genres;
    });
  }

  return tracks;
}

async function addUserToExistingTracks(tracks: Track[], userId: string) {
  const ids = tracks.map((track) => track.id);
  const existingIdsResponse = await prismaClient.track.findMany({
    where: { id: { in: ids } },
  });
  const existingIds = existingIdsResponse.map((value) => value.id);
  const requests: ReturnType<typeof prismaClient.track.update>[] = [];
  for (const existingId of existingIds) {
    const request = prismaClient.track.update({
      where: { id: existingId },
      data: { users: { connect: { id: userId } } },
    });
    requests.push(request);
  }
  await Promise.all(requests);

  const newTracks = tracks.filter((track) => !existingIds.includes(track.id));
  return newTracks;
}
async function getAllLikedTracks(accessToken: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/tracks?limit=50",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  let dataFirstFetch: SavedTracks;
  try {
    dataFirstFetch = SavedTracks.parse(await response.json());
  } catch (e) {
    console.log("error parsing first fetch in getAllLikedTracks");
    throw e;
  }

  let trackData = dataFirstFetch.items;

  const promises: Promise<unknown>[] = [];
  for (let i = 50; i < dataFirstFetch.total; i += 50) {
    const promise = fetch(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${i}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => {
      return response.json();
    });
    promises.push(promise);
  }

  const settledPromises = await Promise.allSettled(promises);
  settledPromises.forEach((settledPromise) => {
    if (settledPromise.status === "rejected")
      throw new Error("could not fetch all liked Songs");

    let parsedValue: SavedTracks;
    try {
      parsedValue = SavedTracks.parse(settledPromise.value);
    } catch (e) {
      console.log(e, "error parsing parsed Value in getAllLikedTracks");
      return;
    }

    trackData = trackData.concat(parsedValue.items);
  });
  return trackData;
}

async function addFeaturesToTracks(tracks: Track[], accessToken: string) {
  const requests = [];
  const tracksCopy = tracks.slice();
  while (tracksCopy.length > 0) {
    const trackIds = tracksCopy.splice(0, 100).map((track) => track.id);
    const request = fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => response.json());
    requests.push(request);
  }
  let tracksFeatureData: MultipleTrackFeatures = [];
  const resultsRaw = await Promise.allSettled(requests);
  resultsRaw
    .map((resultRaw) => {
      if (resultRaw.status === "rejected") {
        throw new Error("error passing track features");
      }
      try {
        return MultipleTrackFeatures.parse(resultRaw.value);
      } catch (e) {
        console.log("error parsing TrackFeatures in addFeaturesToTracks");
        throw e;
      }
    })
    .forEach((result) => {
      if (!result) return;
      tracksFeatureData = tracksFeatureData.concat(result);
    });
  return combineTracksWithFeautures(tracks, tracksFeatureData);
}

type TrackWithFeauture = ReturnType<typeof combineTracksWithFeautures>;

function combineTracksWithFeautures(
  tracks: Track[],
  tracksFeatureData: MultipleTrackFeatures
) {
  return tracks.map((track) => {
    const trackFeatureData = tracksFeatureData.find(
      (trackFeatureData) => track.id === trackFeatureData.trackId
    );
    if (!trackFeatureData) {
      throw new Error("feature data missing");
    }
    return { ...track, trackFeatureData };
  });
}
async function saveTrackWithFeatures(
  trackWithFeauture: TrackWithFeauture,
  userId: string
) {
  const artists = trackWithFeauture
    .map((value) => value.artists)
    .reduce((prev, current) => {
      return prev.concat(current);
    }, []);

  await prismaClient.artist.createMany({ data: artists, skipDuplicates: true });
  const inputs: Prisma.TrackCreateInput[] = [];
  for (const track of trackWithFeauture) {
    const {
      trackId, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...featuresWithoutTrackId
    } = track.trackFeatureData;
    const trackCreateInput: Prisma.TrackCreateInput = {
      id: track.id,
      name: track.name,
      artists: {
        connect: track.artists.map((artist) => {
          return {
            id: artist.id,
          };
        }),
      },
      trackFeatures: { create: featuresWithoutTrackId },
      users: { connect: { id: userId } },
    };
    inputs.push(trackCreateInput);
  }

  const requests: ReturnType<typeof prismaClient.track.create>[] = [];
  for (const input of inputs) {
    try {
      const request = prismaClient.track.create({ data: input });
      requests.push(request);
    } catch (e) {
      console.log("error", JSON.stringify(input));
      throw e;
    }
  }
  await Promise.allSettled(requests);
  console.log("created: ", requests.length);
}
