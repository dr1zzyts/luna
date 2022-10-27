import WebSocket from "ws";
import { WebSocketOptions } from "../types/WebSocketOptionsType";
import * as Constants from '../constants/variables.json';
import { MessageType } from "../types/WebSocketMessageType";

export class WebSocketStructure {
  private webSocketUrl:string;
  private ws:WebSocket;
  private options:WebSocketOptions;

  constructor(webSocketURL:string = Constants.webSocketURL, options: WebSocketOptions){
    this.webSocketUrl = webSocketURL;
    this.options = options
  }
  config(webSocketURL?:string){
    if(webSocketURL)this.webSocketUrl = webSocketURL;
    if(!this.webSocketUrl)throw new Error('[luna | websocket] [err] - The websocket server url is not defined!')

    this.ws = new WebSocket(this.webSocketUrl)
  }
  setup(){
    if(!this.ws)throw new Error('[luna | websocket] [err] - Not connected to the websocket server')

    this.ws.on('open', this.openEvent);
    this.ws.on('message', this.messageReceiveEvent);
  }
  openEvent = () => {
    if(this.options.infoLogs)console.log('[luna | websocket] [log | event] - Gateway event "open" has been runned!');
  }
  messageReceiveEvent = (message: any) => {
    const parsedData = JSON.parse(message) as MessageType

    if(this.options.infoLogs)console.log('[luna | websocket] [log | event] - Gateway event "message" has been runned!')
    if(this.options.developerLogs)console.log(parsedData);
  }
}