import { Component, OnInit } from '@angular/core';
import { DrugWingService } from '../../services/drug-wing.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-drug-wing',
  templateUrl: './drug-wing.component.html',
  styleUrls: ['./drug-wing.component.css']
})
export class DrugWingComponent implements OnInit {
  name: string = '';
  condition: string = '';
  contact: string = '';
  age: number = 0;
  gender: string = '';
  address: string = '';
  date: string = ''; // New field for date

  // Observable to hold patients list
  patients$: Observable<any> | undefined;

  constructor(private drugWingService: DrugWingService) {}

  ngOnInit(): void {
    // Fetch existing patients on component initialization
    this.patients$ = this.drugWingService.getPatients();
    const initialModal = new bootstrap.Modal(document.getElementById('initialModal'), {});
    initialModal.show();
  }

  openDonorList(): void {
    const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
    const donorListModal = new bootstrap.Modal(document.getElementById('donorListModal'), {});
    initialModal.hide();
    donorListModal.show();
  }

  // Function to add a new patient
  addPatient(patientForm: NgForm): void {
    if (patientForm.valid) {
      const newPatient = {
        name: this.name,
        condition: this.condition,
        contact: this.contact,
        age: this.age,
        gender: this.gender,
        address: this.address,
        date: this.date || new Date().toISOString() // Use provided date or current date
      };

      this.drugWingService.addPatient(newPatient); // Call service to add the new patient

      // Reset the form after adding a patient
      patientForm.resetForm();
      this.closeModal();
    }
  }

  closeModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
    donationModal.hide();
  }
}
