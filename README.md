# Mr Saturn Client

[Mr Saturn Server](https://github.com/m-thompson-code/mr-saturn-server)

An interactive demo can be found [here](https:mr-saturn.web.app/demo/overlay)

## About SAMTRON5000

Samantha is an old YouTube gaming content creator from 2007. Here is her [Youtube channel](https://www.youtube.com/user/samtron5000/videos).
Currently she plays indie, retro, weird, and funny games for entertainment on her [Twitch channel](https://www.twitch.tv/samtron5000). 
Some games she has played / finished on the stream in the past year:

- EarthBound
- Mother 2
- Lisa the Joyful/Painful
- Hypnospace Outlaw
- Dark Souls 3
- 7 Days
- I Love You, Colonel Sanders
- North Korean games



## About the Mr Saturn project

Currently SAMTRON5000 uses the [Mr Saturn Client](https://github.com/m-thompson-code/mr-saturn) application as an overlay on her stream. The users can interactive with the overlay using commands (messages sometimes only need to include the command).

Also a bot listens to the chat and can interact with users based on their message. 

- `milk`: Summons the milk man (2 variations). Bot will announce that the milk man is coming by asking "Who is the milkman?"
- `art` || `face` || `hugger` || `mona` || `lisa`: Summons the Mona Lisa with a Facehugger
- `olive` || `olive x#{N}`: Summons an olive. If you use the x syntax, you can summon many olives at once. Depending on if you are subscribed / admin, you may be limited in how many olives you can summon at one time. Ex: `olive x10` will summon 10 olives.
- `sandwich` || `sammich`: Will give a user a sandwich.
- `!d#{N}`: Bot will roll a #{N} sided dice and announce the results. Ex: `!d20` -> `4` (random number between 1 and 20)
- `Love is #{some quote}`: Server will store the quote (Including "Love is" part). These quotes will pop up randomly during a stream
- `Love`: If a command doesn't include "Love is", a random "Love is" quote will pop up into the chat of the stream.

Whenever users chat during a stream, Mr Saturns and random characters for Mother / Earthbound will bounce around in the overlay.

The [Mr Saturn Server](https://github.com/m-thompson-code/mr-saturn-server) is responsible for listening to the chat for the bot to interact with the stream, and store messages for commands that update the overlay on the client.

