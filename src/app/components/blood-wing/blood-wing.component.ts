import { Component, OnInit } from '@angular/core';
import { BloodDonorService } from '../../services/blood-donor.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

declare var bootstrap: any;

interface BloodDonor {
  name: string;
  age: number;
  bloodGroup: string;
  contact: string;
  address: string;
  donationDate: string; 
}

@Component({
  selector: 'app-blood-wing',
  templateUrl: './blood-wing.component.html',
  styleUrls: ['./blood-wing.component.css']
})
export class BloodWingComponent implements OnInit {
  donors$: Observable<BloodDonor[]>;
  filteredDonors$: Observable<BloodDonor[]>;
  searchBloodGroup: string = ''; // Variable for search input
  private searchSubject = new BehaviorSubject<string>(''); // For handling search input

  // Form fields
  name: string = '';
  age: number = 0;
  bloodGroup: string = '';
  contact: string = '';
  address: string = '';
  

  constructor(private bloodDonorService: BloodDonorService) {
    // Load all donors
    this.donors$ = this.bloodDonorService.getDonors();

    // Filter donors based on search criteria
    this.filteredDonors$ = this.searchSubject.pipe(
      map((searchTerm: string) => searchTerm.toLowerCase().trim()),
      switchMap((searchTerm) => {
        return this.donors$.pipe(
          map((donors) =>
            donors.filter((donor) =>
              donor.bloodGroup.toLowerCase().includes(searchTerm)
            )
          )
        );
      })
    );
  }

  ngOnInit(): void {
    const initialModal = new bootstrap.Modal(document.getElementById('initialModal'), {});
    initialModal.show();
  }

  openDonationForm(): void {
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'), {});
    
    initialModal.hide();
    donationModal.show();
  }

  openDonorList(): void {
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donorListModal = new bootstrap.Modal(document.getElementById('donorListModal'), {});

    initialModal.hide();
    donorListModal.show();
  }

  addDonor(): void {
    if (this.name && this.age && this.bloodGroup && this.contact && this.address) {
      const currentDate = new Date().toLocaleDateString(); // Get current date in a readable format
  
      const newDonor: BloodDonor = {
        name: this.name,
        age: this.age,
        bloodGroup: this.bloodGroup,
        contact: this.contact,
        address: this.address,
        donationDate: currentDate // Add current date
      };
  
      this.bloodDonorService.addDonor(newDonor);
  
      // Reset form fields
      this.name = '';
      this.age = 0;
      this.bloodGroup = '';
      this.contact = '';
      this.address = '';
  
      this.closeModal();
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  closeModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
    donationModal.hide();
  }

  // Method to update the search term
  onSearchTermChange(newTerm: string): void {
    this.searchSubject.next(newTerm);
  }
}
