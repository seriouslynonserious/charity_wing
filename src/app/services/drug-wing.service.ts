import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DrugWingService {
  private patients = new BehaviorSubject<Patient[]>(this.getPatientsFromLocalStorage());

  getPatients() {
    return this.patients.asObservable();
  }

  addPatient(patient: Patient) {
    const currentPatients = this.patients.value;
    const updatedPatients = [...currentPatients, patient];
    this.patients.next(updatedPatients);
    this.savePatientsToLocalStorage(updatedPatients);
  }

  deletePatient(name: string) {
    const updatedPatients = this.patients.value.filter(patient => patient.name !== name);
    this.patients.next(updatedPatients);
    this.savePatientsToLocalStorage(updatedPatients);
  }

  private getPatientsFromLocalStorage(): Patient[] {
    const patientsJson = localStorage.getItem('patients');
    return patientsJson ? JSON.parse(patientsJson) : [];
  }

  private savePatientsToLocalStorage(patients: Patient[]): void {
    localStorage.setItem('patients', JSON.stringify(patients));
  }
}
