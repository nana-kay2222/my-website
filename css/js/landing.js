// Grab the button elements from the HTML file
const userButton = document.getElementById('btn-user');
const techButton = document.getElementById('btn-tech');

// Listen for clicks on the User button
userButton.addEventListener('click', () => {
    localStorage.setItem('selectedRole', 'user');
    window.location.href = 'auth.html';
});

// Listen for clicks on the Technician button
techButton.addEventListener('click', () => {
    localStorage.setItem('selectedRole', 'technician');
    window.location.href = 'auth.html';
});
