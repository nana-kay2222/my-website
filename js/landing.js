// 1. Log a debug message immediately to prove the script loaded cleanly
console.debug("🔧 System Check: js/landing.js loaded successfully into the DOM.");

// 2. Grab the button elements from the HTML file
const userButton = document.getElementById('btn-user');
const techButton = document.getElementById('btn-tech');

// 3. Setup debug listeners for the Citizen / User Button
if (userButton) {
    console.debug("✅ Element Found: User button (#btn-user) mapped successfully.");
    
    userButton.addEventListener('click', () => {
        // Clear previous runs
        localStorage.clear();
        
        // Save selection
        localStorage.setItem('selectedRole', 'user');
        
        // Print debug statements directly to the browser console
        console.debug("🎯 Event Triggered: User button clicked.");
        console.debug("💾 Browser Storage Update: 'selectedRole' set to ->", localStorage.getItem('selectedRole'));
        
        // Visual cue to confirm it works
        alert("Success! JavaScript captured 'user' role. Check your browser inspector console for logs.");
    });
} else {
    console.error("❌ Element Missing: Could not find an element with id 'btn-user'.");
}

// 4. Setup debug listeners for the Technician Button
if (techButton) {
    console.debug("✅ Element Found: Tech button (#btn-tech) mapped successfully.");
    
    techButton.addEventListener('click', () => {
        // Clear previous runs
        localStorage.clear();
        
        // Save selection
        localStorage.setItem('selectedRole', 'technician');
        
        // Print debug statements directly to the browser console
        console.debug("🎯 Event Triggered: Technician button clicked.");
        console.debug("💾 Browser Storage Update: 'selectedRole' set to ->", localStorage.getItem('selectedRole'));
        
        // Visual cue to confirm it works
        alert("Success! JavaScript captured 'technician' role. Check your browser inspector console for logs.");
    });
} else {
    console.error("❌ Element Missing: Could not find an element with id 'btn-tech'.");
}
