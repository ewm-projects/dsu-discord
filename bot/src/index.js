import 'dotenv/config'
import { Client, Events, Collection, GatewayIntentBits } from "discord.js"
import * as SlashCommands from './commands/index.js'

const BOT_TOKEN = process.env.BOT_TOKEN
const client = new Client({ intents: [GatewayIntentBits.Guilds]})
client.commands = new Collection()
if (BOT_TOKEN === null || BOT_TOKEN === undefined)
    throw new Error("Failed to load bot token!")

// Commands Loading
for (const [name, sc] of Object.entries(SlashCommands)) {
    if("data" in sc && "execute" in sc)
        client.commands.set(sc.data.name, sc)
    else
        console.log("Error! Unable to set command")
}

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    try {
        await command.execute(interaction)
    } catch (e) {
        console.error(e)
    }
})

client.login(BOT_TOKEN);