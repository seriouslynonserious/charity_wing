// src/app/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodDonorService } from '../../services/blood-donor.service';
import { DrugWingService } from '../../services/drug-wing.service';
import { DonationService } from '../../services/donation.service';
import { HairDonationService } from '../../services/hair-donation.service';

interface Patient {
  name: string;
  condition: string;
  contact: string;
  age: number;
  gender: string;
  address: string;
  medicineNeeded: string;
  reportUrl: string;
}

interface BloodDonor {
  name: string;
  age: number;
  bloodGroup: string;
  contact: string;
  address: string;
  previousDiseases: string;
}

interface Donation {
  donorName: string;
  amount: number;
  email: string;
  message?: string;
  panCard: string;
  donationDate: string;
}

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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showDonorList = false;
  showPatientList = false;
  showDonationList = false;
  showHairDonorList = false;
  donors$: Observable<BloodDonor[]>;
  patients$: Observable<Patient[]>;
  donations$: Observable<Donation[]>;
  hairDonors$: Observable<HairDonor[]>;

  constructor(
    private bloodDonorService: BloodDonorService,
    private drugWingService: DrugWingService,
    private donationService: DonationService,
    private hairDonationService: HairDonationService
  ) {
    this.donors$ = this.bloodDonorService.getDonors();
    this.patients$ = this.drugWingService.getPatients();
    this.donations$ = this.donationService.getDonations();
    this.hairDonors$ = this.hairDonationService.getHairDonors();
  }

  ngOnInit(): void {}

  toggleDonorList() {
    this.showDonorList = !this.showDonorList;
    this.showPatientList = false;
    this.showDonationList = false;
    this.showHairDonorList = false;
  }

  togglePatientList() {
    this.showPatientList = !this.showPatientList;
    this.showDonorList = false;
    this.showDonationList = false;
    this.showHairDonorList = false;
  }

  toggleDonationList() {
    this.showDonationList = !this.showDonationList;
    this.showDonorList = false;
    this.showPatientList = false;
    this.showHairDonorList = false;
  }

  toggleHairDonorList() {
    this.showHairDonorList = !this.showHairDonorList;
    this.showDonorList = false;
    this.showPatientList = false;
    this.showDonationList = false;
  }

  deleteDonor(donorName: string): void {
    this.bloodDonorService.deleteDonor(donorName);
  }
  deleteHairDonor(name: string) {
    this.hairDonationService.deleteHairDonor(name);
  }
  deletePatient(name: string): void {
    this.drugWingService.deletePatient(name);
  }
  deleteDonation(donorName: string): void {
    this.donationService.deleteDonation(donorName);
  }
}
