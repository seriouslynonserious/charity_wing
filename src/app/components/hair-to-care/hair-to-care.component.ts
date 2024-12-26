import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HairDonationService } from '../../services/hair-donation.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

declare var bootstrap: any;

interface HairDonor {
  id: number; // Unique ID for each donor
  name: string;
  contact: string;
  email: string;
  age: number;
  gender: string;
  hairLength: number;
  donationDate: string;
}

@Component({
  selector: 'app-hair-to-care',
  templateUrl: './hair-to-care.component.html',
  styleUrls: ['./hair-to-care.component.css']
})
export class HairToCareComponent implements OnInit, AfterViewInit {
  hairDonors$: Observable<HairDonor[]>;
  filteredHairDonors$: Observable<HairDonor[]>;

  searchName: string = '';
  private searchSubject = new BehaviorSubject<string>('');

  donor: HairDonor = {
    id: 0,
    name: '',
    contact: '',
    email: '',
    age: 0,
    gender: '',
    hairLength: 0,
    donationDate: ''
  };

  private modalInstances: { [key: string]: any } = {};

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
    // Any other initialization logic can go here
  }

  ngAfterViewInit(): void {
    const initialModalElement = document.getElementById('initialModal');
    if (initialModalElement) {
      this.modalInstances['initialModal'] = new bootstrap.Modal(initialModalElement);
      this.modalInstances['initialModal'].show();
    }
  }

  private getModalInstance(modalId: string): any {
    if (!this.modalInstances[modalId]) {
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        this.modalInstances[modalId] = new bootstrap.Modal(modalElement);
      }
    }
    return this.modalInstances[modalId];
  }

  openDonationForm(): void {
    const initialModal = this.getModalInstance('initialModal');
    const donationModal = this.getModalInstance('hairDonationModal');

    initialModal?.hide();
    donationModal?.show();
  }

  openDonorList(): void {
    const initialModal = this.getModalInstance('initialModal');
    const donorListModal = this.getModalInstance('donorListModal');

    initialModal?.hide();
    donorListModal?.show();
  }

  addDonorhair(): void {
    if (this.donor.name && this.donor.contact && this.donor.email && this.donor.age > 0 && this.donor.gender && this.donor.hairLength > 0) {
      this.donor.donationDate = new Date().toLocaleDateString();

      this.hairDonationService.addHairDonor(this.donor).subscribe({
        next: () => {
          alert('Donor added successfully!');
          this.resetFormFields();
          this.closeModal('hairDonationModal');
        },
        error: (err: any) => {
          console.error('Error adding donor:', err);
          alert('Failed to add donor. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  deleteDonor(donorId: number): void {
    this.hairDonationService.deleteHairDonor(donorId).subscribe({
      next: () => {
        alert('Donor deleted successfully!');
      },
      error: (err: any) => {
        console.error('Error deleting donor:', err);
        alert('Failed to delete donor. Please try again.');
      }
    });
  }

  closeModal(modalId: string): void {
    const modalInstance = this.getModalInstance(modalId);
    modalInstance?.hide();
  }

  resetFormFields(): void {
    this.donor = {
      id: 0,
      name: '',
      contact: '',
      email: '',
      age: 0,
      gender: '',
      hairLength: 0,
      donationDate: ''
    };
  }

  onSearchTermChange(newTerm: string): void {
    this.searchSubject.next(newTerm);
  }
}
