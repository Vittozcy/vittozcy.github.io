/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '1100px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}
})(jQuery);

// Display the first tab of each tab-container by default
document.querySelectorAll('.tab-container').forEach(container => {
    container.querySelector('.tab-link').click();
});

// Function to open a specific tab within its container
function openTab(evt, tabName, containerId) {
    var i, tabcontent, tablinks;
    
    // Find the parent container of the tabs and their content
    var container = document.getElementById(containerId);
    
    // Hide all tab contents within this container
    tabcontent = container.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove the "active" class from all tab links within this container
    tablinks = container.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Display the current tab and add "active" class to the link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    Prism.highlightAll(); // Reinitialize Prism.js after switching tabs
}

// Function to go back to the right index
function goBackToReferrer() {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const fromIndex = urlParams.get('from'); // Get the 'from' parameter from the URL

    if (fromIndex) {
        // Add #header to ensure it scrolls to the header section
        window.location.href = fromIndex + '#header';
    } else if (referrer.includes('index.html')) {
        window.location.href = 'index.html#header';
    } else if (referrer.includes('R_index.html')) {
        window.location.href = 'R_index.html#header';
    } else if (referrer.includes('Power_Bi_index.html')) {
        window.location.href = 'Power_Bi_index.html#header';
    } else if (referrer.includes('SQL_index.html')) {
        window.location.href = 'SQL_index.html#header';
    } else if (referrer.includes('Tableau_index.html')) {
        window.location.href = 'Tableau_index.html#header';
    } else {
        window.location.href = 'index.html#header'; // Fallback in case no referrer is found
    }
}

function setActiveNavItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromIndex = urlParams.get('from'); // Get the 'from' parameter from the URL
    const currentUrl = window.location.href; // Get the full current URL including the hash

    // Get the filename from the current URL (e.g., "index.html", "R_index.html", "About_me.html")
    const currentPage = currentUrl.split('/').pop().split('#')[0]; // Extracts the current page name without the hash

    // Remove 'active' class from all nav items
    document.querySelectorAll('.links li').forEach(item => item.classList.remove('active'));

    // Determine the active link based on 'from' parameter or current page
    if (fromIndex) {
        // If the 'from' parameter is present, use it to set the active class
        if (fromIndex === 'index.html') {
            document.getElementById('nav-python').classList.add('active');
        } else if (fromIndex === 'R_index.html') {
            document.getElementById('nav-r').classList.add('active');
        } else if (fromIndex === 'Power_Bi_index.html') {
            document.getElementById('nav-powerbi').classList.add('active');
        } else if (fromIndex === 'SQL_index.html') {
            document.getElementById('nav-sql').classList.add('active');
        } else if (fromIndex === 'Tableau_index.html') {
            document.getElementById('nav-tableau').classList.add('active');
        } else if (fromIndex === 'About_me.html') {
            document.getElementById('nav-about').classList.add('active');
        }
    } else {
        // If there's no 'from' parameter, check the current page name
        if (currentPage === 'index.html') {
            document.getElementById('nav-python').classList.add('active');
        } else if (currentPage === 'R_index.html') {
            document.getElementById('nav-r').classList.add('active');
        } else if (currentPage === 'Power_Bi_index.html') {
            document.getElementById('nav-powerbi').classList.add('active');
        } else if (currentPage === 'SQL_index.html') {
            document.getElementById('nav-sql').classList.add('active');
        } else if (currentPage === 'Tableau_index.html') {
            document.getElementById('nav-tableau').classList.add('active');
        } else if (currentPage === 'About_me.html') {
            document.getElementById('nav-about').classList.add('active');
        }
    }
}

// Call the function to set the active navigation item
setActiveNavItem();

