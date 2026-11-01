/**
 * MY_JANNE Contact Form & Inquiries Controller
 */

function handleContactSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('inquirySubject');
  const messageInput = document.getElementById('senderMessage');
  const feedbackBox = document.getElementById('contactFeedback');

  if (!nameInput || !emailInput || !messageInput || !feedbackBox) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput ? subjectInput.value : 'Portfolio Inquiry';
  const message = messageInput.value.trim();

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailRegex.test(email) || !message) {
    feedbackBox.className = 'form-feedback error';
    feedbackBox.textContent = 'Please fill out all required fields with a valid email address.';
    feedbackBox.style.display = 'block';
    return;
  }

  // Provide immediate success response
  feedbackBox.className = 'form-feedback success';
  feedbackBox.innerHTML = `
    <strong><i class="fa-solid fa-circle-check"></i> Message Prepared!</strong><br>
    Thank you, ${name}. Launching your default email client to transmit directly to <strong>sabeelafridi394@gmail.com</strong>...
  `;
  feedbackBox.style.display = 'block';

  // Construct mailto link
  const mailtoUrl = `mailto:sabeelafridi394@gmail.com?subject=${encodeURIComponent(`[${subject}] From ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Type: ${subject}\n\nMessage:\n${message}`)}`;

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1200);

  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
}

function copyEmailToClipboard() {
  const email = 'sabeelafridi394@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard: ' + email);
  }).catch(() => {
    prompt('Copy email address:', email);
  });
}
