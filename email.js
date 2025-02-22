function sendMail() {
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        total: document.getElementById("cart-total-input").value,
    };

    emailjs.send("service_nkhfl1e", "template_s8hy76s", params)
        .then(function(response) {
            alert("Email sent successfully!");
            console.log("Success:", response);
        })
        .catch(function(error) {
            alert("Failed to send email. Please try again.");
            console.error("Error:", error);
        });
}
