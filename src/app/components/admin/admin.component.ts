import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodDonorService } from '../../services/blood-donor.service';
import { DrugWingService } from '../../services/drug-wing.service';
import { DonationService } from '../../services/donation.service';
import { HairDonationService } from '../../services/hair-donation.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  showNewsAndUpdate = false; // New flag for News and Update section

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

  // GIFT-OF-GIVING.COMPOENTN
  donorName: string = '';
  amount: number | null = null;
  email: string = '';
  message: string = '';
  donationDate: string = '';

  // hair-donor.component
  donor: HairDonor = {
    name: '',
    contact: '',
    email: '',
    age: 0,
    gender: '',
    hairLength: 0,
    donationDate: ''
  };

  // drug-wing
  condition: string = '';
  gender: string = '';

  // For Image Upload
  selectedFile: string[] = [];
  images: string[] = []; 
  currentImage: string | null = null;

  constructor(
    private bloodDonorService: BloodDonorService,
    private drugWingService: DrugWingService,
    private donationService: DonationService,
    private hairDonationService: HairDonationService,
    private router: Router
  ) {
    this.donors$ = this.bloodDonorService.getDonors();
    this.patients$ = this.drugWingService.getPatients();
    this.donations$ = this.donationService.getDonations();
    this.hairDonors$ = this.hairDonationService.getHairDonors();
  }
  isLoggedIn = false;


  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      this.images = JSON.parse(storedImages);
    }
    this.showDonorList = JSON.parse(localStorage.getItem('showDonorList') || 'false');
    this.showPatientList = JSON.parse(localStorage.getItem('showPatientList') || 'false');
    this.showDonationList = JSON.parse(localStorage.getItem('showDonationList') || 'false');
    this.showHairDonorList = JSON.parse(localStorage.getItem('showHairDonorList') || 'false');
    this.showNewsAndUpdate = JSON.parse(localStorage.getItem('showNewsAndUpdate') || 'false');
  }


  
  saveToggleState(): void {
    localStorage.setItem('showDonorList', JSON.stringify(this.showDonorList));
    localStorage.setItem('showPatientList', JSON.stringify(this.showPatientList));
    localStorage.setItem('showDonationList', JSON.stringify(this.showDonationList));
    localStorage.setItem('showHairDonorList', JSON.stringify(this.showHairDonorList));
    localStorage.setItem('showNewsAndUpdate', JSON.stringify(this.showNewsAndUpdate));
  }
  toggleDonorList() {
    this.showDonorList = !this.showDonorList;
    this.resetOtherSections('showDonorList');
  }

  togglePatientList() {
    this.showPatientList = !this.showPatientList;
    this.resetOtherSections('showPatientList');
  }

  toggleDonationList() {
    this.showDonationList = !this.showDonationList;
    this.resetOtherSections('showDonationList');
  }

  toggleHairDonorList() {
    this.showHairDonorList = !this.showHairDonorList;
    this.resetOtherSections('showHairDonorList');
  }

  toggleNewsAndUpdate() {
    this.showNewsAndUpdate = !this.showNewsAndUpdate;
    this.resetOtherSections('showNewsAndUpdate');
  }

  // Reset other sections' states and save the current state
  resetOtherSections(activeSection: string) {
    this.showDonorList = activeSection === 'showDonorList' ? this.showDonorList : false;
    this.showPatientList = activeSection === 'showPatientList' ? this.showPatientList : false;
    this.showDonationList = activeSection === 'showDonationList' ? this.showDonationList : false;
    this.showHairDonorList = activeSection === 'showHairDonorList' ? this.showHairDonorList : false;
    this.showNewsAndUpdate = activeSection === 'showNewsAndUpdate' ? this.showNewsAndUpdate : false;

    // Save state to localStorage
    this.saveToggleState();
  }

  // Blood Wing Functions
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

  // Gift of Giving Functions
  makeBirthdayDonation(): void {
    if (this.donorName && this.amount && this.email && this.donationDate) {
      const newDonation: Donation = {
        donorName: this.donorName,
        amount: this.amount!,
        email: this.email,
        message: this.message,
        donationDate: this.donationDate
      };

      this.donationService.addDonation(newDonation);
      this.donations$ = this.donationService.getDonations();

      // Reset form fields
      this.donorName = '';
      this.amount = null;
      this.email = '';
      this.message = '';
      this.donationDate = '';

      this.closeModals();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  closeModals() {
    const donationModals = bootstrap.Modal.getInstance(document.getElementById('donationModals'));
    donationModals.hide();
  }

  // Hair Donation Functions
  addDonorhair(): void {
    if (this.donor.name && this.donor.contact && this.donor.email && this.donor.age && this.donor.gender && this.donor.hairLength) {
      this.donor.donationDate = new Date().toLocaleDateString();
      this.hairDonationService.addHairDonor(this.donor);
      this.resetFormFields();
      this.closeModalss();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetFormFields() {
    this.donor = {
      name: '',
      contact: '',
      email: '',
      age: 0,
      gender: '',
      hairLength: 0,
      donationDate: ''
    };
  }

  closeModalss() {
    const donationModalss = bootstrap.Modal.getInstance(document.getElementById('hairDonationModal'));
    donationModalss.hide();
  }

  // Drug Wing Functions
  addPatient(patientForm: NgForm): void {
    if (patientForm.valid) {
      const newPatient = {
        name: this.name,
        condition: this.condition,
        contact: this.contact,
        age: this.age,
        gender: this.gender,
        address: this.address
      };

      this.drugWingService.addPatient(newPatient);
      patientForm.resetForm();
      this.closepatientModal();
    }
  }

  closepatientModal() {
    const donationModal = bootstrap.Modal.getInstance(document.getElementById('patientdonationModal'));
    donationModal.hide();
  }


 
  // Delete Functions
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
  
  /*image */  // Image Upload Functions for News and Updates
  onFilesSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          this.images.push(base64Image); // Add image to the list
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  saveImages(): void {
    if (this.images.length > 0) {
      localStorage.setItem('uploadedImages', JSON.stringify(this.images));
      alert('Images saved to local storage successfully!');
    } else {
      alert('No images to save.');
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1); // Remove image from the list
    localStorage.setItem('uploadedImages', JSON.stringify(this.images)); // Update local storage
  }
  showImage(image: string): void {
    this.currentImage = image; // Set the current image
    const modal = new (window as any).bootstrap.Modal(document.getElementById('imageModal'));
    modal.show(); // Show the Bootstrap modal
  }
  closePreview() {
    this.currentImage = null;
    const modalElement = document.getElementById('imageModal')!;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
  }
  isSidebarClosed = window.innerWidth < 768;
  menuItems = [
    { name: 'Home', icon: 'bx-home-alt', showSubmenu: false },
    { name: 'Overview', icon: 'bx-grid-alt', showSubmenu: false },
    // Add more menu items here
  ];

  toggleSubmenu(index: number) {
    this.menuItems[index].showSubmenu = !this.menuItems[index].showSubmenu;
    this.menuItems.forEach((item, i) => {
      if (i !== index) {
        item.showSubmenu = false;
      }
    });
  }

  expandSidebar() {
    this.isSidebarClosed = false;
  }

  collapseSidebar() {
    this.isSidebarClosed = true;
  }
  
  logout(): void {
    // Clear login data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email'); // or any other session information

    // Redirect to the home page
    this.router.navigate(['/']);
  }

}
