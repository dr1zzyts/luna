import { Client } from "./Client"

export class LunaFunctions {
  private client: Client;
  constructor(client: Client) {
    this.client = client
  }

  async sendMessage(content:string, channelId:string) {
    this.client.rest.discordSendMessage({ content: content, channelID: channelId, token: this.client.config.token})
  } 
}