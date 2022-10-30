import { Client } from "../entities/Client";
import { GuildEmojiType, GuildPayloadType, GuildRoleType, GuildUserType } from "../types/GuildType";
import { MessageType } from "../types/WebSocketMessageType";

export default function (payload: MessageType, client: Client) { 
  const guildUsersData: GuildUserType[] = payload.d.members.map((x:any) => [{
    user: {
      username: x.user.username,
      id: x.user.id,
      discriminator: x.user.discriminator,
      bot: x.user.bot,
      avatar: x.user.avatar
    },
    roles: x.roles,
    premium: x.premium_since,
    joinedAt: x.joined_at,
    mute: x.mute,
    nick: x.nick
  }])
  const guildRolesData: GuildRoleType[] = payload.d.roles.map((x: GuildRoleType) => [{
    name: x.name,
    id: x.id,
    mentionable: x.mentionable,
    hoist: x.hoist,
    color: x.color
  }])

  const guildEmojisData: GuildEmojiType[] = payload.d.emojis.map((x: GuildEmojiType) => [{
    name: x.name,
    id: x.id,
    animated: x.animated
  }])

  const guildData: GuildPayloadType = {
    name: payload.d.name,
    id: payload.d.id,
    icon: payload.d.icon,
    joinedAt: payload.d.icon,
    description: payload.d.description,
    roles: guildRolesData,
    emojis: guildEmojisData,
    members: guildUsersData
  }

  client.data.guilds.set(guildData.id, guildData)
  
  guildUsersData.forEach((x: any) => {
    const user = x.map((a:any) => a.user)
    client.data.users.set(user[0].id, user[0])
  })

  if(client.WsOptions?.infoLogs)console.log('[luna | client] - [log | event] - Client event "guild_create" has been runned')
}