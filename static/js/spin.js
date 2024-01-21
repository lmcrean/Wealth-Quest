// Set default degree (360 * 5)
let initialDegree = 3600;
// Number of clicks = 10
let totalClicks = 1;

function spinWhell(targetSectionIndex) {
  // Increment the total clicks
  totalClicks++;

  // Calculate the target degree based on the section index
  const targetDegree = initialDegree * totalClicks + targetSectionIndex * (360 / 6);

  /* Let's make the spin btn tilt every
         time the edge of the section hits 
         the indicator */
  const wheelSections = document.querySelectorAll("#wheel .sec");
  wheelSections.forEach(function (section) {
    let counter = 0;
    const maxCount = 700;
    const interval = setInterval(function () {
      counter++;
      if (counter === maxCount) {
        clearInterval(interval);
      }

      const sectionOffsetTop = section.offsetTop;

      /* 23.7 is the minimum offset number that 
                 each section can get, in a 30-degree angle.
                 So, if the offset reaches 23.7, then we know
                 that it has a 30-degree angle and therefore, 
                 exactly aligned with the spin btn */
      if (sectionOffsetTop < 23.89) {
        document.getElementById("spin").classList.add("spin");
        setTimeout(function () {
          document.getElementById("spin").classList.remove("spin");
        }, 1000);
      }
    }, 10);

    document.getElementById("inner-wheel").style.transform = "rotate(" + targetDegree + "deg)";
  });
}
