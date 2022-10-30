import { Client } from "../entities/Client";
import { ClientUserType } from "../types/ClientUserType";
import { MessageType } from "../types/WebSocketMessageType";

export default function (payload: MessageType, client: Client) {
  
  const clientUser: ClientUserType = {
    id: payload.d.user.id,
    username: payload.d.user.username,
    discriminator: payload.d.user.discriminator,
    bot: payload.d.user.bot,
    avatar: payload.d.user.avatar,
  }

  client.user = clientUser
  client.readyTimestamp = Date.now()
  client.emit('connect', client.user)
  
  if(client.ws.options?.infoLogs)console.log('[luna | client] - [log | event] - Client event "ready" has been runned')
}