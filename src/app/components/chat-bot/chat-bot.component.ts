import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/Customer';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  dialogflowIframeVisible: boolean = false;
  user: Customer | null = null;
  messageInput: string = '';

  constructor(
  ) {}

  ngOnInit(): void {

  }

  toggleChat(): void {
    this.dialogflowIframeVisible = !this.dialogflowIframeVisible;
  }
}
