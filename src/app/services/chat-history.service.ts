import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatHistory } from '../common/ChatHistory';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {

  private url = "http://localhost:8080/api/chatHistory";

  constructor(private httpClient: HttpClient) { }

  saveChatHistory(chatHistory: ChatHistory): Observable<ChatHistory> {
    return this.httpClient.post<ChatHistory>(`${this.url}/save`, chatHistory);
  }

  getChatHistoryByUserId(userId: number): Observable<ChatHistory[]> {
    return this.httpClient.get<ChatHistory[]>(`${this.url}/user/${userId}`);
  }
}

