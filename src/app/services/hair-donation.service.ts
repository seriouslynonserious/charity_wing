import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface HairDonor {
  name: string;
  contact: string;
  address: string;
  age: number;
  gender: string;
  hairLength: number;
  hairType: string;
  chemicalTreatment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HairDonationService {
  private hairDonorsKey = 'hairDonors';
  private hairDonors: BehaviorSubject<HairDonor[]>;

  constructor() {
    const savedHairDonors = JSON.parse(localStorage.getItem(this.hairDonorsKey) || '[]');
    this.hairDonors = new BehaviorSubject<HairDonor[]>(savedHairDonors);
  }

  getHairDonors() {
    return this.hairDonors.asObservable();
  }

  addHairDonor(donor: HairDonor) {
    const currentDonors = this.hairDonors.value;
    const updatedDonors = [...currentDonors, donor];
    this.hairDonors.next(updatedDonors);
    localStorage.setItem(this.hairDonorsKey, JSON.stringify(updatedDonors));
  }

  deleteHairDonor(name: string) {
    const updatedDonors = this.hairDonors.value.filter(donor => donor.name !== name);
    this.hairDonors.next(updatedDonors);
    localStorage.setItem(this.hairDonorsKey, JSON.stringify(updatedDonors));
  }
}
