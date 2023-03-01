// gsap.registerPlugin(ScrollTrigger)

// gsap.to('.about_me', {
// 	x: 100,
// 	duration: 1,
// 	scrollTrigger: ".about_me", // start the animation when ".box" enters the viewport (once)
// })

// AOS.init();

$(document).ready(function () {
	
    var swiper = new Swiper(".mySwiper", {
		slidesPerView: 4,
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
	
	$(".card_title").click(function () {
		$(this).children('i').toggleClass('fa-plus')
		$(this).children('i').toggleClass('fa-minus')
		$('.card_title').removeClass("active")
		$(this).toggleClass("active")
		$('.card_drop_down_section').slideUp();
		$(this).next().slideToggle()
	})
	
	let my_work__s__title = document.getElementsByClassName("my_work__s__title");
	
	$('.my__work_info p').each(function () {
		$(this).html($(this).html().length > 25 ? $(this).html().substr(0, 25) + " ..." : $(this).html())
	})
	
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

	// const AutherImagesArray = ["./images/328846155_507202214881574_3942122195554899770_n.jpg", "./images/rtrewq.jpg"];
	// var count = 0;
	// setInterval(() => {
	// 	$("#auther_navbar_image_header").attr("src", AutherImagesArray[count])
	// 	count >= 1 ? count = 0 : count ++;
	// }, 1000);

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

});

