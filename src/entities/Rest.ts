import axios from 'axios';
import * as Constants from '../constants/variables.json';

export class Rest {
  constructor() { }
  
  async get(url:string, headers?: any) {
    if (!url) throw new Error('[luna | rest] [err | get] - [GET] Url not has provided!');
    if (typeof url !== 'string') throw new Error('[luna | rest] [err | get] - Invalid url has been provided!')
    
    try {
      const response = await axios.get(url, { headers: headers })
      if(response)return response
    } catch (err) {
      throw new Error('[luna | rest] [err | get] - Request failed \nError: '+ err.message)
    }
    
  }
  async post(url:string, body: any, headers?: any) {
    if (!url) throw new Error('[luna | rest] [err | post] - [POST] Url not has provided!');
    if (typeof url !== 'string') throw new Error('[luna | rest] [err | post] - Invalid url has been provided!')
    
    try {
      const response = await axios.post(url, body, { headers: headers })
      if(response)return response
    } catch (err) {
      throw new Error('[luna | rest] [err | post] - Request failed \nError: '+ err.message)
    }
  }
  async discordSendMessage({ content, channelID, token }: { content: string, channelID: string, token: string }) {
    if (!content) throw new Error('[luna | rest] [err | discord-send-message] - Message content not has provided!')
    if (typeof content !== 'string') throw new TypeError('[luna | rest] [err | discord-send-message] - Invalid message content has been provided!')
    if (content.length > 2000) throw new Error('[luna | rest] [err | discord-send-message] - Message content length is longer than 2000 chars!')
    
    if(!channelID) throw new Error('[luna | rest] [err | discord-send-message] - ChannelID not has provided!')
    if (typeof channelID !== 'string') throw new TypeError('[luna | rest] [err | discord-send-message] - Invalid channel id has been provided!')
    try {
      const response = await this.post(`${Constants.apiURL}/channels/${channelID}/messages`, {
        content: content,
        tts: false
      }, {
        'Authorization': `Bot ${token}`
      })

      if(response)return response
    } catch (err) {
      throw new Error(`[luna | rest] [err | discord-send-message] - An error occurred in this request \n Error: ${err.message}`)
    }
  }
}