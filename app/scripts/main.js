if (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') {
	window.console.log('Crafted and created by Storyblok. Visit www.storyblok.com');
} else {
	window.console = {};
	window.console.log = window.console.error = function() {};
}