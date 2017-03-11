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
    console.log('Searched for: '+search_term);
    console.log('Match found: '+match);
    navToResponse(match);
	});	
}

var navToStart = function() {
  var sections = document.querySelectorAll('section');
  var intro = document.querySelector('.intro');
  _.each(sections, function(section) {
    section.classList.remove('active');
  });
  intro.classList.add('active');
}

var navToResponse = function(result) {
  var response_section = document.querySelector('.response');
  var response_yes = document.querySelector('.response__yes');
  var response_no = document.querySelector('.response__no');
  var bodyRect;
  var responseRect;
  var scrollPoint = 0;
  response_section.classList.add('active');
  if (result === true) {
    response_yes.classList.add('active');
    response_no.classList.remove('active');
    console.log('Show yes');
  } else {
    response_no.classList.add('active');
    response_yes.classList.remove('active');
    console.log('Show no');
  }
  bodyRect = document.body.getBoundingClientRect();
  responseRect = response_section.getBoundingClientRect();
  scrollPoint = responseRect.top - bodyRect.top;
  console.log('Scroll to: '+responseRect.top);
  $('html,body').animate({scrollTop: scrollPoint}, 1000);
}