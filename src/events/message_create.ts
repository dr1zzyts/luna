import { Client } from "../entities/Client";
import { GuildUserType } from "../types/GuildType";
import { MessageMentionType, MessagePayloadType } from "../types/MessagePayloadType";
import { UserType } from "../types/UserType";
import { MessageType } from "../types/WebSocketMessageType";

export default function (payload: MessageType, client: Client) {
  const messageMentionsData: MessageMentionType[] = payload.d.mentions.map((x: any) => [{
    username: x.username,
    member: {
      roles: x.member.roles,
      premium_since: x.member.premium_since,
      nick: x.member.nick,
      mute: x.member.mute,
      joinedAt: x.member.joined_at,
      avatar: x.member.avatar
    },
    id: x.id,
    discriminator: x.discriminator,
    avatar: x.avatar
  }])

  const memberData: GuildUserType = {
    roles: payload.d.member.roles,
    nick: payload.d.member.nick,
    mute: payload.d.member.mute,
    joinedAt: payload.d.member.joined_at,
    premium_since: payload.d.member.premium_since
  }

  const authorData: UserType = {
    username: payload.d.author.username,
    id: payload.d.author.id,
    discriminator: payload.d.author.discriminator,
    avatar: payload.d.author.avatar
  }
  const messageObject: MessagePayloadType = {
    timestamp: payload.d.timestamp,
    pinned: payload.d.pinned,
    mentions: messageMentionsData,
    mentionEveryone: payload.d.mention_everyone,
    mentionsRoles: payload.d.mentions_roles,
    member: memberData,
    id: payload.d.id,
    content: payload.d.content,
    channelId: payload.d.channel_id,
    guildId: payload.d.guild_id,
    author: authorData
  }

  client.emit('message', messageObject)
}