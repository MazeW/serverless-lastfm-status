module.exports.main = function () {
    return template(`
    <h1>Last.fm status</h1>
    <p>You can use <code>/api/username</code> to get a json response and <code>/user/username</code> to get a html response.
    Example: <code>/user/i0l</code></p>
    `);
}

module.exports.info = function (info) {
    return template(`
    <h1>${info.user} ${(info.playing ? "is listening to" : "last listened to")}</h1>
    <div><img style="border-style:solid;" src="${info.image}"></div>
    <p><b>${info.artist}</b> — ${info.name}</p>
    `);
}

module.exports.error = function (msg) {
    return template(`
    <h1>Whoops</h1>
    <p>${msg}</p>
    `);
}


const template = (body) => {
    return `<!DOCTYPE html>
    <html>
    <head>
    <title>
    Last.fm most recent</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="This page displays the song user is listening or last listened to on Last.fm">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spcss@0.8.0">
    </head>
    <body>
        ${body}
    </body>
    </html>
    `
}