// src/app/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BloodDonorService } from '../../services/blood-donor.service';
import { DrugWingService } from '../../services/drug-wing.service';
import { DonationService } from '../../services/donation.service';
import { HairDonationService } from '../../services/hair-donation.service';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var bootstrap: any;
interface Patient {
  name: string;
  condition: string;
  contact: string;
  age: number;
  gender: string;
  address: string;


}

interface BloodDonor {
  name: string;
  age: number;
  bloodGroup: string;
  contact: string;
  address: string;
  donationDate: string;
}

interface Donation {
  donorName: string;
  amount: number;
  email: string;
  message?: string;

  donationDate: string;
}

interface HairDonor {
  name: string;
  contact: string;
  email: string;
  age: number;
  gender: string;
  hairLength: number;
  donationDate: string;
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
  // BLOOD-WING.COMPOENTN
  name: string = '';
  age: number = 0;
  bloodGroup: string = '';
  contact: string = '';
  address: string = '';
  //GIFT-OF-GIVING.COMPOENTN
  donorName: string = '';
  amount: number | null = null;
  email: string = '';
  message: string = '';
  donationDate: string = '';

  //hair-donor.compoent
  donor: HairDonor = {
    name: '',
    contact: '',
    email: '',
    age: 0,
    gender: '',
    hairLength: 0,
    donationDate: ''
  };

  //drug-wing
  condition: string = '';
  gender: string = '';

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

  ngOnInit(): void {

  }

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


  //BLOOD-WING
  openDonationForm(): void {
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'), {})
    donationModal.show();
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


  //GIFT-OF-GIVING
  openDonationForms(): void {
    const donationModals = new bootstrap.Modal(document.getElementById('donationModals'), {})
    donationModals.show();
  }
  makeBirthdayDonation(): void {
    if (this.donorName && this.amount && this.email && this.donationDate) {
      const newDonation: Donation = {
        donorName: this.donorName,
        amount: this.amount!,
        email: this.email,
        message: this.message,

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

      this.donationDate = '';

      // Close the modal after the donation is added
      this.closeModals();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  closeModals() {
    const donationModals = bootstrap.Modal.getInstance(document.getElementById('donationModals'));
    donationModals.hide();
  }

  //hair-to-care
  openhairDonationForm(): void {

    const donationModalss = new bootstrap.Modal(document.getElementById('hairDonationModal'));
    donationModalss.show();
  }

  addDonorhair(): void {

    if (this.donor.name && this.donor.contact && this.donor.email && this.donor.age && this.donor.gender && this.donor.hairLength) {
      // Automatically set the donation date to the current date
      this.donor.donationDate = new Date().toLocaleDateString();


      this.hairDonationService.addHairDonor(this.donor);

      // Reset form fields
      this.resetFormFields();
      this.closeModalss();
    } else {
      alert('Please fill in all required fields.');
    }
  }
  closeModalss() {
    const donationModalss = bootstrap.Modal.getInstance(document.getElementById('hairDonationModal'));
    donationModalss.hide();
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

  //drug-wing
  openPatientForm(): void {

    const donationModal = new bootstrap.Modal(document.getElementById('patientdonationModal'), {});


    donationModal.show();
  }
  addPatient(patientForm: NgForm): void {
    if (patientForm.valid) {
      const newPatient = {
        name: this.name,
        condition: this.condition,
        contact: this.contact,
        age: this.age,
        gender: this.gender,
        address: this.address,

      };

      this.drugWingService.addPatient(newPatient); // Call service to add the new patient

      // Reset the form after adding a patient
      patientForm.resetForm();


      this.closepatientModal();
    }
  }
  closepatientModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('patientdonationModal'));
    donationModal.hide();
  }
}
