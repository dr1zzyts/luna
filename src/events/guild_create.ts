import { Client } from "../entities/Client";
import { GuildEmojiType, GuildPayloadType, GuildRoleType, GuildUserType } from "../types/GuildType";
import { MessageType } from "../types/WebSocketMessageType";

export default function (payload: MessageType, client: Client) { 

  const guildUsersData: Map<string, GuildUserType> = new Map()
  payload.d.members.forEach((x: any) => {
    const currMember = {
      user: {
        username: x.user.username,
        id: x.user.id,
        discriminator: x.user.discriminator,
        bot: x.user.bot,
        avatar: x.user.avatar
      },
      roles: x.roles,
      premium_since: x.premium_since,
      joinedAt: x.joined_at,
      mute: x.mute,
      nick: x.nick
    }

    guildUsersData.set(currMember.user.id, currMember)
    client.data.users.set(currMember.user.id, currMember.user)
  })

  const guildRolesData: Map<string, GuildRoleType> = new Map()
  payload.d.roles.forEach((x: GuildRoleType) => {
    const currRole = {
      name: x.name,
      id: x.id,
      mentionable: x.mentionable,
      hoist: x.hoist,
      color: x.color
    }

    guildRolesData.set(currRole.id, currRole)
  })

  const guildEmojisData: Map<string, GuildEmojiType> = new Map()
  payload.d.emojis.map((x: GuildEmojiType) => {
    const currEmoji = {
      name: x.name,
      id: x.id,
      animated: x.animated
    }

    guildEmojisData.set(currEmoji.id, currEmoji)
  })

  const guildData: GuildPayloadType = {
    name: payload.d.name,
    id: payload.d.id,
    icon: payload.d.icon,
    joinedAt: payload.d.joined_at,
    description: payload.d.description,
    roles: guildRolesData,
    emojis: guildEmojisData,
    members: guildUsersData
  }

  client.data.guilds.set(guildData.id, guildData)

  if(client.ws.options?.infoLogs)console.log('[luna | client] - [log | event] - Client event "guild_create" has been runned')
}