$(document).ready(function() {
	// HEADER BURGER
	$('.main-header__burger').click(function(event) {
		$('.main-header__burger, .main-header__menu').toggleClass('active');
		$('body').toggleClass('locked');
	});
	$('.content').click(function(event) {
		$('.main-header__burger, .main-header__menu').removeClass('active');
		$('body').removeClass('locked');
	});
	$(window).scroll(function() {
		const topHeader = document.querySelector('.top-header');
		let topHeaderHeight = topHeader.offsetHeight;
		var top = $(document).scrollTop();
		if (top < topHeaderHeight) {
			$(".main-header").removeClass('fixed');
		} else {
			$(".main-header").addClass('fixed');
		};
	});
	//Слайдеры
	$('.new-collection-slider').slick({
		arrows:false,
		dots:true,
		adaptiveHeight:false,
		slidesToShow:3,
		slidesToScroll:3,
		speed:1000,
		easing: 'ease',
		infinite:true,
		initialSlide:0,
		autoplay:false,
		autoplaySpeed:2000,
		pauseOnFocus:true,
		pauseOnHover:true,
		pauseOnDotsHover:false,
		draggable:true,
		swipe:true,
		touchThreshold:10,
		touchMove:false,
		waitForAnimate:false,
		centerMode:false,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow:2,
					slidesToScroll:2
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow:3,
					slidesToScroll:3
				}
			},{
				breakpoint: 610,
				settings: {
					slidesToShow:2,
					slidesToScroll:2
				}
			},{
				breakpoint: 470,
				settings: {
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		],
	});
	// Спойлер
	$('.footer__title').click(function(event) {
		$(this).toggleClass('active').nextAll().slideToggle(300);
	});
});


// Модальные окна
const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches (css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();


//Анимация
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(){
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
				animItem.classList.add('_active');
			}else{
				if(!animItem.classList.contains('_anim-no-hide'))
				animItem.classList.remove('_active');
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	animOnScroll();
}