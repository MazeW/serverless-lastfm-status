import { info, error, main } from './html.js';

const initJson = {
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
};

const initHtml = {
  headers: {
    'content-type': 'text/html;charset=UTF-8',
  },
};


async function getSongInfo(user) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${user}&api_key=${API_KEY}&limit=1&format=json`;
  const response = await fetch(url);
  const json = await response.json();
  const track = json.recenttracks.track[0];
  return { user: json.recenttracks["@attr"].user, artist: track.artist["#text"], name: track.name, image: track.image[track.image.length - 1]["#text"], playing: ((typeof (track["@attr"]) != "undefined") ? true : false) };
}



async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  const split = pathname.split("/");
  const path = split[1].toLowerCase();
  const user = String(split[2]);
  if (path == "api") {
    return new Response(((user.length != 0 && user != "undefined") ?
      JSON.stringify(await getSongInfo(user)) : JSON.stringify({ "error": "Please specify your username; example: /api/i0l" })),
      initJson);
  }

  if (path == "user") {
    return new Response(((user.length != 0 && user != "undefined") ?
      info(await getSongInfo(user)) : error("Please specify your Last.fm username")),
      initHtml);
  }

  return new Response(main(), initHtml);
}

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(error("something went wrong."), initHtml)
    )
  );
});