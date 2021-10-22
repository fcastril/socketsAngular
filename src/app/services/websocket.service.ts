import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  constructor(private socket: Socket) { 
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', ()=> {
      console.log('Server connected');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', ()=> {
      console.log('Server disconnected');
      this.socketStatus = false;
    });
  }

  emit( event: string, payload?: any, callback?: Function ){
    if (this.socketStatus)
    {
      console.log('Emitiendo', event);
      this.socket.emit( event, payload, callback);
    }
  }

  listen( event: string ){
    return this.socket.fromEvent( event );
  }
}
