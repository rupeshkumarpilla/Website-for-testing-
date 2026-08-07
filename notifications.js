// notifications.js: The JavaScript file for notification functionality

// Import required libraries
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// Define constants
const NOTIFICATION_SELECTOR = '#notification';
const NOTIFICATION_CLOSE_SELECTOR = '#notification-close';
const NOTIFICATION_MESSAGE_SELECTOR = '#notification-message';

// Define notification types
const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Define notification durations
const NOTIFICATION_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 6000,
  LONG: 10000,
};

// Function to show notification
function showNotification(type, message, duration = NOTIFICATION_DURATIONS.MEDIUM) {
  // Set notification type and message
  $(NOTIFICATION_SELECTOR).addClass(type);
  $(NOTIFICATION_MESSAGE_SELECTOR).text(message);

  // Show notification
  $(NOTIFICATION_SELECTOR).fadeIn();

  // Hide notification after duration
  setTimeout(() => {
    hideNotification();
  }, duration);
}

// Function to hide notification
function hideNotification() {
  // Hide notification
  $(NOTIFICATION_SELECTOR).fadeOut();
}

// Function to close notification
function closeNotification() {
  // Hide notification
  $(NOTIFICATION_SELECTOR).fadeOut();
}

// Event listener for notification close button
$(NOTIFICATION_CLOSE_SELECTOR).on('click', () => {
  closeNotification();
});

// Export notification functions
export { showNotification, hideNotification, closeNotification };

// Example usage:
// showNotification(NOTIFICATION_TYPES.SUCCESS, 'Notification message');
