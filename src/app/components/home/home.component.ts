import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = []; // Store images from local storage
  carouselModal: any; // Reference to Bootstrap modal

  ngOnInit(): void {
    // Load images from local storage
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      this.images = JSON.parse(storedImages);
    }

    // Initialize the modal
    this.carouselModal = new (window as any).bootstrap.Modal(document.getElementById('carouselModal'));

    // Automatically open the modal if there are images
    if (this.images.length > 0) {
      this.openCarousel();
    }
  }

  openCarousel(): void {
    this.carouselModal.show(); // Show the carousel modal
  }

  closeCarousel(): void {
    this.carouselModal.hide(); // Hide the carousel modal
  }
}
