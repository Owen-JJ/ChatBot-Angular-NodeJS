import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotV2Service {
  private urlDialogflow = 'http://localhost:8080/api/dialogflow';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const body = { requestText: message };
    return this.http.post<any>(`${this.urlDialogflow}/requestText`, body);
  }
}
