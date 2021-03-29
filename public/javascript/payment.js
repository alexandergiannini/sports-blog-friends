// const { response } = require("express");

var stripe = Stripe("pk_test_19lKLey0BnXSxv35hMNmN3sj00PuMqjbWm");
    var checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", function () {
      fetch("/create-checkout-session", {
        method: "POST",
      })
        .then(function (response) {
          console.log(response)
            return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          } else{
            document.location.replace("dashboard/success")
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });