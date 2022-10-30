import WebSocket from "ws";
import { WebSocketOptions } from "../types/WebSocketOptionsType";
import { MessageType } from "../types/WebSocketMessageType";
import { GatewayIdentifyType } from "../types/WebSocketGatewayIdentifyType";
import { BotConfigType } from "../types/WebSocketBotConfigType";
import { Client } from "./Client";

export class WebSocketStructure {
  private webSocketUrl:string;
  private ws:WebSocket;
  public options: WebSocketOptions;
  private client: Client;
  private heartbeatInterval: number;
  private connectedInterval: any;
  private lastHelloTimestamp: number;
  private events: string[] = ['READY','GUILD_CREATE','MESSAGE_CREATE']
  #botConfig: BotConfigType = {
    token: null,
    intents: null
  };

  constructor(webSocketURL:string, options: WebSocketOptions = {}, client: Client){
    this.webSocketUrl = webSocketURL;
    this.options = options
    this.client = client
  }
  config(webSocketURL?:string){
    if(webSocketURL)this.webSocketUrl = webSocketURL;
    if(!this.webSocketUrl)throw new Error('[luna | websocket] [err] - The websocket server url is not defined!')

    this.ws = new WebSocket(this.webSocketUrl)
  }
  setup(){
    if(!this.ws)throw new Error('[luna | websocket] [err] - Not connected to the websocket server')

    this.ws.on('open', this.openEvent);
    this.ws.on('message', this.messageReceiveEvent)
    this.ws.on('close', this.closeEvent)
  }
  gateway(options: BotConfigType) {
    if (!options.token) throw new Error('[luna | websocket] [err] - Token has not been provided')
    if (!options.intents) throw new Error('[luna | websocket] [err] - Intents has not been provided')

    this.#botConfig.token = options.token
    this.#botConfig.intents = options.intents
  }
  private openEvent = () => {
    if(this.options?.infoLogs)console.log('[luna | websocket] [log | event] - Gateway event "open" has been runned!');
  }
  private closeEvent = (code: number) => {
    if (code === 4004) throw new Error('[luna | websocket] [err] - Invalid token has been provided!')
    if(code === 4014) throw new Error('[luna | websocket] [err] - Intents has been disallowed')
  }
  private messageReceiveEvent = async (message: any) => {
    const parsedData = JSON.parse(message) as MessageType
    if(this.options?.infoLogs)console.log('[luna | websocket] [log | event] - Gateway event "message" has been runned!')
    if (this.options?.developerLogs) console.log(parsedData);
    
    if (parsedData.op === 10) {
      this.heartbeatInterval = parsedData.d.heartbeat_interval
      this.stayConnected()
      this.identify(this.#botConfig.token, this.#botConfig.intents)
    } 
    if (parsedData.op === 11) {
      this.lastHelloTimestamp = Date.now()
    }
    if (parsedData.t && this.events.includes(parsedData.t)) {
      const { default: module } = await import(`../events/${parsedData.t.toLowerCase()}.ts`)
      module(parsedData, this.client)
    }
  }

  private identify(token: string, intents: number) {
    if (!token) throw new Error('[luna | websocket] [err] - Token has not been provided!')
    if (!intents) throw new Error('[luna | websocket] [err] - Intents has not been provided!')
    
    const identifyObject: GatewayIdentifyType = {
      op: 2,
      d: {
        token: token,
        intents: intents,
        properties: {
          os: 'linux',
          browser: 'luna',
          device: 'luna'
        }
      }
    } 
    this.ws.send(JSON.stringify(identifyObject))
  }
  private stayConnected() {
    this.lastHelloTimestamp = Date.now()

    this.connectedInterval = setInterval(() => {
      this.ws.send(JSON.stringify({
        op: 1,
        d: null
      }))
    },this.heartbeatInterval)
  }
}