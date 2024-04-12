export class ChatHistory {
  message: string;
  response: string;
  timestamp: Date;
  userId: number;

  constructor(data: { message: string; response: string; timestamp: Date; userId: number }) {
    this.message = data.message;
    this.response = data.response;
    this.timestamp = data.timestamp;
    this.userId = data.userId;
  }
}
