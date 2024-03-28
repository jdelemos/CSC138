//working as of October 13rd, 2017
//This script changes the terms and conditions page in Canvas to
//include a second checkbox. It will not allow
//the user to click submit unless both boxes are checked.

//Change These variables
let terms = "https://calstate.policystat.com/policy/6607908/latest/"; //insert URL to your terms here
let privacy = "https://www.csus.edu/information-resources-technology/information-security/_internal/_documents/csu-privacy-notice-csus-0818.pdf"; //insert URL to privacy policy

//Don't edit past here unless you know JS and are comfortable
//making changes on your own.
$(document).ready(() => {
  $('label.checkbox input[name="user[terms_of_use]"]').parent().parent().append(`<p><label class="checkbox"><input type="checkbox" name="second[terms_of_use]">I agree to the <a target="_blank" href=${terms} class="external" rel="noreferrer"><span>client's terms of use</span><span class="ui-icon ui-icon-extlink ui-icon-inline" title="Links to an external site."><span class="screenreader-only">Links to an external site.</span></span></a> and <a target="_blank" href=${privacy} class="external" rel="noreferrer"><span>privacy policy</span><span class="ui-icon ui-icon-extlink ui-icon-inline" title="Links to an external site."><span class="screenreader-only">Links to an external site.</span></span></a>.</label></p>`);
  $('.button_box.ic-Login-confirmation__actions button[type="submit"]').on('click', (e) => {
    if ($('[name="user[terms_of_use]"]').prop('checked') && $('[name="second[terms_of_use]"]').prop('checked')) {
      console.log("both terms accepted");
    } else {
      e.preventDefault();
      if (!$('#errorOnTerms').text()) {
        $('.button_box.ic-Login-confirmation__actions').append(`<p id="errorOnTerms" style="color:red">You must agree to both terms and conditions`);
      }
      return false;
    }
  });
});

/* the script currently does not capture any information
 about the second box being checked it only prevents
 the user from submitting if it isn't checked */

$('add_module_item_link').on('click', () => {

});
$('#add_module_item_select').change(() => {
  if ($('#add_module_item_select').val().indexOf('external') > -1) {
    $('#external_url_create_new_tab').prop("checked", true);
    $('#external_tool_create_new_tab').prop("checked", true);
  }
});

//hides MyMediasite li in External Tool selection in module
//this function that element has rendered on the page

function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 60) return;
    setTimeout(function() {
      onElementRendered(selector, cb, _attempts);
    }, 250);
  };

//  this is invoking the on element rendered function when the item select contains the word tool - MyMediasite

$('#add_module_item_select').change(() => {
  if ($('#add_module_item_select').val().indexOf('tool') > -1) {
    onElementRendered('a.name:contains("MyMediasite")', function(e) {
        $('a.name:contains("MyMediasite")').parent().remove();
    });
    
  }
});

//  this is invoking the on element rendered function when the item select contains the word tool - Mediasite Catalog

$('#add_module_item_select').change(() => {
  if ($('#add_module_item_select').val().indexOf('tool') > -1) {
    onElementRendered('a.name:contains("Mediasite Catalog")', function(e) {
        $('a.name:contains("Mediasite Catalog")').parent().remove();
    });
    
  }
});

//  this is invoking the on element rendered function when the item select contains the word tool - LockDown Browser

$('#add_module_item_select').change(() => {
  if ($('#add_module_item_select').val().indexOf('tool') > -1) {
    onElementRendered('a.name:contains("LockDown Browser")', function(e) {
        $('a.name:contains("LockDown Browser")').parent().remove();
    });
    
  }
});

//  this is invoking the on element rendered function when the item select contains the word tool - Turnitin Framework

$('#add_module_item_select').change(() => {
  if ($('#add_module_item_select').val().indexOf('tool') > -1) {
    onElementRendered('a.name:contains("Turnitin Framework")', function(e) {
        $('a.name:contains("Turnitin Framework")').parent().remove();
    });
    
  }
});

// this is script to hide reset content button on course settings page

$(document).ready(function(){
// Checks the page to make sure it is course settings
	if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
// Checks that current user role is not an admin to hide/disable options. Admins can access all settings.
	if($.inArray('admin',ENV.current_user_roles) == -1){
// Hides course reset button
	$('a[href*=\'/reset\']').hide();
	}
	}
});

// this icon is display to teacher role users
if(ENV.current_user_roles.indexOf('teacher') >= 0){

addResourcesButton();

function addResourcesButton() {
$('#menu li:last').before('<li id="custom_nav" class="menu-item ic-app-header__menu-list-item">' +
   '<a id="global_nav_resources_link" class="ic-app-header__menu-list-link" href="https://csus.instructure.com/courses/56207" target="_blank">' +
      '<div class="menu-item-icon-container" aria-hidden="true">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--follet" version="1.1" x="0" y="0"' +
             'viewBox="0 0 46 45" enable-background="new 0 0 46 45" xml:space="preserve">' +
               '<path d="M8.9,21l2.1-2.1l-0.7-0.7l4.8-4.8l-2.1-2.1l-4.8,4.8l-1.1-1.1l4.8-4.8L9.9,' +
                   '8.2L5.1,13l-1.8-1.8l7.9-7.9l7.8,7.8L21,8.9l-8.2-8.2c-0.4-0.4-1-0.7-1.6-0.7c-0.6,' +
                   '0-1.2,0.2-1.6,0.7L0.7,9.5c-0.9,0.9-0.9,2.4,0,3.3L8.9,21 M45.3,32.3L37.1,24L35,26.1l7.8,' +
                   '7.8l-7.9,7.9L33,39.9l4.8-4.8L35.7,33l-4.8,4.8l-1.1-1.1l4.8-4.8l-2.1-2.1l-4.8,4.8L27.1,34L25,' +
                   '36.1l8.3,8.3c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7l8.8-8.8C46.2,34.6,46.2,33.2,45.3,32.3 M45,' +
                   '10.4c0-1-0.4-1.9-1.1-2.6l-6.7-6.7C36.5,0.4,35.6,0,34.6,0S32.7,0.4,32,1.1L4.3,28.8c-0.6,0.6-0.9,1.3-1,' +
                   '2.1L0.1,43c-0.1,0.5,0,1.1,0.4,1.5C0.8,44.8,1.2,45,1.6,45c0.1,0,0.3,0,0.4-0.1l12.2-3.2c0.8-0.1,1.5-0.5,' +
                   '2-1L43.9,13C44.6,12.3,45,11.4,45,10.4L45,10.4z M4.1,40.9L6,33.8l5.3,5.3L4.1,40.9L4.1,40.9z M41.8,10.7L14.6,' +
                   '37.8l-7.5-7.5L34.3,3.2c0.2-0.2,0.3-0.2,0.4-0.2c0.1,0,0.3,0,0.4,0.2l6.6,6.6c0.2,0.2,0.2,0.3,0.2,0.4C41.9,10.4,41.9,10.6,41.8,10.7L41.8,10.7z"/>' +
           '</svg>' +
          '</div>' +
        '<div class="menu-item__text">Online\nTeaching\nResources' +
       '</div>' +
     '</a>' +
   '</li>');
}
}

// this icon is display to student role users
if(ENV.current_user_roles.indexOf('student') >= 0){

addStuResourcesButton();

function addStuResourcesButton() {
$('#menu li:last').before('<li id="custom_nav" class="menu-item ic-app-header__menu-list-item">' +
   '<a id="global_nav_resources_link" class="ic-app-header__menu-list-link" href="https://csus.instructure.com/courses/74723" target="_blank">' +
      '<div class="menu-item-icon-container" aria-hidden="true">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--follet" version="1.1" x="0" y="0"' +
             'viewBox="0 0 46 45" enable-background="new 0 0 46 45" xml:space="preserve">' +
               '<path d="M8.9,21l2.1-2.1l-0.7-0.7l4.8-4.8l-2.1-2.1l-4.8,4.8l-1.1-1.1l4.8-4.8L9.9,' +
                   '8.2L5.1,13l-1.8-1.8l7.9-7.9l7.8,7.8L21,8.9l-8.2-8.2c-0.4-0.4-1-0.7-1.6-0.7c-0.6,' +
                   '0-1.2,0.2-1.6,0.7L0.7,9.5c-0.9,0.9-0.9,2.4,0,3.3L8.9,21 M45.3,32.3L37.1,24L35,26.1l7.8,' +
                   '7.8l-7.9,7.9L33,39.9l4.8-4.8L35.7,33l-4.8,4.8l-1.1-1.1l4.8-4.8l-2.1-2.1l-4.8,4.8L27.1,34L25,' +
                   '36.1l8.3,8.3c0.4,0.4,1,0.7,1.6,0.7c0.6,0,1.2-0.2,1.6-0.7l8.8-8.8C46.2,34.6,46.2,33.2,45.3,32.3 M45,' +
                   '10.4c0-1-0.4-1.9-1.1-2.6l-6.7-6.7C36.5,0.4,35.6,0,34.6,0S32.7,0.4,32,1.1L4.3,28.8c-0.6,0.6-0.9,1.3-1,' +
                   '2.1L0.1,43c-0.1,0.5,0,1.1,0.4,1.5C0.8,44.8,1.2,45,1.6,45c0.1,0,0.3,0,0.4-0.1l12.2-3.2c0.8-0.1,1.5-0.5,' +
                   '2-1L43.9,13C44.6,12.3,45,11.4,45,10.4L45,10.4z M4.1,40.9L6,33.8l5.3,5.3L4.1,40.9L4.1,40.9z M41.8,10.7L14.6,' +
                   '37.8l-7.5-7.5L34.3,3.2c0.2-0.2,0.3-0.2,0.4-0.2c0.1,0,0.3,0,0.4,0.2l6.6,6.6c0.2,0.2,0.2,0.3,0.2,0.4C41.9,10.4,41.9,10.6,41.8,10.7L41.8,10.7z"/>' +
           '</svg>' +
          '</div>' +
        '<div class="menu-item__text">Student\nTechnology\nResources' +
       '</div>' +
     '</a>' +
   '</li>');
}
}

// this is code for adding Library icon to global navigation
// this script is not supported by Canvas and is used at your own risks
addLibraryButton();
 
function addLibraryButton() {
$('#menu li:last').before('<li id="custom_nav" class="menu-item ic-app-header__menu-list-item">' +
   '<a id="global_nav_resources_link" class="ic-app-header__menu-list-link" href="https://library.csus.edu/" target="_blank">' +
      '<div class="menu-item-icon-container" aria-hidden="true">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--follet" version="1.1" x="0" y="0"' +
             'viewBox="0 0 46 45" enable-background="new 0 0 46 45" xml:space="preserve">' +
               '<path d="M 46.167969 26.15625 L 47.476562 26.15625 C 48.867188 26.15625 50 25.023438 50 23.632812 C 50 22.960938 49.738281 22.328125 49.261719 21.847656 C 48.78125 21.375 48.148438 21.113281 47.476562 21.113281 L 46.011719 21.113281 C 48.429688 19.335938 50 16.476562 50 13.253906 C 50 7.878906 45.625 3.503906 40.25 3.503906 L 2.523438 3.503906 C 1.132812 3.503906 0 4.636719 0 6.027344 C 0 7.417969 1.132812 8.550781 2.523438 8.550781 L 3.832031 8.550781 C 4.976562 11.570312 4.976562 14.9375 3.832031 17.960938 L 2.523438 17.960938 C 1.132812 17.960938 0 19.089844 0 20.480469 C 0 21.871094 1.132812 23.003906 2.523438 23.003906 L 3.988281 23.003906 C 1.570312 24.78125 0 27.640625 0 30.863281 C 0 33.464844 1.015625 35.914062 2.855469 37.753906 C 4.472656 39.375 6.558594 40.351562 8.808594 40.566406 L 8.808594 45.550781 C 8.808594 45.882812 8.984375 46.191406 9.269531 46.359375 C 9.554688 46.53125 9.910156 46.539062 10.203125 46.382812 L 13.972656 44.351562 L 17.742188 46.382812 C 17.882812 46.457031 18.035156 46.496094 18.191406 46.496094 C 18.359375 46.496094 18.527344 46.449219 18.675781 46.359375 C 18.960938 46.191406 19.136719 45.882812 19.136719 45.550781 L 19.136719 40.609375 L 47.476562 40.609375 C 48.867188 40.609375 50 39.480469 50 38.089844 C 50 37.414062 49.738281 36.78125 49.257812 36.304688 C 48.78125 35.828125 48.148438 35.566406 47.476562 35.566406 L 46.167969 35.566406 C 45.78125 34.546875 45.523438 33.488281 45.394531 32.40625 C 45.335938 31.894531 45.304688 31.375 45.304688 30.863281 C 45.304688 30.347656 45.335938 29.828125 45.398438 29.316406 C 45.523438 28.234375 45.78125 27.171875 46.167969 26.15625 Z M 2.523438 21.113281 C 2.175781 21.113281 1.890625 20.828125 1.890625 20.480469 C 1.890625 20.132812 2.175781 19.851562 2.523438 19.851562 L 39.960938 19.851562 C 42.382812 19.851562 44.605469 18.527344 45.757812 16.398438 C 46.824219 14.429688 46.824219 12.078125 45.757812 10.109375 C 44.605469 7.980469 42.382812 6.65625 39.960938 6.65625 L 2.523438 6.65625 C 2.175781 6.65625 1.890625 6.375 1.890625 6.027344 C 1.890625 5.679688 2.175781 5.398438 2.523438 5.398438 L 40.25 5.398438 C 44.582031 5.398438 48.109375 8.921875 48.109375 13.253906 C 48.109375 17.585938 44.585938 21.109375 40.253906 21.113281 Z M 16.058594 13.964844 L 6.5625 13.964844 C 6.585938 13.492188 6.585938 13.019531 6.5625 12.542969 L 11.246094 12.542969 C 11.769531 12.542969 12.191406 12.121094 12.191406 11.597656 C 12.191406 11.078125 11.769531 10.652344 11.246094 10.652344 L 6.355469 10.652344 C 6.234375 9.941406 6.0625 9.238281 5.835938 8.550781 L 39.960938 8.550781 C 41.6875 8.550781 43.273438 9.492188 44.09375 11.011719 C 44.855469 12.417969 44.855469 14.09375 44.09375 15.496094 C 43.273438 17.015625 41.6875 17.960938 39.960938 17.960938 L 5.835938 17.960938 C 6.0625 17.269531 6.234375 16.566406 6.355469 15.855469 L 16.058594 15.855469 C 16.582031 15.855469 17.007812 15.433594 17.007812 14.910156 C 17.007812 14.386719 16.582031 13.964844 16.058594 13.964844 Z M 17.246094 43.964844 L 14.421875 42.445312 C 14.28125 42.371094 14.128906 42.332031 13.972656 42.332031 C 13.820312 42.332031 13.664062 42.371094 13.523438 42.445312 L 10.703125 43.964844 L 10.703125 33.464844 L 17.246094 33.464844 Z M 18.191406 31.570312 L 9.753906 31.570312 C 9.234375 31.570312 8.808594 31.996094 8.808594 32.515625 L 8.808594 35.398438 C 8.398438 35.289062 8 35.121094 7.632812 34.902344 C 6.90625 34.46875 6.308594 33.847656 5.90625 33.101562 C 5.535156 32.417969 5.335938 31.644531 5.335938 30.863281 C 5.335938 30.078125 5.535156 29.304688 5.90625 28.621094 C 6.726562 27.101562 8.3125 26.15625 10.039062 26.15625 L 44.160156 26.15625 C 43.9375 26.84375 43.761719 27.546875 43.640625 28.261719 L 38.753906 28.261719 C 38.230469 28.261719 37.808594 28.683594 37.808594 29.207031 C 37.808594 29.726562 38.230469 30.152344 38.753906 30.152344 L 43.429688 30.152344 C 43.421875 30.386719 43.414062 30.625 43.414062 30.863281 C 43.414062 31.097656 43.421875 31.335938 43.429688 31.570312 L 33.941406 31.570312 C 33.417969 31.570312 32.992188 31.996094 32.992188 32.515625 C 32.992188 33.039062 33.417969 33.464844 33.941406 33.464844 L 43.640625 33.464844 C 43.761719 34.175781 43.9375 34.878906 44.160156 35.566406 L 19.136719 35.566406 L 19.136719 33.464844 L 22.226562 33.464844 C 22.75 33.464844 23.171875 33.039062 23.171875 32.515625 C 23.171875 31.996094 22.75 31.570312 22.226562 31.570312 Z M 47.476562 37.457031 C 47.644531 37.457031 47.804688 37.523438 47.921875 37.640625 C 48.042969 37.761719 48.109375 37.917969 48.109375 38.089844 C 48.109375 38.4375 47.824219 38.71875 47.476562 38.71875 L 19.136719 38.71875 L 19.136719 37.457031 Z M 10.042969 24.265625 C 7.617188 24.265625 5.394531 25.589844 4.242188 27.71875 C 3.722656 28.679688 3.445312 29.765625 3.445312 30.863281 C 3.445312 31.957031 3.722656 33.042969 4.242188 34.003906 C 4.804688 35.050781 5.644531 35.921875 6.664062 36.527344 C 7.324219 36.921875 8.054688 37.195312 8.808594 37.339844 L 8.808594 38.660156 C 7.066406 38.453125 5.453125 37.679688 4.195312 36.417969 C 2.710938 34.933594 1.890625 32.960938 1.890625 30.863281 C 1.890625 26.53125 5.414062 23.007812 9.746094 23.003906 L 40.25 23.003906 C 40.253906 23.003906 40.253906 23.003906 40.253906 23.003906 L 47.476562 23.003906 C 47.644531 23.003906 47.804688 23.070312 47.921875 23.1875 C 48.042969 23.308594 48.109375 23.464844 48.109375 23.632812 C 48.109375 23.980469 47.824219 24.265625 47.476562 24.265625 Z M 10.042969 24.265625 "/>' +
           '</svg>' +
          '</div>' +
        '<div class="menu-item__text">Library' +
       '</div>' +
     '</a>' +
   '</li>');
}

// this is js for Blackboard Ally

window.ALLY_CFG = {
    'baseUrl': 'https://prod.ally.ac',
    'clientId': 3780
};
$.getScript(ALLY_CFG.baseUrl + '/integration/canvas/ally.js');

// this is script for Google Analytics
// this script is copied from https://community.canvaslms.com/t5/Admin-Group/How-to-Set-Up-Google-Analytics-for-Canvas/ba-p/245230

function removeStorage(e){try{localStorage.removeItem(e),localStorage.removeItem(e+"_expiresIn")}catch(t){return console.log("removeStorage: Error removing key ["+e+"] from localStorage: "+JSON.stringify(t)),!1}return!0}function getStorage(e){var t=Date.now(),o=localStorage.getItem(e+"_expiresIn");if(null==o&&(o=0),o<t)return removeStorage(e),null;try{return localStorage.getItem(e)}catch(t){return console.log("getStorage: Error reading key ["+e+"] from localStorage: "+JSON.stringify(t)),null}}function setStorage(e,t,o){o=null==o?86400:Math.abs(o);var s=Date.now()+1e3*o;try{localStorage.setItem(e,t),localStorage.setItem(e+"_expiresIn",s)}catch(t){return console.log("setStorage: Error setting key ["+e+"] in localStorage: "+JSON.stringify(t)),!1}return!0}async function coursesRequest(e){let t=await fetch("/api/v1/users/self/courses?per_page=100"),o=await t.text();o=o.replace('while(1);', ''),o=JSON.parse(o);var s=JSON.stringify(o);return setStorage("ga_enrollments",s,null),parseCourses(e,s)}function parseCourses(e,t){if(null!=t){let s=JSON.parse(t);for(var o=0;o<s.length;o++)if(s[o].id==e)return s[o]}return null}function gaCourseDimensions(e){custom_ga("set","dimension4",e.id),custom_ga("set","dimension5",e.name),custom_ga("set","dimension6",e.account_id),custom_ga("set","dimension7",e.enrollment_term_id),custom_ga("set","dimension8",e.enrollments[0].type),custom_ga("send","pageview")}function googleAnalyticsCode(e){var t,o,s,n;if(custom_ga("create",e,"auto"),t=ENV.current_user_id,o=ENV.current_user_roles,custom_ga("set","userId",t),custom_ga("set","dimension1",t),custom_ga("set","dimension3",o),n=window.location.pathname.match(/\/courses\/(\d+)/)){n=n[1],s=0;try{let e=getStorage("ga_enrollments");if(null!=e){var r=parseCourses(n,e);null===r?coursesRequest(n).then(e=>{null===e?(custom_ga("set","dimension4",n),custom_ga("send","pageview")):gaCourseDimensions(e)}):gaCourseDimensions(r)}else coursesRequest(n).then(e=>{null===e?(custom_ga("set","dimension4",n),custom_ga("send","pageview")):gaCourseDimensions(e)})}catch(e){if((s+=1)>5)return custom_ga("set","dimension4",n),void custom_ga("send","pageview")}}else custom_ga("send","pageview")}!function(e,t,o,s,n,r,a){e.GoogleAnalyticsObject=n,e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)},e[n].l=1*new Date,r=t.createElement(o),a=t.getElementsByTagName(o)[0],r.async=1,r.src="https://www.google-analytics.com/analytics.js",a.parentNode.insertBefore(r,a)}(window,document,"script",0,"custom_ga");googleAnalyticsCode("UA-111883006-1");