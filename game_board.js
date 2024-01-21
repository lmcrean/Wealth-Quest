// https://github.com/HuiyuLiz/vue-lucky-wheel
// main.js or entry point of your application

(function () {
  let app = new Vue({
    el: "#app",
    data: {
      prizes: [], // Array to store prizes
      prizes_2017: [], // Prizes for the year 2017
      prizes_2018: [], // Prizes for the year 2018
      prize_name: "", // Current prize name
      prize_icon: "", // Current prize icon
      prize_rotate: [], // Rotation angles for each prize
      prize_transition: "", // CSS transition property for animation
      each_deg: 0, // Angle for each wheel slice
      rotate_deg: 0, // Current rotation angle of the wheel
      start_deg: 0, // Initial rotation angle
      current_deg: 0, // Current calculated rotation angle
      index: 0, // Index of the selected prize
      current_year: 2017, // Current selected year
      duration: 3000, // Duration of wheel spin animation
      time_remaining: 20, // Remaining time for spinning
      num: 0, // Total number of prizes
      numbers: [], // Array to store remaining prize indices
      isToggle: false, // Toggle button state
      isClicked: false, // Flag to prevent multiple clicks during wheel spin
      isShow: true, // Flag to control visibility of certain elements
    },
    mounted() {
      let vm = this;
      vm.initPrize();
    },
    watch: {
      current_year: {
        handler: "restart",
      },
    },
    computed: {
      // Determine wheel class based on the current year
      containerClass() {
        let vm = this;
        return vm.current_year === 2017 ? "container" : "container container-large";
      },
      itemClass() {
        let vm = this;
        return vm.current_year === 2017 ? "item item-skew" : "item item-skew-large";
      },
      contentClass() {
        let vm = this;
        return vm.current_year === 2017 ? "item-content" : "item-content item-content-large";
      },
      countClass() {
        let vm = this;
        return vm.current_year === 2017 ? "count" : "count count-large";
      },
    },
    methods: {
      prizeActive() {
        // Apply CSS class for the selected prize after spinning
        let vm = this;
        setTimeout(() => {
          vm.$refs.item[vm.index].classList.value = `${vm.itemClass} active`;
        }, vm.duration);
        console.log("item active");
      },
      setCurrentYear(year) {
        let vm = this;
        if (vm.isClicked) return;
        vm.current_year = year;
      },
      restart() {
        let vm = this;
        vm.$refs.item[vm.index].classList.value = vm.itemClass;
        if (vm.current_year === 2017) {
          vm.time_remaining = 20;
          vm.reset();
          vm.initPrize();
        } else if (vm.current_year === 2018) {
          vm.time_remaining = 120;
          vm.reset();
          vm.initPrize_2018();
        }
      },
      reset() {
        // Reset various properties to their initial values
        let vm = this;
        vm.isShow = true;
        vm.index = 0;
        vm.prize_name = "";
        vm.prize_icon = "";
        vm.prize_rotate = [];
        vm.numbers = [];
        vm.start_deg = 0;
        vm.rotate_deg = `rotate(0deg)`;
        vm.current_deg = 0;
        vm.isClicked = false;
        vm.prize_transition = `none`;
        console.log("RESET");
      },
      initPrize() {
        // Initialize prizes for the year 2017
        let vm = this;
        vm.prizes_2017 = [
          { name: "Payday", icon: "cake", count: 5 },
          { name: "Deal", icon: "stars", count: 5 },
          { name: "Life", icon: "child_care", count: 4 },
          { name: "Payday", icon: " cake", count: 1 },
          { name: "Deal", icon: "wifi", count: 5 },
          { name: "Bonus", icon: "movie_filter", count: 0 },
        ];
        vm.num = vm.prizes_2017.length;
        vm.degree(vm.num);
        vm.prizes = vm.prizes_2017;
        vm.numberArray();
      },
      initPrize_2018() {
        // Initialize prizes for the year 2018
        let vm = this;
        vm.prizes_2018 = [];
        for (let i = 1; i <= 120; i++) {
          let item = {};
          if (i === 1) {
            item.name = 1;
            item.count = 1;
            vm.prizes_2018.push(item);
          } else if (i > 1 && i <= 16) {
            item.name = i;
            item.count = 1;
            vm.prizes_2018.push(item);
          } else if (i === 17) {
            item.name = i;
            item.count = 5;
            vm.prizes_2018.push(item);
          } else if (i === 18) {
            item.name = i;
            item.count = 10;
            vm.prizes_2018.push(item);
          } else if (i === 19) {
            item.name = i;
            item.count = 20;
            vm.prizes_2018.push(item);
          } else if (i === 20) {
            item.name = i;
            item.count = 69;
            vm.prizes_2018.push(item);
          }
        }
        vm.num = vm.prizes_2018.length;
        vm.prizes = vm.prizes_2018;
        vm.degree(vm.num);
        vm.numberArray();
      },
      degree(num) {
        // Calculate the rotation angle for each wheel slice
        let vm = this;
        for (let i = 1; i <= num; i++) {
          let deg = 360 / num;
          vm.each_deg = deg;
          let eachDeg;
          eachDeg = i * deg;
          vm.prize_rotate.push(eachDeg);
        }
      },
      numberArray() {
        // Generate an array of prize indices [0,1,2,3,4,5]
        let vm = this;
        vm.numbers = vm.prizes.map((prize, index) => {
          return index;
        });
      },
      rotateHandler(num) {
        let vm = this;
        // Filter out indices of prizes with count <= 0
        vm.prizes.filter((prize, index) => {
          let filterArray;
          if (prize.count <= 0) {
            let filterArray = vm.numbers.filter((num) => {
              return num !== index;
            });
            vm.numbers = filterArray;
          }
        });

        if (vm.time_remaining > 0) {
          vm.$refs.item[vm.index].classList.value = vm.itemClass;
          // Trigger wheel spin
          vm.prize_draw(num);
        } else if (vm.time_remaining <= 0) {
          vm.$refs.item[vm.index].classList.value = vm.itemClass;
          vm.restart();
        }
      },
      prize_draw(num) {
        // Perform the spinning animation
        let vm = this;
        if (vm.isClicked) return;
        vm.isShow = vm.isClicked;

        // Remove 'active' class from the previously selected prize
        vm.$refs.item[vm.index].classList.value = vm.itemClass;

        // Select a random index from the remaining indices
        vm.index = vm.numbers[Math.floor(Math.random() * vm.numbers.length)];
        console.log("1. Remaining indices", vm.numbers);

        // Perform a preliminary rotation of four circles
        let circle = 4;
        let degree;
        // degree = initial angle + 4 circles + prize rotation angle[random] - remainder
        degree = vm.start_deg + circle * 360 + vm.prize_rotate[vm.index] - (vm.start_deg % 360);

        // Set the initial angle to the calculated angle for the next rotation
        vm.start_deg = degree;
        // Bind the rotation angle to the pointer
        vm.current_year === 2017
          ? (vm.rotate_deg = `rotate(${degree}deg)`)
          : (vm.rotate_deg = `rotate(${degree - vm.each_deg / 2}deg)`);

        vm.prize_transition = `all ${vm.duration / 1000}s cubic-bezier(0.42, 0, 0.2, 0.91)`;
        vm.time_remaining--;
        vm.isClicked = true;

        // Get the remainder of the current starting angle, compared to the wheel angle (for debugging)
        let remainder = vm.start_deg % 360;
        if (remainder <= 0) {
          vm.current_year === 2017
            ? (vm.current_deg = remainder + 360)
            : (vm.current_deg = remainder + 360 - vm.each_deg / 2);
        } else if (remainder > 0) {
          vm.current_year === 2017 ? (vm.current_deg = remainder) : (vm.current_deg = remainder - vm.each_deg / 2);
        }
        console.log("2. Perform rotation", degree, "index", vm.index);

        // Set vm.index as the selected prize index, and reduce the count of the selected prize
        let prize = vm.prizes[vm.index];
        vm.prize_name = prize.name;
        vm.prize_icon = prize.icon;
        if (vm.current_year === 2018) {
          vm.prize_icon = "card_giftcard";
        }
        vm.prizeActive();
        setTimeout(() => {
          prize.count--;
          console.log(
            "3. Rotation angle:",
            vm.current_deg,
            "Prize:",
            prize.name,
            "Remaining quantity:",
            prize.count,
            " Index",
            vm.index
          );
        }, vm.duration);

        // After the animation ends, set "isClicked" back to false
        setTimeout(() => {
          if (vm.isClicked === true) {
            vm.isClicked = false;
          }
        }, vm.duration);
      },
    },
  });
})();
