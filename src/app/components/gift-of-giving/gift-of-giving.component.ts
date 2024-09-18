import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Declare Bootstrap globally
declare var bootstrap: any;

interface Donation {
  donorName: string;
  amount: number;
  email: string;
  message?: string;
  panCard: string;
  donationDate: string;
}

@Component({
  selector: 'app-gift-of-giving',
  templateUrl: './gift-of-giving.component.html',
  styleUrls: ['./gift-of-giving.component.css']
})
export class GiftOfGivingComponent implements OnInit {
  donations$: Observable<Donation[]>;
  filteredDonations$: Observable<Donation[]>;
   // Track sort direction (ascending/descending)
  
  // Form fields
  donorName: string = '';
  amount: number | null = null;
  email: string = '';
  message: string = '';
  panCard: string = '';
  donationDate: string = '';

  // Search query
  searchQuery: string = '';

  constructor(private donationService: DonationService) {
    // Fetch initial donations
    this.donations$ = this.donationService.getDonations();
    this.filteredDonations$ = this.donations$;
  }

  ngOnInit(): void {
    // Automatically open the initial modal after the component loads
    const initialModal = new bootstrap.Modal(document.getElementById('initialModal'), {});
    initialModal.show();
  }

  openDonationForm(): void {
    // Close the initial modal and open the donation form modal
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'), {});
    
    initialModal.hide(); // Hide the initial modal
    donationModal.show(); // Show the donation form modal
  }

  openDonorList(): void {
    // Method to open the donor list modal
    const donorListModal = new bootstrap.Modal(document.getElementById('donorListModal'), {});
    donorListModal.show();
  }

  // Method to filter donations based on search query
  filterDonations(): void {
    this.filteredDonations$ = this.donations$.pipe(
      map(donations => donations.filter(donation =>
        donation.donorName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        donation.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      ))
    );
  }

  // Method to make a birthday donation
  makeBirthdayDonation(): void {
    if (this.donorName && this.amount && this.email && this.panCard && this.donationDate) {
      const newDonation: Donation = {
        donorName: this.donorName,
        amount: this.amount!,
        email: this.email,
        message: this.message,
        panCard: this.panCard,
        donationDate: this.donationDate
      };

      // Add the new donation to the service
      this.donationService.addDonation(newDonation);

      // Fetch the updated list of donations after adding the new one
      this.donations$ = this.donationService.getDonations();

      // Reset form fields after successful submission
      this.donorName = '';
      this.amount = null;
      this.email = '';
      this.message = '';
      this.panCard = '';
      this.donationDate = '';

      // Close the modal after the donation is added
      this.closeModal();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Method to close the donation form modal programmatically
  closeModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
    donationModal.hide();
  }
}
