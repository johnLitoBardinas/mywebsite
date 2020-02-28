/**
 * Ow!! you came here..
 */

function Profile() {

	// Instance Member.
	var fullName = 'John Lito Bardinas';
	var firstName = 'John Lito';
	var lastName = 'Bardinas';
	var dateOfBith = new Date('December 15, 1996');
	var nonProYear = new Date('May 1, 2016');
	var proYear = new Date('August 18, 2017');
	var title = 'Full Stack Web Developer';
	var fromLocation = 'Philippines';
	var availability = 'Weekends Only';

	/**
	 * Return the computed date
	 * @return Computed Age.
	 */
	this.computeAge = function () {
		var diff_ms = Date.now() - dateOfBith.getTime();
		var age_dt = new Date(diff_ms);
		return Math.abs(age_dt.getUTCFullYear() - 1970);
	}

	/**
	 * Return the computed Working Years.
	 * @param {boolean} isProfessionalYear Determine if Professional Year.
	 * @return COmputed Year.
	 */
	this.computeWorkingYear = function (isProfessionalYear) {
		if (isProfessionalYear) {
			return Math.abs(new Date().getFullYear() - proYear.getFullYear());
		}

		return Math.abs(new Date().getFullYear() - nonProYear.getFullYear());

	}

	// Define readonly properties.
	Object.defineProperties(this, {
		fullName: {
			value: fullName,
			writable: false
		},
		'firstName': {
			value: firstName,
			writtable: false
		},
		'lastName': {
			value: lastName,
			writtable: false
		},
		'title': {
			value: title,
			writable: false
		},
		'fromLocation': {
			value: fromLocation,
			writable: false
		},
		'availability': {
			value: availability,
			writable: false
		}
	});

}

$(function() {
    "use strict";
    var t = $(window);
    $.scrollIt({
        upKey: 38,
        downKey: 40,
        easing: "swing",
        scrollTime: 600,
        activeClass: "active",
        onPageChange: null,
        topOffset: -80
    }), $(".navbar-nav .nav-link").on("click", function() {
        $(".navbar-collapse.show").removeClass("show")
    }), t.on("scroll", function() {
        var o = t.scrollTop(),
            a = $(".navbar"),
            e = $(".navbar .logo> img");
        o > 100 ? (a.addClass("nav-scroll"), e.attr("src", "img/logo-dark.png")) : (a.removeClass("nav-scroll"), e.attr("src", "img/logo-light.png"))
    }), t.on("scroll", function() {
        var t = $(".button-top");
        $(this).scrollTop() >= 700 ? t.show() : t.hide()
    }), t.on("scroll", function() {
        $(".skill-progress span").each(function() {
            var t = $(this).offset().top + $(this).outerHeight(),
                o = $(window).scrollTop() + $(window).height(),
                a = $(this).attr("data-value");
            o > t && $(this).css({
                width: a
            })
        })
    }), $(".counter .number").counterUp({
        delay: 10,
        time: 1500
    }), $(".testimonials .owl-carousel").owlCarousel({
        items: 1,
        loop: !0,
        mouseDrag: !1,
        autoplay: !0,
        smartSpeed: 500
    }), $(".portfolio .gallery").magnificPopup({
        delegate: ".popup-img",
        type: "image",
        gallery: {
            enabled: !0
        }
    })
}), $(window).on("load", function() {
    $(".loading").fadeOut(500);
    var t = $(".gallery").isotope({
        itemSelector: ".item"
    });
    $(".filtering").on("click", "span", function() {
        var o = $(this).attr("data-filter");
        t.isotope({
            filter: o
        })
    }), $(".filtering").on("click", "span", function() {
        $(this).addClass("active").siblings().removeClass("active")
    }), $("#contact-form").validator(), $("#contact-form").on("submit", function(t) {
        t.preventDefault();
        var mailChimpUrl = "https://gmail.us4.list-manage.com/subscribe/post-json?u=e58db76ac26ac0e4e9a86e3f0&amp;id=0774267233";
        var $name = $(this).find('#name');
        var $email = $(this).find('#email');
        var $message = $(this).find('#message');


        if (!$name.val() || !$email.val() || !$message.val()) {
            $(this).addClass('invalid');
            return;
        }

        $.ajax({
            url: mailChimpUrl + '&c=?',
            data: $(this).serialize(),
            dataType: 'jsonp',
            success: function(res, status) {

                if (res.result != 'success') {
                    $(".message")
                        .removeClass('d-none alert-success')
                        .addClass('alert-danger')
                        .text('This email is invalid. Please enter a different email address.');
                } else {
                    $(".message")
                        .removeClass('d-none alert-danger')
                        .addClass('alert-success')
                        .text('Thank you for contacting me..');
                    $("#contact-form")[0].reset();
                }

                setTimeout(function () {
                    $(".message").addClass('d-none').removeClass('alert-success alert-danger').text('');
                }, 5000);

            }
        });

    })

    var johnLito = new Profile();
	$('#full-name').text(johnLito.firstName);
	$('#age').text(johnLito.computeAge() + ' years old');
	$('#title').text(johnLito.title);
	$('#from').text(johnLito.fromLocation);
	$('#exp_prof').text(johnLito.computeWorkingYear(true) + ' Years');
	$('#exp_nonprof').text(johnLito.computeWorkingYear() + ' Years');
});