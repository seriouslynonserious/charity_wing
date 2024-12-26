import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BloodDonor } from '../models/blood-donor.model';

@Injectable({
  providedIn: 'root',
})
export class BloodDonorService {
  private donorsSubject = new BehaviorSubject<BloodDonor[]>([]);
  private apiUrl = 'https://localhost:7132/api/BloodDonor'; // Replace with your actual API URL

  constructor(private http: HttpClient) {
    this.loadDonorsFromApi();
  }

  getDonors(): Observable<BloodDonor[]> {
    return this.donorsSubject.asObservable();
  }

  private loadDonorsFromApi(): void {
    this.http.get<BloodDonor[]>(this.apiUrl).subscribe({
      next: (donors) => this.donorsSubject.next(donors),
      error: (error) => console.error('Error loading donors from API', error),
    });
  }

  addDonor(donor: Omit<BloodDonor, 'id'>): void {
    const newDonor = { ...donor, id: this.generateId() };
    this.http.post<BloodDonor>(this.apiUrl, newDonor).subscribe({
      next: (addedDonor) => {
        const currentDonors = this.donorsSubject.value;
        this.donorsSubject.next([...currentDonors, addedDonor]);
      },
      error: (error) => console.error('Error adding donor via API', error),
    });
  }

  deleteDonor(id: number): void {
    const deleteUrl = `${this.apiUrl}/${id}`;
    this.http.delete(deleteUrl).subscribe({
      next: () => {
        const updatedDonors = this.donorsSubject.value.filter((donor) => donor.id !== id);
        this.donorsSubject.next(updatedDonors);
      },
      error: (error) => console.error('Error deleting donor via API', error),
    });
  }

  private generateId(): number {
    const donors = this.donorsSubject.value;
    const ids = donors.map((d) => d.id).filter((id): id is number => id !== undefined);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}
