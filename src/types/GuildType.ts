import { UserType } from "./UserType"

export type GuildRoleType = {
  name: string,
  mentionable: boolean,
  id: string,
  hoist: boolean,
  color: number
}

export type GuildUserType = {
  user?: UserType
  roles: string[],
  nick: string | null,
  mute: boolean,
  joinedAt: string,
  premium_since: string | null
}
export type GuildEmojiType = {
  name: string,
  id: string,
  animated: boolean
}

export type GuildPayloadType = {
  name: string,
  id: string,
  icon: string,
  joinedAt: string,
  description: string,
  roles: GuildRoleType[],
  emojis: GuildEmojiType[],
  members: GuildUserType[],
}