import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Donation {
  donorName: string;
  amount: number;
  email: string;
  message?: string;
  
  donationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private donationsKey = 'donations';
  private donations: BehaviorSubject<Donation[]>;

  constructor() {
    const savedDonations = JSON.parse(localStorage.getItem(this.donationsKey) || '[]');
    this.donations = new BehaviorSubject<Donation[]>(savedDonations);
  }

  getDonations() {
    return this.donations.asObservable();
  }

  addDonation(donation: Donation) {
    const currentDonations = this.donations.value;
    const updatedDonations = [...currentDonations, donation];
    this.donations.next(updatedDonations);
    localStorage.setItem(this.donationsKey, JSON.stringify(updatedDonations));

    this.sendThankYouNote(donation);
  }

  deleteDonation(donorName: string) {
    const currentDonations = this.donations.value.filter(donation => donation.donorName !== donorName);
    this.donations.next(currentDonations);
    localStorage.setItem(this.donationsKey, JSON.stringify(currentDonations));
  }

  private sendThankYouNote(donation: Donation) {
    const subject = 'Thank You for Your Donation';
    const body = `Dear ${donation.donorName},

Thank you for your generous donation of ₹${donation.amount}. Your support is helping us continue our work in various causes.

Thank you again for your kindness and support.

Best regards,
GMC Thrissur Charity Wing`;

    // Simulate sending email (this is just a placeholder for actual email sending logic)
    console.log(`Email sent to ${donation.email} with subject: "${subject}" and body: "${body}"`);
  }
}
