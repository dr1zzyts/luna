import { GuildUserType } from "./GuildType"
import { UserType } from "./UserType"

export type MessageMentionType = {
  username: string,
  member: GuildUserType,
  id: string,
  discriminator: string,
  avatar: string
}
export type MessagePayloadType = {
  timestamp: string,
  pinned: boolean,
  mentions: MessageMentionType[],
  mentionEveryone: boolean,
  mentionsRoles: string[] | undefined,
  member: GuildUserType,
  id: string,
  content: string,
  channelId: string,
  guildId: string,
  author: UserType
}