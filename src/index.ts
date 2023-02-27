import { Client } from "discord.js";

import ready from "./listeners/ready";
import interactionCreate from "./listeners/interaction-create";

import { BOT_TOKEN } from "./config";

console.log( "Bot is starting..." );

const client = new Client( {
    intents: []
} );

client.login( BOT_TOKEN ).then( () => {
    console.log( "Bot is authenticated" );

    ready( client );
    interactionCreate( client );
} );

