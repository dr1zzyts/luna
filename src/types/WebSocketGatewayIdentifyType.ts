export type GatewayIdentifyType = {
  op: number,
  d: {
    token: string,
    intents: number,
    properties: {
      os: string,
      browser: string,
      device: string
    }
  }
}