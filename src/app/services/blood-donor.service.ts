// src/app/services/blood-donor.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface BloodDonor {
  name: string;
  age: number;
  bloodGroup: string;
  contact: string;
  address: string;
  donationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BloodDonorService {
  private donorsSubject = new BehaviorSubject<BloodDonor[]>(this.loadDonorsFromLocalStorage());

  getDonors() {
    return this.donorsSubject.asObservable();
  }

  addDonor(donor: BloodDonor) {
    const currentDonors = this.donorsSubject.value;
    const updatedDonors = [...currentDonors, donor];
    this.donorsSubject.next(updatedDonors);
    this.saveDonorsToLocalStorage(updatedDonors);
  }

  deleteDonor(donorName: string) {
    const currentDonors = this.donorsSubject.value.filter(donor => donor.name !== donorName);
    this.donorsSubject.next(currentDonors);
    this.saveDonorsToLocalStorage(currentDonors);
  }

  private loadDonorsFromLocalStorage(): BloodDonor[] {
    const donorsJson = localStorage.getItem('donors');
    return donorsJson ? JSON.parse(donorsJson) : [];
  }

  private saveDonorsToLocalStorage(donors: BloodDonor[]): void {
    localStorage.setItem('donors', JSON.stringify(donors));
  }
}
