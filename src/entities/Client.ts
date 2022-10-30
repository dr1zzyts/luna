import { WebSocketStructure } from './WebSocket';
import { WebSocketOptions } from '../types/WebSocketOptionsType';
import * as Constants from '../constants/variables.json';
import { BotConfigType } from '../types/WebSocketBotConfigType';
import { ClientUserType } from '../types/ClientUserType';
import EventEmitter from 'events';

export class Client extends EventEmitter {
  private token: string;
  private intents: number;
  public user: ClientUserType;
  public WebSocket: WebSocketStructure;
  public WsOptions: WebSocketOptions;
  public data = {
    guilds: new Map(),
    users: new Map()
  }
  constructor(clientConfig: BotConfigType, WsOptions: WebSocketOptions = {}) {
    super()
    this.WsOptions = WsOptions
    this.WebSocket = new WebSocketStructure(Constants.webSocketURL, WsOptions, this);
    this.WebSocket.config(Constants.webSocketURL);
    
    this.token = clientConfig?.token;
    this.intents = clientConfig?.intents
  }
  login(options?: BotConfigType) {
    if (options?.token) this.token = options.token
    if (options?.intents) this.intents = options.intents

    if (!this.token) throw new Error('[luna | client] [err] - Token has not been provided!')
    if (!this.intents) throw new Error('[luna | client] [err] - Intents has not been provided!')
    
    if (typeof this.token !== 'string') throw new Error('[luna | client] [err] - Invalid token has provided!');
    if (typeof this.intents !== 'number') throw new Error('[luna | client] [err] - Invalid intents has provided!')
    
    this.WebSocket.gateway({
      token: this.token,
      intents: this.intents
    })

    this.WebSocket.setup()
    
  }   
}