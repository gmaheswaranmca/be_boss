function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const carModel = document.getElementById("carModel").value;

    if (name === "" || email === "" || phone === "" || carModel === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    return true;
}