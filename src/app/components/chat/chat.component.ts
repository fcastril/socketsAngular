import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message: string = '';
  messageSubscription: Subscription = new Subscription;
  messages: any[]=[];

  element: HTMLElement;

  constructor(public chatService: ChatService) { }


  ngOnInit(): void {
    this.element = document.getElementById('chat-messages');
    this.messageSubscription = this.chatService.getMessages().subscribe(msg=>{
      this.messages.push( msg );
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  send() {
    if ( this.message.trim().length === 0 )
    {
      return;
    }

    this.chatService.sendMessage(this.message);
    console.log(this.message);
    this.message ='';
  }

}
