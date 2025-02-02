document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-container form");

    // Prevent default form submission
    /**********************************/
    /**********************************/

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Submit form after validation
        /**********************************/
        /**********************************/
        alert("Thank you for your message! We will get back to you soon.");
        form.submit();
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});