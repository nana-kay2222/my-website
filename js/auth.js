<script>
  // Wait for the full DOM to load first so elements are never null
  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupModal = document.getElementById('signupModal');

    if (!signupForm) {
      console.error("ERROR: Could not find an element with id='signupForm'");
      return;
    }

    signupForm.addEventListener('submit', (e) => {
      // 1. MUST BE FIRST LINE: Stops page refresh completely
      e.preventDefault();
      
      console.log("Form submit caught!");

      // 2. Grab inputs safely
      const name = document.getElementById('name')?.value || 'Guest';
      const email = document.getElementById('email')?.value || 'No Email';

      // 3. Update the UI visibly right on the screen
      alert(`TEST SUCCESS: Signed up ${name} (${email})!`);

      // 4. Hide modal (if modal exists)
      if (signupModal) {
        signupModal.classList.remove('active');
      }
    });
  });
</script>