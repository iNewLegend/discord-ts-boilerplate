import {
    ButtonInteraction,
    Client,
    CommandInteraction,
    Events,
    Interaction
} from "discord.js";
import { Commands } from "../commands";

export default ( client: Client ): void => {
    client.on( Events.InteractionCreate, async ( interaction: Interaction ) => {
        if ( interaction.isCommand() || interaction.isContextMenuCommand() ) {
            await handleSlashCommand( client, interaction as CommandInteraction );
        } else if ( interaction.isButton() ) {
            await handleButton( client, interaction as ButtonInteraction );
        }
    } );
};

const handleSlashCommand = async ( client: Client, interaction: CommandInteraction ): Promise<void> => {
    const slashCommand = Commands.find( c => c.name === interaction.commandName );

    if ( ! slashCommand ) {
        await interaction.followUp( { content: "An error has occurred" } );
        return;
    }

    await interaction.deferReply();

    slashCommand.run( client, interaction );
};

const handleButton = async ( client: Client, interaction: ButtonInteraction ): Promise<void> => {
    await interaction.deferUpdate();

    switch ( interaction.customId ) {
        case "Hello": // Custom ID of the button when it was created.
            await interaction.followUp( {
                ephemeral: true,
                content: `Hello! ${ interaction.user.username }`
            } );
            break;
    }
};
