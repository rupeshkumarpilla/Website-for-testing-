// script.js: The main JavaScript file for the Rooz website

// Import required libraries
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// Define constants
const SUB_BRANDS = [
  { name: 'Rooz Spice', link: '/roozspice' },
  { name: 'Rooz Dry Fruits', link: '/roozdryfruits' },
  { name: 'Rooz Packaging', link: '/roozpackaging' },
  { name: 'Rooz Flavors', link: '/roozflavors' },
  { name: 'Rooz Transport', link: '/rooztransport' },
  { name: 'Rooz Greens', link: '/roozgreens' },
];

const DATABASE_OPTIONS = [
  { name: 'MySQL', apiKey: '' },
  { name: 'MongoDB', apiKey: '' },
  { name: 'PostgreSQL', apiKey: '' },
];

// Define functions
function createSubBrandLinks() {
  const $subBrandLinks = $('#sub-brand-links');
  SUB_BRANDS.forEach((subBrand) => {
    const $link = $('<a>')
      .text(subBrand.name)
      .attr('href', subBrand.link)
      .addClass('sub-brand-link');
    $subBrandLinks.append($link);
  });
}

function createDatabaseOptions() {
  const $databaseOptions = $('#database-options');
  DATABASE_OPTIONS.forEach((option) => {
    const $option = $('<option>')
      .text(option.name)
      .val(option.name)
      .attr('data-api-key', option.apiKey);
    $databaseOptions.append($option);
  });
}

function createFloatingWindows() {
  const $floatingWindows = $('#floating-windows');
  const windows = [
    { title: 'Notification 1', content: 'This is notification 1' },
    { title: 'Notification 2', content: 'This is notification 2' },
    { title: 'Notification 3', content: 'This is notification 3' },
  ];
  windows.forEach((window) => {
    const $window = $('<div>')
      .addClass('floating-window')
      .html(`
        <h2>${window.title}</h2>
        <p>${window.content}</p>
      `);
    $floatingWindows.append($window);
  });
}

function createLiquedGlassButtons() {
  const $buttons = $('.liqued-glass-button');
  $buttons.each((index, button) => {
    const $button = $(button);
    $button.css({
      'background-color': 'rgba(255, 255, 255, 0.2)',
      'border-radius': '10px',
      'box-shadow': '0 0 10px rgba(0, 0, 0, 0.2)',
      'padding': '10px 20px',
      'color': '#fff',
      'font-size': '16px',
      'font-weight': 'bold',
      'cursor': 'pointer',
    });
    $button.hover(
      () => {
        $button.css({
          'background-color': 'rgba(255, 255, 255, 0.5)',
          'box-shadow': '0 0 20px rgba(0, 0, 0, 0.5)',
        });
      },
      () => {
        $button.css({
          'background-color': 'rgba(255, 255, 255, 0.2)',
          'box-shadow': '0 0 10px rgba(0, 0, 0, 0.2)',
        });
      }
    );
  });
}

function createLoginModal() {
  const $loginModal = $('#login-modal');
  const $loginForm = $('#login-form');
  $loginForm.submit((event) => {
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    // Add API key validation here
    if (username && password) {
      // Login successful, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Login failed, display error message
      $('#error-message').text('Invalid username or password');
    }
  });
}

// Initialize functions
$(document).ready(() => {
  createSubBrandLinks();
  createDatabaseOptions();
  createFloatingWindows();
  createLiquedGlassButtons();
  createLoginModal();
});

// Add event listeners
$(document).on('click', '.sub-brand-link', (event) => {
  event.preventDefault();
  const $link = $(event.target);
  const link = $link.attr('href');
  window.location.href = link;
});

$(document).on('change', '#database-options', (event) => {
  const $option = $(event.target);
  const selectedOption = $option.val();
  const apiKey = $option.find('option:selected').attr('data-api-key');
  // Add API key to database connection
  console.log(`Selected database option: ${selectedOption}, API key: ${apiKey}`);
});

$(document).on('click', '.floating-window', (event) => {
  const $window = $(event.target);
  $window.toggleClass('active');
});

$(document).on('click', '.liqued-glass-button', (event) => {
  const $button = $(event.target);
  $button.toggleClass('active');
});
