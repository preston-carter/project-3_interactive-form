/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Developer: Preston Carter
https://github.com/preston-carter
******************************************/

//Wait to run the script until the content has fully loaded.
document.addEventListener('DOMContentLoaded', () => {

/***
   Global variables that store the DOM elements to reference and/or manipulate.
***/
const $name = $('#name');
const $email = $('#mail');
const $jobRoleFieldset = $('#firstSet');
const $jobRole = $('#title');
const $jobRoleOther = $('#other-title');
const $shirtDesign = $('#design');
const $shirtColors = $('#color');
const $activityFieldset = $('.activities');
const $allCheckboxes = $(':checkbox');
const $paymentOptions = $('#payment');
const $creditCardNum = $('#cc-num');
const $creditCardZip = $('#zip');
const $creditCardCVV = $('#cvv');

let activityTotal = $('<div></div>');
$activityFieldset.append(activityTotal);
let activityCost = 0;

/***
   Prepring form for initial load.
***/

//Hide other job option and focus on the name field.
$jobRoleOther.hide();
$name.focus();

/***
   Job Role Section
***/

//Create function to show job option field if selected.
$jobRole.change(function() {

  if ( $(this).val() === "other" ) {

    $jobRoleOther.show();

  }

});

/***
   T Shirt Section
***/

$('#design option:eq(0)').attr('hidden', true);

$shirtDesign.change(function() {

  if ( $(this).val() === "js puns" ) {

    $('#color option:eq(0)').prop('selected', true);
    $('#color option:contains("JS shirt")').hide();
    $('#color option:contains("JS Puns")').show();

  }

  else if ( $(this).val() === "heart js" ) {

    $('#color option:eq(3)').prop('selected', true);
    $('#color option:contains("JS Puns")').hide();
    $('#color option:contains("JS shirt")').show();

  }

});

/***
   Activity Section
***/

$activityFieldset.change( function(e) {

  let checkboxTarget = $(e.target);
  let checkboxParent = checkboxTarget.parent().text();
  let symbolIndex = checkboxParent.indexOf('$') + 1;
  let costSlice = checkboxParent.slice(symbolIndex, symbolIndex + 3);
  let costVar = parseInt(costSlice);
  let emDashIndex = checkboxParent.indexOf('—') + 2;
  let commaIndex = checkboxParent.indexOf(',');
  let dayTime = checkboxParent.slice(emDashIndex, commaIndex);

  if ( checkboxTarget.prop('checked') ) {

    activityCost += costVar;

  } else {

    activityCost -= costVar;

  }

  activityTotal.html('<span>Total: $' + activityCost + '</span>');

  for ( let i = 0; i < $allCheckboxes.length; i += 1 ) {

    let checkboxLoop = $($allCheckboxes[i]);
    let checkboxParentLoop = checkboxLoop.parent().text();
    let emDashIndexLoop = checkboxParentLoop.indexOf('—') + 2;
    let commaIndexLoop = checkboxParentLoop.indexOf(',');
    let dayTimeLoop = checkboxParentLoop.slice(emDashIndexLoop, commaIndexLoop);

    if ( dayTime === dayTimeLoop && checkboxParent !== checkboxParentLoop ) {

      if ( checkboxTarget.prop('checked') ) {

        checkboxLoop.prop('disabled', true).parent().addClass('activity-conflict');

      } else {

        checkboxLoop.prop('disabled', false).parent().removeClass('activity-conflict');

      }

    }
  }

});

/***
   Payment Section
***/

$('#payment option:eq(0)').attr('hidden', true);
$paymentOptions.next().next().hide();
$paymentOptions.next().next().next().hide();

$paymentOptions.change(function() {

  if ( $(this).val() === "credit card" ) {

    $('#payment option:eq(1)').prop('selected', true);
    $('#credit-card').attr('hidden', false);
    $paymentOptions.next().next().hide();
    $paymentOptions.next().next().next().hide();

  }

  else if ( $(this).val() === "paypal" ) {

    $('#payment option:eq(2)').prop('selected', true);
    $('#credit-card').attr('hidden', true);
    $paymentOptions.next().next().show();
    $paymentOptions.next().next().next().hide();

  }

  else if ( $(this).val() === "bitcoin" ) {

    $('#payment option:eq(3)').prop('selected', true);
    $('#credit-card').attr('hidden', true);
    $paymentOptions.next().next().hide();
    $paymentOptions.next().next().next().show();

  }

});

/***
   Form Validation
***/

function isValidName() {

  if ( $name.val() === "" ) {

    $name.addClass('invalid');
    $name.prev().addClass('invalid-text');
    return false;

  }

  else {

    $name.removeClass('invalid');
    $name.prev().removeClass('invalid-text');
    return true;

  }
}

function isValidEmail() {

  const emailRegex = /^[^@.]+@[^@.]+\.[^@.]+$/i;

  if ( emailRegex.test($email.val()) === false ) {

    $email.addClass('invalid');
    $email.prev().addClass('invalid-text');
    return false;

  }

  else {

    $email.removeClass('invalid');
    $email.prev().removeClass('invalid-text')
    return true;

  }

}

function isValidActivity() {

  if ( $('input:checked').length === 0 ) {

    $activityFieldset.addClass('invalid-text');
    return false;

  }

  else {

    $activityFieldset.removeClass('invalid-text');
    return true;

  }

}


function isValidCreditNumber() {

  const creditCardRegex = /^(\d){13,16}$/;

  if ( creditCardRegex.test($creditCardNum.val()) === false ) {

    $creditCardNum.addClass('invalid');
    $creditCardNum.prev().addClass('invalid-text');
    return false;

  }

  else {

    $creditCardNum.removeClass('invalid');
    $creditCardNum.prev().removeClass('invalid-text');
    return true;

  }

}

function isValidCreditZip() {

  const creditZipRegex = /^(\d){5}$/;

  if ( creditZipRegex.test($creditCardZip.val()) === false ) {

    $creditCardZip.addClass('invalid');
    $creditCardZip.prev().addClass('invalid-text');
    return false;

  }

  else {

    $creditCardZip.removeClass('invalid');
    $creditCardZip.prev().removeClass('invalid-text');
    return true;

  }

}

function isValidCreditCVV() {

  const creditCVVRegex = /^(\d){3}$/;

  if ( creditCVVRegex.test($creditCardCVV.val()) === false ) {

    $creditCardCVV.addClass('invalid');
    $creditCardCVV.prev().addClass('invalid-text');
    return false;

  }

  else {

    $creditCardCVV.removeClass('invalid');
    $creditCardCVV.prev().removeClass('invalid-text');
    return true;

  }

}

$('button').click(function(e) {

isValidName();
isValidEmail();
isValidActivity();
isValidCreditNumber();
isValidCreditZip();
isValidCreditCVV();

  if ( $paymentOptions.val() === "credit card" ||
    $paymentOptions.val() === "select_method") {

    if ( isValidName() && isValidEmail() && isValidActivity() &&
    isValidCreditNumber() && isValidCreditZip() && isValidCreditCVV() ) {

      $('form').submit();
      alert('Thank you for registering!');

    }

    else {

      e.preventDefault();

    }

  }

  else {

    if ( isValidName() && isValidEmail() && isValidActivity() ) {

      $('form').submit();
      alert('Thank you for registering!');

    }

    else {

      e.preventDefault();

    }

  }

});

})
