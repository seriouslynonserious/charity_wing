import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

interface Message {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  // Form fields
  name: string = '';
  email: string = '';
  subject: string = ''; // Added this field
  message: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  sendMessage(): void {
    if (this.name && this.email && this.message) {
      const newMessage: Message = {
        name: this.name,
        email: this.email,
        message: `Subject: ${this.subject}\nMessage: ${this.message}` // Include the subject in the message
      };
      this.contactService.addMessage(newMessage);

      // Reset form fields
      this.name = '';
      this.email = '';
      this.subject = ''; // Clear subject as well
      this.message = '';

      alert('Your message has been sent. Thank you for contacting us!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
