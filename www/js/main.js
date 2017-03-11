window.onload = function() {
	init();
}


var init = function() {
	var form = document.querySelector('.intro__form');
	var search_field = document.querySelector('.intro__form__term');
  var header = document.querySelector('header');
  var body = document.querySelector('body');
  var intro = document.querySelector('.intro');
  var match_holder = document.querySelector('.intro__form__results');
  var window_height = $(window).height();
  var header_height = $('header').height();
  var intro_height = window_height - 100;
  var matches;
  var match = '';
  var possible_matches = '';
  var $possible_matches;
  intro.style.height = intro_height+'px';

  match_holder.addEventListener('click', function(e) {
    if (e.target.classList.contains('match')) {
      match = e.target.textContent;
      navToResponse(true, match);
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    navToResponse(false);
  });
	search_field.addEventListener('keypress', function(e) {
    possible_matches = '';
		search_term = search_field.value.toLowerCase();
    matches = search_holders(search_term);
    matches = _.uniqBy(matches);
    if (search_term.length > 3) {
      _.each(matches, function(value) {
        possible_matches += '<div class="match">'+value+'</div>';
      })
    } else {
      $('.intro__form__results').html('');
    }
    $possible_matches = $(possible_matches);
    $('.intro__form__results').html($possible_matches);
    // console.log('Match found: '+matches);
    //
	});
  window.addEventListener('scroll', _.throttle(function() {
    if ($(window).scrollTop() > 120) {
      body.classList.add('fixed-nav');
    } else {
      body.classList.remove('fixed-nav');
    }
  }, 50));
}

var navToStart = function() {
  var sections = document.querySelectorAll('section');
  var intro = document.querySelector('.intro');
  _.each(sections, function(section) {
    section.classList.remove('active');
  });
  intro.classList.add('active');
}

var navToResponse = function(result, match) {
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