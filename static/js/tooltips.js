// Function to show the tooltip
function showTooltip(event, tooltipId) {
  var tooltip = document.getElementById(tooltipId);
  tooltip.style.display = "block";
  tooltip.style.left = event.pageX + "px";
  tooltip.style.top = event.pageY + "px";
}

// Function to hide the tooltip
function hideTooltip(tooltipId) {
  var tooltip = document.getElementById(tooltipId);
  tooltip.style.display = "none";
}

// Event listeners for showing and hiding tooltips
document.querySelectorAll(".has-tooltip").forEach((element) => {
  element.addEventListener("mouseover", function (event) {
    showTooltip(event, this.dataset.tooltip);
  });
  element.addEventListener("mouseout", function (event) {
    hideTooltip(this.dataset.tooltip);
  });
});

// Attach event listeners to all tooltip triggers
document.querySelectorAll(".has-tooltip").forEach((element) => {
  element.addEventListener("click", function (event) {
    // Prevent the document click handler from firing
    event.stopPropagation();
    toggleTooltip(event, this.dataset.tooltip);
  });
});

// Hide tooltips on click anywhere in the document
document.addEventListener("click", function (event) {
  document.querySelectorAll(".tooltip-box").forEach((tooltip) => {
    tooltip.style.display = "none";
  });
});
