// Set default degree (360 * 5)
let initialDegree = 3600;
// Number of clicks = 10
let totalClicks = 1;

document.addEventListener("DOMContentLoaded", function () {
    /* WHEEL SPIN FUNCTION */
    document.getElementById('spin').addEventListener('click', function () {

        // Increment the total clicks
        totalClicks++;

        // Set the target section index where you want the wheel to land (zero-based)
        const targetSectionIndex = 1; // Change this to your desired section index

        // Calculate the target degree based on the section index
        const targetDegree = initialDegree * totalClicks + (targetSectionIndex * (360 / 6));

        /* Let's make the spin btn tilt every
         time the edge of the section hits 
         the indicator */
        const wheelSections = document.querySelectorAll('#wheel .sec');
        wheelSections.forEach(function (section) {
            let counter = 0;
            const maxCount = 700;
            const interval = setInterval(function () {
                counter++;
                if (counter === maxCount) {
                    clearInterval(interval);
                }

                const sectionOffsetTop = section.offsetTop;
                document.getElementById("txt").innerHTML = sectionOffsetTop;

                /* 23.7 is the minimum offset number that 
                 each section can get, in a 30-degree angle.
                 So, if the offset reaches 23.7, then we know
                 that it has a 30-degree angle and therefore, 
                 exactly aligned with the spin btn */
                if (sectionOffsetTop < 23.89) {
                    console.log('<<<<<<<<');
                    document.getElementById('spin').classList.add('spin');
                    setTimeout(function () {
                        document.getElementById('spin').classList.remove('spin');
                    }, 100);
                }
            }, 10);

            document.getElementById('inner-wheel').style.transform = 'rotate(' + targetDegree + 'deg)';
        });
    });
});
