document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const authToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3ZmUifQ.Gy4CY4DTnmvMgdXS61PTIV530oKxG_i95fOlJ3CrxaTP5xH3o5qijvOxGAGi077nRenXPYfnf9lLyhvGdQsjOQ"; // Replace with your actual token

    function showAlert(message, type) {
      Swal.fire({
        title: type === "success" ? "Success" : "Error",
        text: message,
        icon: type,
        confirmButtonText: "OK",
      });
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("organization"),
      phone: formData.get("phone"),
      time_to_connect: formData.get("date-time"),
      details: formData.get("details"),
      files: [],
    };

    function handleResponse(response) {
      return response.json().then((data) => {
        if (response.ok) {
          return data;
        } else {
          showAlert(data.message, "error");
        }
      });
    }

    fetch("https://dev.dglide.com/api/v1/table/contact_us/data/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then(handleResponse)
      .then((data) => {
        showAlert("Form submitted successfully!", "success");
        this.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        showAlert(
          "There was an error submitting the form: " + error.message,
          "error"
        );
      });
  });
