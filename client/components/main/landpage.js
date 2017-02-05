Template.landpage.onRendered(() => {
	/* const i18nTag = navigator.language;
	 if (i18nTag) {
	   T9n.setLanguage(i18nTagToT9n(i18nTag));
	 }
	 EscapeActions.executeAll();*/
	$.getScript('assets/js/particles.min.js', function() {});
	var LandingMenu = function() {
		//navigation toggle
		var menuToggle = $('[data-spartug-menu="toggle"]');
		var menu = $('[data-spartug-menu="navigation"]');
		menuToggle.click(function() {
			menu.toggleClass("active");
		});
		$(".SpartugLanding-wrapper--header---menu----btn.diferent").click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			$(".SpartugLanding-wrapper--header---menu----btn.diferent").toggleClass("is-active--menu");
			$(".SpartugLanding-wrapper--header---menu----btn.diferent").toggleClass("is-active--up");
		});
	}
	LandingMenu();
	var btnFeedback = function() {
		setTimeout(function() {
			$(".SpartugLanding-btn--Feedback").addClass("effect-animation");
		}, 1000);
		setTimeout(function() {
			$(".SpartugLanding-btn--Feedback").removeClass("effect-animation");
		}, 2000);
	}
	btnFeedback();
	var scrollLandingInfo = function() {
		$(window).scroll(function() {
			var scrollHeader = {
				winTop: $(window).scrollTop(),
				size: 45
			}
			if (scrollHeader.winTop >= scrollHeader.size) {
				$(".SpartugLanding-Info--header").addClass("sticky");
				$(".SpartugLanding-Info--btn.signin").addClass("sticky");
				$(".SpartugLanding-Info--header .SpartugLanding-Info--header---Navmenu").addClass("sticky");
			} else {
				$(".SpartugLanding-Info--header").removeClass("sticky");
				$(".SpartugLanding-Info--btn.signin").removeClass("sticky");
			}
		});
	};
	scrollLandingInfo();
	$(".SpartugLanding-Info--header---ToggleMenu").on("click", function(a) {
		a.preventDefault();
		$(this).closest("header").find(".SpartugLanding-Info--header---Navmenu").toggleClass("expanded");
	});
	var LandingMenus = function() {
		$(".SpartugLanding-Info--header---ToggleMenu").click(function(event) {
			event.preventDefault();
			event.stopPropagation();
			$(".SpartugLanding-Info--header---ToggleMenu").toggleClass("is-active--up");
		});
	}
	LandingMenus();
	alert("ssss");
	particlesJS("SpartugLanding-principallogo--WithParticles", {
		"particles": {
			"number": {
				"value": 85,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				}
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3.5,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 5,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "grab"
				},
				"onclick": {
					"enable": false,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 140,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
	var RandomEntities = function(values) {
		var entities = values;
		var number = 0;
		setInterval(function() {
			$(".SpartugLanding-text--RandomEntities").html("<span class='icon-shield2'></span>" + " " + entities[number]);
			if (number == (entities.length - 1)) {
				number = 0;
			} else {
				number++;
			}
		}, 1900);
	};
	RandomEntities(["Organizaciones", "Bancos", "Gobiernos"]);
	// form validations
	var ValidateRegister = function() {
		var alertClass = ".logErrorSession-Register";
		var name = $('#name').val();
		var surname = $('#surname').val();
		var username = $('#username').val();
		var password = $("#password").val();
		var emailid = $("#email").val();
		var atpos = emailid.indexOf("@");
		var dotpos = emailid.lastIndexOf(".");
		if (name == null || name == "") {
			$(alertClass).addClass("error").html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info-circle\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar nombre</p></div></div>");
			$("#name").addClass("focusAlert").focus();
			return false;
		}
		if (name.length < 3) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info-circle\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar mínimo 3 caracteres</p></div></div>");
			$("#name").addClass("focusAlert").focus();
			return false;
		}
		if (surname == null || surname == "") {
			$(alertClass).addClass("error").html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info-circle\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar apellido</p></div></div>");
			$("#surname").addClass("focusAlert").focus();
			return false;
		}
		if (surname.length < 3) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info-circle\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar mínimo 3 caracteres</p></div></div>");
			$("#surname").addClass("focusAlert").focus();
			return false;
		}
		if (username == null || username == "") {
			$(alertClass).addClass("error").html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-user2\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>No has ingresado nombre de usuario</p></div></div>");
			$("#username").addClass("focusAlert").focus();
			return false;
		}
		if (username.length < 2) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-user2\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Nombre de usuario mínimo 2 caracteres</p></div></div>");
			$("#username").addClass("focusAlert").focus();
			return false;
		}
		if (emailid == null || emailid == "") {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu correo electrónico</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailid.length) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>El correo electrónico es incorrecto</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (password == null || password == '') {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-lock\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu contraseña</p></div></div>");
			$('#password').addClass("focusAlert").focus();
			return false;
		}
		if (password.length < 5) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-lock\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar más de 5 caracteres</p></div></div>");
			$('#password').addClass("focusAlert").focus();
			return false;
		}
	}
	var ValidateLogin = function() {
		var alertClass = ".logErrorSession-Login";
		var password = $("#password").val();
		var emailid = $("#email").val();
		var atpos = emailid.indexOf("@");
		var dotpos = emailid.lastIndexOf(".");
		if (emailid == null || emailid == "") {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu correo electrónico</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailid.length) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>El correo electrónico es incorrecto</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (password == null || password == '') {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-lock\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu contraseña</p></div></div>");
			$('#password').addClass("focusAlert").focus();
			return false;
		}
		if (password.length < 5) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-lock\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar más de 5 caracteres</p></div></div>");
			$('#password').addClass("focusAlert").focus();
			return false;
		}
	}
	var ValidateRecover = function() {
		var alertClass = ".logErrorSession-Recover";
		var emailid = $("#email").val();
		var atpos = emailid.indexOf("@");
		var dotpos = emailid.lastIndexOf(".");
		if (emailid == null || emailid == "") {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu correo electrónico</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailid.length) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>El correo electrónico es incorrecto</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
	}
	var ValidateFeedback = function() {
		var alertClass = ".logErrorSession-Feedback";
		var feedback = $("#feedback").val();
		var emailid = $("#email").val();
		var atpos = emailid.indexOf("@");
		var dotpos = emailid.lastIndexOf(".");
		if (emailid == null || emailid == "") {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu correo electrónico</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailid.length) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-envelope\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>El correo electrónico es incorrecto</p></div></div>");
			$('#email').addClass("focusAlert").focus();
			return false;
		}
		if (feedback == null || feedback == "") {
			$(alertClass).addClass("error").html("<div class=\"SpartugLanding-sessionAlert feedback\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar tu opinión</p></div></div>");
			$("#feedback").addClass("focusAlertFeedback").focus();
			return false;
		}
		if (feedback.length < 8) {
			$(alertClass).addClass('error').html("<div class=\"SpartugLanding-sessionAlert feedback\"><div class=\"SpartugLanding-sessionAlert--icon\"><i class=\"icon-info\"></i></div><div class=\"SpartugLanding-sessionAlert--text\"><p>Ingresar mínimo 8 caracteres</p></div></div>");
			$("#feedback").addClass("focusAlertFeedback").focus();
			return false;
		}
	};
	var NameProgram = function(id1, id2) {
		$("#" + id1).keyup(function() {
			var nameProgramRegister = $(this).val();
			$("#" + id2).val(nameProgramRegister);
		});
	};
	NameProgram("insertNameProgram", "reflectNameProgram");
});
Template.landpage.helpers({
	languages() {
		return _.map(TAPi18n.getLanguages(), (lang, tag) => {
			const name = lang.name;
			return {
				tag,
				name
			};
		});
	},
	isCurrentLanguage() {
		const t9nTag = i18nTagToT9n(this.tag);
		const curLang = T9n.getLanguage() || 'en';
		return t9nTag === curLang;
	},
});

import './login/atForm.html';
Template.atTextInput2.replaces("atTextInput");
Template.atSigninLink2.replaces("atSigninLink");
Template.atSignupLink2.replaces("atSignupLink");
Template.atPwdLink2.replaces("atPwdLink");
Template.atForm2.replaces("atForm");
Template.atTitle2.replaces("atTitle");
Template.atPwdFormBtn2.replaces("atPwdFormBtn");
Template.atError2.replaces("atError");
Template.landpage.events({
	'click .modala': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#signin'));
			$('.error').remove()
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .modalb': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			alert("ssss");
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#signup'));
			$('#at-field-program').val("1337");
			$('#at-field-program').hide();
			$('.error').remove()
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .modalc': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#program'));
			$('.error').remove()
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .modald': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#information'));
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .modale': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#information'));
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .modalf': (e) => {
		e.preventDefault();
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		setTimeout(function() {
			$('.SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box').html($('#program'));
			$('.SpartugLanding-box-regsession--Overlay').fadeIn(390);
			$(".SpartugLanding-box-regsession--Overlay---Modal .SpartugLanding-box-regsession--Overlay---Modal----box input:first").select();
			$('.SpartugLanding-box-regsession--Overlay---Modal').addClass('active');
		}, 120);
	},
	'click .SpartugLanding-box-regsession--Overlay---Modal----close': (e) => {
		$('.SpartugLanding-box-regsession--Overlay---Modal').removeClass('active');
		$('.SpartugLanding-box-regsession--Overlay').fadeOut(390);
	},
	'ol': function(event) {
		event.preventDefault();
		return false;
		alert("xxxx");
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
	}
});
Template.landpage.onRendered(function() {});