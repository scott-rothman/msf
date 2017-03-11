window.onload = function() {
	init();
}


var init = function() {
	var form = document.querySelector('.intro__form');
	var search_field = document.querySelector('.intro__form__term')
  var match = false;
	form.addEventListener('submit', function(e) {
    e.preventDefault();
		search_term = search_field.value.toLowerCase();
    match = search_holders(search_term);
    console.log('Searched for:'+search_term);
    console.log(match);
	});	
}
