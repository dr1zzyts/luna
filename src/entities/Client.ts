import { WebSocketStructure } from './WebSocket';
import { WebSocketOptions } from '../types/WebSocketOptionsType';
import * as Constants from '../constants/variables.json';
import { BotConfigType } from '../types/WebSocketBotConfigType';
import { ClientUserType } from '../types/ClientUserType';
import EventEmitter from 'events';
import { Rest } from './Rest';
import { LunaFunctions } from './Functions';
import { GuildPayloadType } from '../types/GuildType';
import { UserType } from '../types/UserType';

export class Client extends EventEmitter {
  #token: string;
  #intents: number;

  public user: ClientUserType;
  public ws: WebSocketStructure;
  public rest: Rest;
  public funcs: LunaFunctions;
  public data: { guilds: Map<string, GuildPayloadType>, users: Map<string, UserType> } = { guilds: new Map(), users: new Map() }
  public readyTimestamp: number;

  constructor(clientConfig: BotConfigType, WsOptions: WebSocketOptions = {}) {
    super()
    this.ws = new WebSocketStructure(Constants.webSocketURL, WsOptions, this);
    this.ws.config(Constants.webSocketURL);
    
    this.rest = new Rest();
    this.funcs = new LunaFunctions(this);

    this.#token = clientConfig?.token;
    this.#intents = clientConfig?.intents
  }
  connect(options?: BotConfigType) {
    if (options?.token) this.#token = options.token
    if (options?.intents) this.#intents = options.intents

    if (!this.#token) throw new Error('[luna | client] [err] - Token has not been provided!')
    if (!this.#intents) throw new Error('[luna | client] [err] - Intents has not been provided!')
    
    if (typeof this.#token !== 'string') throw new Error('[luna | client] [err] - Invalid token has provided!');
    if (typeof this.#intents !== 'number') throw new Error('[luna | client] [err] - Invalid intents has provided!')
    
    this.ws.gateway({
      token: this.#token,
      intents: this.#intents
    })

    this.ws.setup()
  } 
  get config() {
    return {
      token: this.#token,
      intents: this.#intents
    }
  }

  get uptime() {
    return Date.now() - this.readyTimestamp
  }
}