export interface BloodDonor {
    id: number; // Optional to handle cases where ID is not defined during creation
    name: string;
    age: number;
    bloodGroup: string;
    contact: string;
    address: string;
    donationDate: string;
  }
  