THE GREATEST FRIEND — WEBSITE v9

MUSIC SETUP
-----------
Put your own authorized MP3 in:
audio/song.mp3

Then open index.html.

The Play button no longer waits for the canplaythrough event, which could
prevent playback for some local MP3 files. It calls the browser's audio
playback directly and reports any actual file/playback error in the small
music player.

There is no music-start popup.
