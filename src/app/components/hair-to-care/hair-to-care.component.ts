import { Component, OnInit } from '@angular/core';
import { HairDonationService } from '../../services/hair-donation.service';
import { Observable } from 'rxjs';

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

@Component({
  selector: 'app-hair-to-care',
  templateUrl: './hair-to-care.component.html',
  styleUrls: ['./hair-to-care.component.css']
})
export class HairToCareComponent implements OnInit {
  hairDonors$: Observable<HairDonor[]>;

  // Form fields
  name: string = '';
  contact: string = '';
  address: string = '';
  age: number | null = null;
  gender: string = '';
  hairLength: number | null = null;
  hairType: string = '';
  chemicalTreatment: string = '';

  constructor(private hairDonationService: HairDonationService) {
    this.hairDonors$ = this.hairDonationService.getHairDonors();
  }

  ngOnInit(): void {}

  addHairDonor(): void {
    if (this.name && this.contact && this.address && this.age !== null && this.gender && this.hairLength !== null && this.hairType) {
      const newDonor: HairDonor = {
        name: this.name,
        contact: this.contact,
        address: this.address,
        age: this.age,
        gender: this.gender,
        hairLength: this.hairLength,
        hairType: this.hairType,
        chemicalTreatment: this.chemicalTreatment
      };
      this.hairDonationService.addHairDonor(newDonor);

      // Reset form fields
      this.name = '';
      this.contact = '';
      this.address = '';
      this.age = null;
      this.gender = '';
      this.hairLength = null;
      this.hairType = '';
      this.chemicalTreatment = '';
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
