import { Component, AfterViewInit } from '@angular/core';
declare var $: any; // Declaring jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'apps';
imageUrl: any;

  ngAfterViewInit() {
    this.initSpinner();
    this.handleScrollEvents();
    this.initBackToTopButton();
    this.initProgressBar();
    this.initTestimonialsCarousel(); // initialize the carousel
  }

  initSpinner() {
    const spinner = $('#spinner');
    if (spinner.length > 0) {
      spinner.removeClass('show');
    }
  }

  handleScrollEvents() {
    // Scroll event for navbar and back-to-top button
    $(window).scroll(() => {
      const scrollTop = $(window).scrollTop();
      const windowWidth = $(window).width();
      const fixedTop = $('.fixed-top');
      
      // Fixed Navbar logic
      if (scrollTop > 45) {
        fixedTop.addClass('bg-dark shadow').css('top', windowWidth >= 992 ? -45 : 0);
      } else {
        fixedTop.removeClass('bg-dark shadow').css('top', 0);
      }

      // Back to top button visibility
      if (scrollTop > 300) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
  }

  initBackToTopButton() {
    // Back-to-top button click event
    $('.back-to-top').click(() => {
      $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
      return false; // Prevent default anchor behavior
    });
  }

  initProgressBar() {
    // Initialize progress bars with waypoint
    $('.causes-progress').waypoint(() => {
      $('.progress .progress-bar').each((el: HTMLElement) => {
        const $el = $(el);
        $el.css('width', $el.attr('aria-valuenow') + '%');
      });
    }, { offset: '80%' });
  }

  initTestimonialsCarousel() {
    // Initialize testimonials carousel
    $('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }
}
