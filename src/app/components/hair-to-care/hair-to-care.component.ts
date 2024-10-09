import { Component, OnInit } from '@angular/core';
import { HairDonationService } from '../../services/hair-donation.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import 'jspdf-autotable';

declare var bootstrap: any;

interface HairDonor {
  name: string;
  contact: string;
  email: string;
  age: number;
  gender: string;
  hairLength: number;
  donationDate: string; // Added donation date
}

@Component({
  selector: 'app-hair-to-care',
  templateUrl: './hair-to-care.component.html',
  styleUrls: ['./hair-to-care.component.css']
})
export class HairToCareComponent implements OnInit {
  hairDonors$: Observable<HairDonor[]>;
  filteredHairDonors$: Observable<HairDonor[]>;

  searchName: string = '';
  private searchSubject = new BehaviorSubject<string>('');

  donor: HairDonor = {
    name: '',
    contact: '',
    email: '',
    age: 0,
    gender: '',
    hairLength: 0,
    donationDate: '' 
  };

  constructor(private hairDonationService: HairDonationService) {
    // Load all hair donors
    this.hairDonors$ = this.hairDonationService.getHairDonors();

    // Filter donors based on search criteria
    this.filteredHairDonors$ = this.searchSubject.pipe(
      map((searchTerm: string) => searchTerm.toLowerCase().trim()),
      switchMap((searchTerm) => {
        return this.hairDonors$.pipe(
          map((hairDonors) =>
            hairDonors.filter((donor) =>
              donor.name.toLowerCase().includes(searchTerm)
            )
          )
        );
      })
    );
  }

  ngOnInit(): void {
    const initialModal = new bootstrap.Modal(document.getElementById('initialModal'));
    initialModal.show();
  }

  openDonationForm(): void {
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donationModal = new bootstrap.Modal(document.getElementById('hairDonationModal'));

    initialModal.hide();
    donationModal.show();
  }

  openDonorList(): void {
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donorListModal = new bootstrap.Modal(document.getElementById('donorListModal'));
    
    initialModal.hide();
    donorListModal.show();
  }

  addDonorhair(): void {
    // Check if all required fields are filled
    if (this.donor.name && this.donor.contact && this.donor.email && this.donor.age && this.donor.gender && this.donor.hairLength) {
      // Automatically set the donation date to the current date
      this.donor.donationDate = new Date().toLocaleDateString();

      // Add the donor to the service
      this.hairDonationService.addHairDonor(this.donor);

      // Reset form fields
      this.resetFormFields();
      this.closeModal();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  closeModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('hairDonationModal'));
    donationModal.hide();
  }

  resetFormFields() {
    this.donor = {
      name: '',
      contact: '',
      email: '',
      age: 0,
      gender: '',
      hairLength: 0,
      donationDate: '' // Reset donation date after submission
    };
  }

  // Method to update the search term
  onSearchTermChange(newTerm: string): void {
    this.searchSubject.next(newTerm);
  }

  // Download PDF functionality
  
}
