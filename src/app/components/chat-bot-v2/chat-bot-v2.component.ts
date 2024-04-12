import { Component, NgZone } from '@angular/core';
import { ChatBotV2Service } from 'src/app/services/chat-bot-v2.service';
import { ChatHistory } from 'src/app/common/ChatHistory';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/common/Customer';

interface IWindow extends Window {
  webkitSpeechRecognition?: any;
}

@Component({
  selector: 'app-chat-bot-v2',
  templateUrl: './chat-bot-v2.component.html',
  styleUrls: ['./chat-bot-v2.component.css']
})
export class ChatBotV2Component {
  chatOpen: boolean = false;
  message: string = '';
  messages: any[] = [];
  hasGreeted: boolean = false;
  speechRecognition: any;
  isListening: boolean = false;

  constructor(
    private chatBotService: ChatBotV2Service,
    private authService: AuthService,
    private ngZone: NgZone
  ) {
    this.initSpeechRecognition();
  }

  private sendBotMessage(text: string) {
    const botMessage = { text, sender: 'bot' };
    this.ngZone.run(() => {
      this.messages.push(botMessage);
    });
  }

  sendMessage(text?: string) {
    let content = text || this.message.trim();
    if (content) {
      this.sendMessageToBot(content);
    }
  }

  private sendMessageToBot(message: string) {
    const userMessage = { text: message, sender: 'user' };
    this.ngZone.run(() => {
      this.messages.push(userMessage);
      this.chatBotService.sendMessage(message).subscribe(
        (response) => {
          const botResponseText = response.responseMessage || "Không tìm thấy phản hồi.";
          this.sendBotMessage(botResponseText);
          this.saveChatHistory(userMessage, botResponseText);
        },
        (error) => {
          console.error('Error sending message to Dialogflow:', error);
        }
      );
    });
    this.message = '';
  }

  saveChatHistory(userMessage: any, botResponseText: string) {
    if (this.authService.isLoggedIn) {
      const currentUser: Customer | null = this.authService.currentUser;
      if (currentUser) {
        const chatEntry = new ChatHistory({
          message: userMessage.text,
          response: botResponseText,
          timestamp: new Date(),
          userId: currentUser.userId
        });
        console.log('Chat entry to be saved:', chatEntry);
      } else {
        console.error('Current user is null. Chat history not saved.');
      }
    } else {
      console.error('User is not logged in. Chat history not saved.');
    }
  }


  toggleChat() {
    this.chatOpen = !this.chatOpen;

    if (this.chatOpen && !this.hasGreeted) {
      setTimeout(() => {
        this.sendBotMessage('Chào bạn👋, Martfury Book Shop có thể giúp gì cho bạn😍, Hãy cho tôi biết😊');
        this.hasGreeted = true;
      }, 1000);
    }
  }

  startVoiceRecognition() {
    if (this.speechRecognition && !this.isListening) {
      this.speechRecognition.start();
    }
  }

  sendImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageMessage = { imageUrl: e.target.result, sender: 'user'};
        this.ngZone.run(() => this.messages.push(imageMessage));
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  }

  private initSpeechRecognition() {
    const { webkitSpeechRecognition } = window as IWindow;
    if (webkitSpeechRecognition) {
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.lang = 'vi-VN';
      this.speechRecognition.interimResults = true;

      this.speechRecognition.onresult = (speechEvent: any) => {
        let finalTranscript = '';
        for (let i = speechEvent.resultIndex; i < speechEvent.results.length; ++i) {
          const transcription = speechEvent.results[i][0].transcript;
          if (speechEvent.results[i].isFinal) {
            finalTranscript += transcription;
          }
        }
        if (finalTranscript) {
          this.message = finalTranscript;
          this.sendMessage(finalTranscript);
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        this.ngZone.run(() => {
          console.error('Speech recognition error', event);
          this.speechRecognition.stop();
        });
      };

      this.speechRecognition.onstart = () => {
        this.ngZone.run(() => {
          this.isListening = true;
        });
      };

      this.speechRecognition.onend = () => {
        this.ngZone.run(() => {
          this.isListening = false;
        });
      };
    } else {
      console.error('Speech Recognition not available');
    }
  }
}
