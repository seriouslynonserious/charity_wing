// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Message {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messages = new BehaviorSubject<Message[]>([]);

  getMessages() {
    return this.messages.asObservable();
  }

  addMessage(message: Message) {
    const currentMessages = this.messages.value;
    this.messages.next([...currentMessages, message]);

    // Simulate sending email or storing message
    console.log(`New message from ${message.name} (${message.email}): ${message.message}`);
  }
}
