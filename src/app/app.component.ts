import { Component, AfterViewInit } from '@angular/core';

declare var $: any; // Declaring jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'apps';

  ngAfterViewInit() {
    this.initSpinner();
    this.handleScrollEvents();
    this.initBackToTopButton();
    this.initProgressBar();
    
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

      // Back to top button visibility logic
      if (scrollTop > 300) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    // Click event for smooth scrolling to top
    $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 100, 'swing'); // Use 'swing' easing for smooth scroll
      return false;
    });
  }

  initBackToTopButton() {
    // Back-to-top button click event
    $('.back-to-top').click(() => {
      $('html, body').animate({ scrollTop: 0 }, 100, 'swing'); // Change easing to 'swing'
      return false; // Prevent default anchor behavior
    });
  }

  initProgressBar() {
    $('.causes-progress').waypoint(() => {
      $('.progress .progress-bar').each((el: HTMLElement) => {
        const $el = $(el);
        $el.css('width', $el.attr('aria-valuenow') + '%');
      });
    }, { offset: '80%' });
  }

 
}
