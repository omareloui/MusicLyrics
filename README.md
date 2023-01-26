# Music Lyrics

An api to fetch music lyrics from Genius and it includes script to work with cmus.

## Install

Clone this repository

```bash
git clone git@github.com:omareloui/MusicLyrics.git
```

Install requirements, I'm here using `pnpm` but you can use any package manager
you want

```bash
pnpm i
```

Build it

```bash
pnpm build
```

Setup the environment variables and fill it with your configurations.
You can get the genius key from [here](https://genius.com/api-clients).

```bash
cp .env.example .env
```

Start the web api

```bash
pnpm start
```

or to run it for cmus

```bash
pnpm start:cmus
```

## Available end points

- `GET /api/lyrics/:artist/:title` to fetch a lyrics for that song.
- `GET /api/lyrics` to get all the cached lyrics.
- `GET /api/lyrics/:id` to get a cached lyrics with id.

---

## License

MIT.
