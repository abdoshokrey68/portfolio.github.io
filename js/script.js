$(document).ready(function () {
  // Swiper
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    breakpoints: {
      1000: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
      800: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // Handle Card Title Slide Down
  $(".card_title").click(function () {
    let check = 0;
    $(this).hasClass("active") ? check++ : false;
    $(".card_title").removeClass("active");
    $(".card_title i").removeClass("fa-minus");
    $(".card_title i").addClass("fa-plus");
    $(".card_drop_down_section").slideUp();
    if (check === 0) {
      $(this).children("i").toggleClass("fa-plus");
      $(this).children("i").toggleClass("fa-minus");
      $(this).toggleClass("active");
      $(this).next().slideToggle();
    }
  });

  // Handle Show Projects Name Less Than 25 Letters
  let my_work__s__title = document.getElementsByClassName("my_work__s__title");
  $(".my__work_info h6").each(function () {
    $(this).html(
      $(this).html().length > 25
        ? $(this).html().substr(0, 25) + " ..."
        : $(this).html()
    );
  });

  // Handle Show More Projects Method
  var my__works_count_show = 6;
  const HandleshowMySingleProject = function (count) {
    const single_pro_container = $(".single_pro_container");
    for (let i = 0; i < single_pro_container.length; i++) {
      if (i > count - 1) {
        $(`.single_pro_container:eq(${i})`).slideUp();
      } else {
        $(`.single_pro_container:eq(${i})`).slideDown(400);
      }
    }
    // Hide button if all projects are shown
    if (count >= single_pro_container.length) {
      $("#btn_show_more_projects").slideUp(300);
    }
  };
  HandleshowMySingleProject(my__works_count_show);

  // Handle Show More Projects Button
  $("#btn_show_more_projects").on("click", function () {
    my__works_count_show = my__works_count_show + 6;
    HandleshowMySingleProject(my__works_count_show);
  });

  // Set Copyright Year
  let date = new Date();
  $(".this_year").html(date.getFullYear());

  // Open Navbar Section
  $(".navbar_button_open button").on("click", function () {
    $(".navbar_button_open").slideUp(200);
    $(".lef-navbar").slideToggle(400);
  });
  // Close Navbar Section
  $(".navbar_button_close button").on("click", function () {
    $(".lef-navbar").slideToggle(300);
    $(".navbar_button_open").delay(400).slideDown(300);
  });

  // Open Hire Me Section Popup
  $(".hire_me_btn").on("click", function () {
    $(".hire_me_popup_container").toggleClass("d-none");
  });

  // Close Hire Me Section Popup
  $(".close_hire_me_popup").on("click", function () {
    $(".hire_me_popup_container").toggleClass("d-none");
  });

  // Change Navbar Links Active
  $(".navbar_link").on("click", function () {
    $(".navbar_link").removeClass("active");
    $(this).toggleClass("active");
  });
  // Change Navbar Links Active
  $(window).on("scroll", function () {
    $(".main_content_containers").each(function () {
      let element = document.getElementById(this.id);
      let scrollY = window.scrollY;
      let offset = element.offsetTop;
      let element_height = element.offsetHeight;
      if (scrollY + 300 >= offset && scrollY + 300 < offset + element_height) {
        $(".navbar_link").removeClass("active");
        $("#" + this.id + "_link").addClass("active");
      }
    });
  });

  //  Change Theme Method
  const ChangePortfolioTheme = function (class_value) {
    $("body").toggleClass(class_value);
    $(".main_paragraph").toggleClass(class_value);
    $(".lef-navbar").delay(200).toggleClass(class_value);
    $(".theme_scale_container").toggleClass(class_value);
    $(this).toggleClass(class_value);
    $(".toggle_light").toggleClass("text-light");
    $(".change__mode_container i").delay(300).toggleClass("fa-sun fa-moon");
    $(".change__mode_container i").toggleClass(class_value);

    // Apply data-theme attribute for CSS variables
    if (class_value === "theme" || class_value === "default_dark") {
      $("body").attr("data-theme", "dark");
    } else {
      $("body").attr("data-theme", "light");
    }
  };

  // Change Theme Mode
  $(".change__mode_container").on("click", function () {
    const isDark =
      $("body").hasClass("theme") || $("body").hasClass("default_dark");

    if (isDark) {
      // Switch to light mode
      localStorage.setItem("theme", "light");

      // Remove dark classes from all elements
      $("body").removeClass("theme default_dark");
      $(".main_paragraph").removeClass("theme default_dark");
      $(".lef-navbar").removeClass("theme default_dark");
      $(".theme_scale_container").removeClass("theme default_dark");
      $(".change__mode_container i").removeClass("theme default_dark");

      // Set data-theme attribute
      $("body").attr("data-theme", "light");

      // Update icon and text
      $(".toggle_light").removeClass("text-light");
      $(".change__mode_container i").removeClass("fa-moon").addClass("fa-sun");
    } else {
      // Switch to dark mode
      localStorage.setItem("theme", "dark");
      ChangePortfolioTheme("theme");
    }
  });

  // Set The Theme To Local Storage
  const CheckIfThemeIsSavedInLocalStorage = function () {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        ChangePortfolioTheme("theme");
        $("body").attr("data-theme", "dark");
      } else {
        $("body").attr("data-theme", "light");
      }
    } else {
      localStorage.setItem("theme", "light");
      $("body").attr("data-theme", "light");
    }
  };
  CheckIfThemeIsSavedInLocalStorage();

  // Remove Server 000webhost Ads From Free Website
  $(window).on("scroll", function () {
    $("a").each(function () {
      $(this).attr("title") ===
      "Hosted on free web hosting 000webhost.com. Host your own website for FREE."
        ? $(this).closest("div").remove()
        : false;
    });
  });

  // Handle Hidde Button Go Up In The Top Page
  $(window).on("scroll", function () {
    if (window.scrollY > 200) {
      $(".go_up_btn button").slideDown(500);
    } else {
      $(".go_up_btn button").slideUp(500);
    }
  });
  // Handle Go Up Page
  $(".go_up_btn button").on("click", function () {
    window.scrollTo(0, 0);
  });

  // Profile Image Modal
  $("#auther_navbar_image_header").on("click", function () {
    $(".profile_image_modal").removeClass("d-none");
    $("body").css("overflow", "hidden");
  });

  // Close Profile Modal
  $(".close_profile_modal, .profile_modal_overlay").on("click", function () {
    $(".profile_image_modal").addClass("d-none");
    $("body").css("overflow", "auto");
  });

  // Close modal on ESC key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && !$(".profile_image_modal").hasClass("d-none")) {
      $(".profile_image_modal").addClass("d-none");
      $("body").css("overflow", "auto");
    }
  });

  // Typing Animation for Name
  const typingText = "Abdallah Shokrey";
  const typingElement = $(".typing-content");
  let typingIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // milliseconds per character

  function typeText() {
    const currentText = typingElement.text();

    if (!isDeleting && typingIndex < typingText.length) {
      // Typing forward
      typingElement.text(typingText.substring(0, typingIndex + 1));
      typingIndex++;
      typingSpeed = 100; // Normal typing speed
    } else if (isDeleting && typingIndex > 0) {
      // Deleting backward
      typingElement.text(typingText.substring(0, typingIndex - 1));
      typingIndex--;
      typingSpeed = 50; // Faster deletion speed
    } else if (!isDeleting && typingIndex === typingText.length) {
      // Finished typing, wait then start deleting
      typingSpeed = 2000; // Wait 2 seconds before deleting
      isDeleting = true;
    } else if (isDeleting && typingIndex === 0) {
      // Finished deleting, wait then start typing again
      typingSpeed = 500; // Wait 0.5 seconds before typing again
      isDeleting = false;
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing animation
  typeText();

  // Typing Animation for Multiple Sentences
  const sentences = [
    "100% SELF EDUCATED PROGRAMMER WITH FOUR YEARS OF EXPERIENCE.",
    "PASSIONATE ABOUT CREATING INNOVATIVE WEB SOLUTIONS.",
    "SPECIALIZED IN MODERN FRONTEND AND BACKEND TECHNOLOGIES.",
    "DEDICATED TO WRITING CLEAN AND EFFICIENT CODE.",
    "ALWAYS LEARNING AND IMPROVING MY SKILLS.",
  ];

  const typingSentencesElement = $(".typing-sentences-content");
  let currentSentenceIndex = 0;
  let sentenceTypingIndex = 0;
  let isDeletingSentence = false;
  let sentenceTypingSpeed = 50;

  function typeSentence() {
    const currentSentence = sentences[currentSentenceIndex];
    const currentText = typingSentencesElement.text();

    if (!isDeletingSentence && sentenceTypingIndex < currentSentence.length) {
      // Typing forward
      typingSentencesElement.text(
        currentSentence.substring(0, sentenceTypingIndex + 1)
      );
      sentenceTypingIndex++;
      sentenceTypingSpeed = 50; // Normal typing speed
    } else if (isDeletingSentence && sentenceTypingIndex > 0) {
      // Deleting backward
      typingSentencesElement.text(
        currentSentence.substring(0, sentenceTypingIndex - 1)
      );
      sentenceTypingIndex--;
      sentenceTypingSpeed = 30; // Faster deletion speed
    } else if (
      !isDeletingSentence &&
      sentenceTypingIndex === currentSentence.length
    ) {
      // Finished typing, wait then start deleting
      sentenceTypingSpeed = 3000; // Wait 3 seconds before deleting
      isDeletingSentence = true;
    } else if (isDeletingSentence && sentenceTypingIndex === 0) {
      // Finished deleting, move to next sentence
      currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
      sentenceTypingSpeed = 500; // Wait 0.5 seconds before typing next sentence
      isDeletingSentence = false;
    }

    setTimeout(typeSentence, sentenceTypingSpeed);
  }

  // Start sentences typing animation
  typeSentence();
});
