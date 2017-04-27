window.onload = function() {
	init();
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '419745495028974',
  //     xfbml      : true,
  //     version    : 'v2.8'
  //   });
  //   FB.AppEvents.logPageView();
  // };

  // (function(d, s, id){
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  //   function sendMessage(msg) {
  //     FB.login(function(){
  //     // Note: The call will only work if you accept the permission request
  //     FB.api('/me/feed', 'post', {message: msg});
  //   }, {scope: 'publish_actions'});
  // }
  // var facebook_share = document.querySelector('.facebook-share');
  // facebook_share.addEventListener('click', function() {
  //   sendMessage('I want to ensure orgs like MSF can afford lifesaving drugs for children. Check to see if your money is in Big Pharma at AFAIRSHOT.ORG');
  // })
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
  var facebook_share = document.querySelector('.facebook-share');
  var back_to_top = document.querySelector('.btt');
  var window_height = $(window).height();
  var header_height = $('header').height();
  var intro_height = window_height - 100;
  var matches;
  var match = '';
  var possible_matches = '';
  var $possible_matches;
  window.msf = [];
  // intro.style.height = intro_height+'px'; // stopped intro height from being set in absolute pixels

  match_holder.addEventListener('click', function(e) {
    if (e.target.classList.contains('match')) {
      match = e.target.textContent;
      matches_pfe = search_match_pfe(match);
      matches_gsk = search_match_gsk(match);
      matches_all = search_match_all(match);
      matches_pfe = _.uniqBy(matches_pfe);
      matches_gsk = _.uniqBy(matches_gsk);
      let companyString = '';
      let twitterCompanyString = '';
      if (matches_pfe.length >= 1 && matches_gsk.length >= 1) {
        navToResponse('both', match);
        companyString = 'GlaxoSmithKline and Pfizer';
        twitterCompanyString = '$PFE $GSK are';
      } else if (matches_pfe.length >= 1) {
        navToResponse('pfe', match);
        companyString = 'Pfizer';
        twitterCompanyString = '$PFE is';
      } else if (matches_gsk.length >= 1) {
        companyString = 'GlaxoSmithKline';
        twitterCompanyString = '$GSK is';
        navToResponse('gsk', match);
      } else if (matches_all.length >= 1) {
        navToResponse('neither', match);
      } else {
        navToResponse(false, match); 
      }
      let twitterURL = '';
      let mailInfo = search_contact(match);
      // let displayMatch = match.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
      // if (displayMatch.includesd('Ishare')) {
      //   displayMatch.replace(/Ishare/g, 'iShare');
      // }
      let message = 'To Whom it May Concern,<br><br>I am invested in '+ match + ' and it has come to my attention that '+ companyString +' are included in the investment portfolio. I am aligned with the goals of AFAIRSHOT.ORG and want to see both companies reduce the price of the life-saving pneumonia vaccine to $5 per child in crisis-affected populations and for all developing countries.<br><br>As you hold my voting authority for these companies through my investment in your fund, I want you to represent my interests at the upcoming annual shareholder meetings for both companies.<br><br>Please confirm you’ve received this email and the steps you will take to have our voices heard at the shareholder meetings.<br><br>Sincerely,<br>';
      let linkMessage = 'To Whom it May Concern,%0D%0A%0D%0AI am invested in '+ match + ' and it has come to my attention that '+ companyString +' are included in the investment portfolio. I am aligned with the goals of AFAIRSHOT.ORG and want to see both companies reduce the price of the life-saving pneumonia vaccine to $5 per child in crisis-affected populations and for all developing countries.%0D%0A%0D%0AAs you hold my voting authority for these companies through my investment in your fund, I want you to represent my interests at the upcoming annual shareholder meetings for both companies.%0D%0A%0D%0APlease confirm you’ve received this email and the steps you will take to have our voices heard at the shareholder meetings.%0D%0A%0D%0ASincerely,%0D%0A';
      //let linkMessage = message.replace(/<br><br>/g, '\r\r');
      let managerEmailLink =  'mailto:'+mailInfo.email+'?subject=My Investments RE: GSK and PFE&body='+linkMessage;
      if (typeof mailInfo.url !== 'undefined' && mailInfo.url.length > 0) {
        managerEmailLink = mailInfo.url;
      } 
      if (typeof mailInfo.twitter !== 'undefined' && mailInfo.twitter.length > 0) {
        twitterURL = 'https://twitter.com/?status=hey ' + mailInfo.twitter + ' TIL that ' + twitterCompanyString + ' in my fund. Can you help ask the companies to lower price of pneumonia vaccine? #askpharma'
        $('.fm-twitter-link').attr('href', twitterURL);
      } else {
        $('.fm-twitter-link').css('display', 'none');
      }
      $('.email-fund').attr('href', managerEmailLink);
      $('.intro__form__results').html(''); // close fund autocomplete sooner 
      window.setTimeout(function() {
        form.classList.remove('active');
        intro_text.classList.remove('hidden_text');        
        search_field.value = '';  
      }, 1000);
      
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
      match = search_field.value;
      matches_pfe = search_match_pfe(match);
      matches_gsk = search_match_gsk(match);
      matches_all = search_match_all(match);
      matches_pfe = _.uniqBy(matches_pfe);
      matches_gsk = _.uniqBy(matches_gsk);
      if (match.length === 0) {
        navToResponse(false, match);
      } else if (matches_pfe.length >= 1 && matches_gsk.length >= 1) {
        navToResponse('both', match);  
      } else if (matches_pfe.length >= 1) {
        navToResponse('pfe', match);
      } else if (matches_gsk.length >= 1) {
        navToResponse('gsk', match);
      } else if (matches_all.length >= 1) {
        navToResponse('neither', match);
      } else {
        navToResponse(false, match); 
      }
      search_data = search_contact(match);
      
      // $('#message').html(message);
      window.setTimeout(function() {
        form.classList.remove('active');
        intro_text.classList.remove('hidden_text');
        $('.intro__form__results').html('');
        search_field.value = '';  
      }, 1000);
  });
  // search_field.addEventListener('click', function(e) {
  //   form.classList.add('active');
  //   intro_text.classList.add('hidden_text');
  // });
	search_field.addEventListener('keyup', function(e) {
    possible_matches = '';
		search_term = search_field.value.toLowerCase();
    matches = search_holders(search_term);
    matches = _.uniqBy(matches);
    if (search_term.length >= 3) {
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
      if (e.target.dataset.block !== '1') {
        //document.querySelector('.success').classList.add('active');
        window.setTimeout(function() {
          document.querySelector('.modal.active').classList.remove('active');
          document.querySelector('.modal-wrapper').classList.remove('active');
        },500)
        
      } else {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.modal-wrapper').classList.remove('active');
      }  
    })
  })
  
  window.addEventListener('click', function(e) {
    if(e.target.classList.contains('modal-wrapper')) {
      //document.querySelector('.success').classList.remove('active');
      document.querySelector('.modal-wrapper').classList.remove('active');
      document.querySelector('.modal.active').classList.remove('active');
    }
    if(e.target.tagName.toLowerCase() === 'body') {
      form.classList.remove('active');
      intro_text.classList.remove('hidden_text');
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
  var response_both = document.querySelector('.response__both');
  var response_gsk = document.querySelector('.response__gsk');
  var response_pfe = document.querySelector('.response__pfe');
  var response_no = document.querySelector('.response__no');
  var response_unknown = document.querySelector('.response__unknown');
  var response_containers = document.querySelectorAll('.response > div');
  var bodyRect;
  var responseRect;
  var scrollPoint = 0;
  _.each(response_containers, function(response){
    response.classList.remove('active');
  })
  response_section.classList.add('active');
  
    if (result === 'both') {
      response_both.classList.add('active');
    } else if (result === 'gsk') {
      response_gsk.classList.add('active');  
    } else if (result === 'pfe') {
      response_pfe.classList.add('active');  
    } else if (result === 'neither') {
      response_no.classList.add('active');  
    } else {
      response_unknown.classList.add('active');
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

/*
  Firebase Counter 
*/

var fb_config = {
  apiKey: "AIzaSyBJnXVLoPPAUij3-BVdaQ6nKpUFJBWrlYQ",
  authDomain: "pfff-ff5dd.firebaseapp.com",
  databaseURL: "https://pfff-ff5dd.firebaseio.com",
  projectId: "pfff-ff5dd",
  storageBucket: "pfff-ff5dd.appspot.com",
  messagingSenderId: "707383012898"
};
firebase.initializeApp(fb_config);

// Get a reference to the database service
var database = firebase.database();
// 
var emailCount = database.ref('count-emails');
var tweetCount = database.ref('count-tweets');

// bind html value to firebase value 
emailCount.on('value', function(snapshot) {
  $('.count--emails').html(snapshot.val())
});
tweetCount.on('value', function(snapshot){
  $('.count--tweets').html(snapshot.val())
})

// counter increment functions
var updateEmailCount = function(){
  emailCount.transaction(function(count){
    if (count){count = count + 1;}
  return count;
  })
}
var updateTweetCount = function(){
  tweetCount.transaction(function(count){
    if (count){ count = count + 1;}
  return count
  })
}
// bind action to update function
$('.tweet-link').on('click', updateTweetCount);
$('.email-fm-link').on('click', updateEmailCount);
