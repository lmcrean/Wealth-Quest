var currentStep = 1;
var totalSteps = 10; // Total number of steps

function changeStep(step) {
  // Hide current step
  var currentStepDiv = document.getElementById("step" + currentStep);
  currentStepDiv.style.display = "none";

  // Update step count
  currentStep += step;

  // Correct the step counter if out of bounds
  if (currentStep < 1) {
    currentStep = 1; // prevent going below the first step
  } else if (currentStep > totalSteps) {
    currentStep = totalSteps; // prevent going above the last step
  }

  // Show new step
  var newStepDiv = document.getElementById("step" + currentStep);
  newStepDiv.style.display = "block";

  // Update progress bar
  updateProgressBar();

  // Update button states
  document.getElementById("prevStep").disabled = currentStep === 1;
  document.getElementById("nextStep").disabled = currentStep === totalSteps;
}

function updateProgressBar() {
  var progress = (currentStep / totalSteps) * 100;
  var progressBar = document.getElementById("progressBar");
  progressBar.style.width = progress + "%";
  progressBar.ariaValueNow = progress;
}

// Initialize the modal with the first step visible and correct progress bar
document.addEventListener("DOMContentLoaded", (event) => {
  updateProgressBar(); // Set the initial progress bar width
  document.getElementById("prevStep").disabled = true; // Disable 'Previous' button on first step
});
