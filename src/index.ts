import { WebSocketStructure } from "./entities/WebSocket";
import * as Constants from './constants/variables.json';
import { WebSocketOptions } from "./types/WebSocketOptionsType";

const WsOptions :WebSocketOptions = {
  infoLogs: true,
  developerLogs: true
} 
const WebSocket = new WebSocketStructure(Constants.webSocketURL, WsOptions);

WebSocket.config();
WebSocket.setup();