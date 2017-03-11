window.onload = function() {
	init();
}


var init = function() {
	var form = document.querySelector('.intro__form');
	var search_field = document.querySelector('.intro__form__term')

	form.addEventListener('submit', function() {
		search_term = search_field.value.toLowerCase;

	});	
}
