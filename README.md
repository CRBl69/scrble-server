# sCRBle

Back-end code for the sCRBle game (it's just scrabble).

## Why ?

I wanted to play this with some people over the internet but I didn't find any great websites to play it

## How to set up ?

1. Create a .env file.
2. Add an APP\_URL variable which shall be the url to your front end application (ex.: `APP_URL="http://scrble.my-website.com"`)
3. Add a PORT variable which shall be the port the backend is supposed to run on (ex.: `PORT=6942`)
4. `deno run --allow-net --allow-read src/index.ts`
5. Play !
