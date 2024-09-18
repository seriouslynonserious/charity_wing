import { Component, OnInit } from '@angular/core';
import { DrugWingService } from '../../services/drug-wing.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

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
  medicineNeeded: string = '';
  reportUrl: string = ''; // Holds the base64 URL of the uploaded report

  // Observable to hold patients list
  patients$: Observable<any> | undefined;

  constructor(private drugWingService: DrugWingService) {}

  ngOnInit(): void {
    // Fetch existing patients on component initialization
    this.patients$ = this.drugWingService.getPatients();
  }

  // Function to handle file selection and convert it to base64 URL
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.reportUrl = e.target.result; // Store the base64 URL of the file
    };

    reader.readAsDataURL(file); // Convert file to Data URL
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
        medicineNeeded: this.medicineNeeded,
        reportUrl: this.reportUrl // Attach the base64 URL of the uploaded report
      };

      this.drugWingService.addPatient(newPatient); // Call service to add the new patient

      // Reset the form after adding a patient
      patientForm.resetForm();

      // Reset the reportUrl
      this.reportUrl = '';
    }
  }
}
