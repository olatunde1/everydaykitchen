function typing_animation() {
    let text_element = document.querySelector(".text");
    let text_array = text_element.innerHTML.split("");
    let text_array_slice = text_element.innerHTML.split(" ");
    let text_len = text_array.length;

    const word_len = text_array_slice.map((word) => {
        return word.length;
    })

    console.log(word_len);

    let timings = {
        easing: `steps(${Number(word_len[0] + 1)}, end)`,
        delay: 2000,
        duration: 2000,
        fill: 'forwards'
    }

    let cursor_timings = {
        duration: 700,
        iterations: Infinity,
        easing: 'cubic-bezier(0,.26,.44,.93)'
    }

    document.querySelector(".text_cursor").animate([
        {
            opacity: 0
        },
        {
            opacity: 0, offset: 0.7
        },
        {
            opacity: 1
        }
    ], cursor_timings);

    if (text_array_slice.length == 1) {
        timings.easing = `steps(${Number(word_len[0])}, end)`;

        let reveal_animation = document.querySelector(".text_hide").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0])}%` }
        ], timings);

        document.querySelector(".text_cursor").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0])}%` }
        ], timings);

        reveal_animation.onfinish = () => {
            setTimeout(() => {
                document.querySelector('.text_hide').animate([
                    {left: '0%'}
                ], {
                    duration: 2000,
                    easing: 'cubic-bezier(.73,0,.38,.88)'
                });
                document.querySelector('.text_cursor').animate([
                    {left: '0%'}
                ], {
                    duration: 2000,
                    easing: 'cubic-bezier(.73,0,.38,.88)'
                });
                typing_animation();
            }, 1000);
        }
    } else {
        document.querySelector(".text_hide").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
        ], timings);

        document.querySelector(".text_cursor").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
        ], timings);
    }


    for (let i = 1; i < text_array_slice.length; i++) {
        console.log(word_len);
        console.log(text_array_slice.length);
        const single_word_len = word_len[i];
        console.log(single_word_len);

        if (i == 1) {
            var left_instance = (100 / text_len) * (word_len[i - 1] + 1);
            console.log(left_instance);
        }

        let timings_2 = {
            easing: `steps(${Number(single_word_len + 1)}, end)`,
            delay: (2 * (i + 1) + (2 * i)) * (1000),
            // delay: ((i*2)-1)*1000,
            duration: 2000,
            fill: 'forwards'
        }

        if (i == (text_array_slice.length - 1)) {
            timings_2.easing = `steps(${Number(single_word_len)}, end)`;
            let reveal_animation = document.querySelector(".text_hide").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
            ], timings_2);

            document.querySelector(".text_cursor").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
            ], timings_2);

            reveal_animation.onfinish = () => {
                setTimeout(() => {
                    document.querySelector('.text_hide').animate([
                        {left: '0%'}
                    ], {
                        duration: 2000,
                        easing: 'cubic-bezier(.73,0,.38,.88)'
                    });
                    document.querySelector('.text_cursor').animate([
                        {left: '0%'}
                    ], {
                        duration: 2000,
                        easing: 'cubic-bezier(.73,0,.38,.88)'
                    });
                    typing_animation();
                }, 1000);
            }
        } else {
            document.querySelector(".text_hide").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
            ], timings_2);

            document.querySelector(".text_cursor").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
            ], timings_2);
        }

        left_instance = left_instance + ((100 / text_len) * (word_len[i] + 1));
    }
}
typing_animation();



(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	
	$('.input-group.date').datepicker({format: "dd.mm.yyyy"});
	

	$('.filters ul li').click(function(){
	  $('.filters ul li').removeClass('active');
	  $(this).addClass('active');
	  
	  var data = $(this).attr('data-filter');
	  $grid.isotope({
	    filter: data
	  })
	});

	var $grid = $(".grid").isotope({
	  itemSelector: ".all",
	  percentPosition: true,
	  masonry: {
	    columnWidth: ".all"
	  }
	})

	$(".Modern-Slider").slick({
	    autoplay:true,
	    autoplaySpeed:10000,
	    speed:600,
	    slidesToShow:1,
	    slidesToScroll:1,
	    pauseOnHover:false,
	    dots:true,
	    pauseOnDotsHover:true,
	    cssEase:'linear',
	   // fade:true,
	    draggable:false,
	    prevArrow:'<button class="PrevArrow"></button>',
	    nextArrow:'<button class="NextArrow"></button>', 
	  });

	$('.search-icon a').on("click", function(event) {
	    event.preventDefault();
	    $("#search").addClass("open");
	    $('#search > form > input[type="search"]').focus();
	  });

	  $("#search, #search button.close").on("click keyup", function(event) {
	    if (
	      event.target == this ||
	      event.target.className == "close" ||
	      event.keyCode == 27
	    ) {
	      $(this).removeClass("open");
	    }
	  });

	  $("#search-box").submit(function(event) {
	    event.preventDefault();
	    return false;
	  });


	$(function() {
        $("#tabs").tabs();
    });


	$('.owl-menu-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:5
			  }
		  }
	  })

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");
			
			$('.scroll-to-section a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');
		  
			var target = this.hash,
			menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) - 79
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
	        
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);