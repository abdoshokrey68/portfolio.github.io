$(document).ready(function () {

    var swiper = new Swiper(".mySwiper", {
		slidesPerView: 4,
		breakpoints: {  
			'1000': {
				slidesPerView: 5,
				spaceBetween: 40,
			},
			'800': {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			'480': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'300': {
				slidesPerView: 1,
				spaceBetween: 20,
			},
		},
		spaceBetween: 30,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		// loop:true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
	});
	
	// Handle Card Title Slide Down 
	$(".card_title").click(function () {
		let check = 0;
		$(this).hasClass("active") ? check++ : false;
		$('.card_title').removeClass("active")
		$('.card_title i').removeClass("fa-minus")
		$('.card_title i').addClass("fa-plus")
		$('.card_drop_down_section').slideUp();
		if (check === 0)
		{
			$(this).children('i').toggleClass('fa-plus')
			$(this).children('i').toggleClass('fa-minus')
			$(this).toggleClass("active")
			$(this).next().slideToggle()
		}
	})
	
	// Handle Show Projects Name Less Than 25 Letters
	let my_work__s__title = document.getElementsByClassName("my_work__s__title");
	$('.my__work_info h6').each(function () {
		$(this).html($(this).html().length > 25 ? $(this).html().substr(0, 25) + " ..." : $(this).html())
	})
	

	// My Work Experiance Section
	var my__works_count_show = 2;
	const HandleshowMySingleProject  = function (count) {
		const single_pro_container = $('.single_pro_container');
		for (let i = 0; i < single_pro_container.length; i++) {
			if (i > count -1)
			{
				$(`.single_pro_container:eq(${i})`).slideUp()
			} else {
				$(`.single_pro_container:eq(${i})`).slideDown()
			}
		}
	}
	HandleshowMySingleProject(my__works_count_show)


	$("#btn_show_more_projects").on("click", function () {
		my__works_count_show  = my__works_count_show + 2
		HandleshowMySingleProject(my__works_count_show)
	}) 

	$(".navbar_link").on("click", function () {
		$(".navbar_link").removeClass("active");
		$(this).toggleClass("active")
	})
	
	// Set Copyright Year
	let date = new Date(); 
	$('.this_year').html(date.getFullYear())

	$(".navbar_button_open button").on("click", function () {
		$(".navbar_button_open").slideUp(200)
		$(".lef-navbar").slideToggle(400)
	})

	$(".navbar_button_close button").on("click", function () {
		$(".lef-navbar").slideToggle(300)
		$(".navbar_button_open").delay(400).slideDown(300)
	})

	$(".hire_me_btn").on("click", function () {
		$(".hire_me_popup_container").toggleClass("d-none")
	})
	$(".close_hire_me_popup").on("click", function () {
		$(".hire_me_popup_container").toggleClass("d-none")
	})

	$(window).on('scroll', function () {
		$(".main_content_containers").each(function () {
			let element = document.getElementById(this.id);
			let scrollY = window.scrollY
			let offset = element.offsetTop;
			let element_height = element.offsetHeight
			if (scrollY + 300 >= offset && scrollY + 300< offset + element_height)
			{
				$(".navbar_link").removeClass("active")
				$("#" + this.id + "_link").addClass("active")
			}
		})
	})

	const ChangePortfolioTheme = function (class_value) {
		$("body").toggleClass(class_value)
		$(".main_paragraph").toggleClass(class_value)
		$(".lef-navbar").delay(200).toggleClass(class_value)
		$(".theme_scale_container").toggleClass(class_value)
		$(this).toggleClass(class_value)
		$(".toggle_light").toggleClass('text-light')
		$(".change__mode_container i").delay(300).toggleClass("fa-sun fa-moon")
		$(".change__mode_container i").toggleClass(class_value)
	}

	// Change Theme Mode 
	$(".change__mode_container").on("click", function () {
		$('body').hasClass('theme') || $('body').hasClass('default_dark') ? localStorage.setItem("theme", "light") : localStorage.setItem('theme', 'dark') ;
		if ($('body').hasClass("default_dark")) 
		{		
			$('.default_dark').toggleClass('default_dark')
			$(".toggle_light").toggleClass('text-light')
			$(".change__mode_container i").delay(300).toggleClass("fa-sun fa-moon")
		} else {
			ChangePortfolioTheme('theme')
		}

	})

	const CheckIfThemeIsSavedInLocalStorage = function () {
		if(localStorage.getItem("theme"))
		{
			if (localStorage.getItem('theme') === "dark")
			{
				ChangePortfolioTheme('default_dark')
			}
		} else {
			localStorage.setItem('theme', 'light');
		}
	}

	CheckIfThemeIsSavedInLocalStorage()
});

