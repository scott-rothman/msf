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
  var modal_openers = document.querySelectorAll('.modal-open');
  var modal_closers = document.querySelectorAll('.modal-close')
  var intro_text = document.querySelector('.intro__wrapper');
  var end_button = document.querySelector('.end');
  var name_holder = document.querySelector('#name');
  var email_holder = document.querySelector('#email');
  var back_to_top = document.querySelector('.btt');
  var window_height = $(window).height();
  var header_height = $('header').height();
  var intro_height = window_height - 100;
  var matches;
  var match = '';
  var possible_matches = '';
  var $possible_matches;
  window.msf = [];
  intro.style.height = intro_height+'px';

  match_holder.addEventListener('click', function(e) {
    if (e.target.classList.contains('match')) {
      match = e.target.textContent;
      navToResponse(true, match);
      window.msf.match = match;
      var message = 'To Whom it May Concern,\r\rI am invested in '+ window.msf.match + ' and it has come to my attention that GlaxoSmithKline and Pfizer are included in the investment portfolio. I am aligned with the goals of AFAIRSHOT.ORG and want to see both companies reduce the price of the life-saving pneumonia vaccine to $5 per child in crisis-affected populations and for all developing countries.\r\rAs you hold my voting authority for these companies through my investment in your fund, I want you to represent my interests at the upcoming annual shareholder meetings for both companies.\r\rPlease confirm you’ve received this email and the steps you will take to have our voices heard at the shareholder meetings.\r\rSincerely,';
      $('#message').html(message);
      window.setTimeout(function() {
        form.classList.remove('active');
        intro_text.classList.remove('hidden');
        $('.intro__form__results').html('');
        search_field.value = '';  
      }, 1000);
      
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    navToResponse(false);
  });
  search_field.addEventListener('click', function(e) {
    form.classList.add('active');
    intro_text.classList.add('hidden');
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
  end_button.addEventListener('click', function(e) {
    e.preventDefault();
    navToEnd();
  });
  back_to_top.addEventListener('click', function(e) {
    e.preventDefault();
    navToStart();
  })
  name_holder.addEventListener('blur', function() {
    var name = document.querySelector('#name').value;
    var message = 'To Whom it May Concern,\r\rI am invested in '+ window.msf.match + ' and it has come to my attention that GlaxoSmithKline and Pfizer are included in the investment portfolio. I am aligned with the goals of AFAIRSHOT.ORG and want to see both companies reduce the price of the life-saving pneumonia vaccine to $5 per child in crisis-affected populations and for all developing countries.\r\rAs you hold my voting authority for these companies through my investment in your fund, I want you to represent my interests at the upcoming annual shareholder meetings for both companies.\r\rPlease confirm you’ve received this email and the steps you will take to have our voices heard at the shareholder meetings.\r\rSincerely, \r'+name;
    $('#message').html(message);
  });
  _.each(modal_openers, function(modal_opener) {
    modal_opener.addEventListener('click', function(e) {
      e.target.classList.add('checked')
      var modal_to_open = '.modal-'+e.target.dataset.modal;
      document.querySelector('.modal-wrapper').classList.add('active');
      document.querySelector(modal_to_open).classList.add('active');  
    }); 
  });
  _.each(modal_closers, function(modal_closer) {
    modal_closer.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.modal.active').classList.add('hidden');
      document.querySelector('.success').classList.add('active');
      window.setTimeout(function() {
        document.querySelector('.modal.active').classList.remove('active');
      },500)
      window.setTimeout(function() {
        document.querySelector('.success').classList.remove('active');
        document.querySelector('.modal-wrapper').classList.remove('active');
      },2000)
    })
  })
  window.addEventListener('click', function(e) {
    if(e.target.classList.contains('modal-wrapper')) {
      document.querySelector('.success').classList.remove('active');
      document.querySelector('.modal-wrapper').classList.remove('active');
      document.querySelector('.modal.active').classList.remove('active');
    }
    if(e.target.tagName.toLowerCase() === 'body') {
      form.classList.remove('active');
      intro_text.classList.remove('hidden');
    }
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
  $('html,body').animate({scrollTop: 0}, 1000);
  window.setTimeout(function() {
    var sections = document.querySelectorAll('section');
    var intro = document.querySelector('.intro');
    _.each(sections, function(section) {
      section.classList.remove('active');
    });
    intro.classList.add('active');
  }, 1000);
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

var navToEnd = function() {
  var end_section = document.querySelector('.conclusion');
  end_section.classList.add('active');
  var bodyRect = document.body.getBoundingClientRect();
  var conclusionRect = end_section.getBoundingClientRect();
  var scrollPoint = conclusionRect.top - bodyRect.top;
  $('html,body').animate({scrollTop: scrollPoint}, 1000); 
}