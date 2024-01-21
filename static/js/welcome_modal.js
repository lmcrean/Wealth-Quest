$(document).ready(function () {
  // Show the welcome modal on page load
  $("#welcomeModal").modal("show");
});

// Add an event listener to the "Start Game" button
document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    // Close the modal when the button is clicked
    $("#welcomeModal").modal("hide");
  });
