import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

interface HairDonor {
  id: number;
  name: string;
  contact: string;
  email: string;
  age: number;
  gender: string;
  hairLength: number;
  donationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class HairDonationService {
  // Replace with the actual API URL
  private apiUrl = 'https://localhost:7132/api/HairDonor'; 
  private hairDonorsKey = 'hairDonors';
  private hairDonors: BehaviorSubject<HairDonor[]> = new BehaviorSubject<HairDonor[]>([]);

  constructor(private http: HttpClient) {
    this.loadHairDonors();
  }

  /**
   * Load hair donors from the API and local storage as a fallback.
   */
  private loadHairDonors() {
    this.http.get<HairDonor[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching hair donors from API:', error);
        const savedHairDonors = JSON.parse(localStorage.getItem(this.hairDonorsKey) || '[]');
        this.hairDonors.next(savedHairDonors);
        throw error;
      })
    ).subscribe((donors) => {
      this.hairDonors.next(donors);
      localStorage.setItem(this.hairDonorsKey, JSON.stringify(donors));
    });
  }

  /**
   * Get all hair donors as an observable.
   */
  getHairDonors(): Observable<HairDonor[]> {
    return this.hairDonors.asObservable();
  }

  /**
   * Add a new hair donor.
   * @param donor - The donor object to be added.
   */
  addHairDonor(donor: HairDonor): Observable<HairDonor> {
    return this.http.post<HairDonor>(this.apiUrl, donor).pipe(
      catchError((error) => {
        console.error('Error adding hair donor:', error);
        throw error;
      }),
      tap((newDonor) => {
        const updatedDonors = [...this.hairDonors.value, newDonor];
        this.hairDonors.next(updatedDonors);
        localStorage.setItem(this.hairDonorsKey, JSON.stringify(updatedDonors));
      })
    );
  }

  /**
   * Delete a hair donor by ID.
   * @param id - The ID of the donor to delete.
   */
  deleteHairDonor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting hair donor:', error);
        throw error;
      }),
      tap(() => {
        const updatedDonors = this.hairDonors.value.filter((donor) => donor.id !== id);
        this.hairDonors.next(updatedDonors);
        localStorage.setItem(this.hairDonorsKey, JSON.stringify(updatedDonors));
      })
    );
  }
}
