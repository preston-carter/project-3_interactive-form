/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
Developer: Preston Carter
https://github.com/preston-carter
******************************************/

//Wait to run the script until the content has fully loaded.
$(function() {

/***
   Global variables that store the DOM elements to reference and/or manipulate.
***/

const $name = $('#name');
const $email = $('#mail');
const $jobRoleFieldset = $('#firstSet');
const $jobRole = $('#title');
const $jobRoleOther = $('#other-title');
const $shirtDesign = $('#design');
const $designOptionSelect = $('#design option:eq(0)');
const $shirtColors = $('#color');
const $firstJSPunsColor = $('#color option:eq(0)');
const $allJSPunsColors = $('#color option:contains("JS Puns")');
const $allIHeartJSColors = $('#color option:contains("JS shirt")');
const $firstIHeartJSColor = $('#color option:eq(3)');
const $activityFieldset = $('.activities');
const $allCheckboxes = $(':checkbox');
const $paymentOptions = $('#payment');
const $creditPayment = $paymentOptions.next();
const $paypalPayment = $paymentOptions.next().next();
const $bitcoinPayment = $paymentOptions.next().next().next();
const $creditCard = $('#credit-card');
const $creditCardNum = $('#cc-num');
const $creditCardZip = $('#zip');
const $creditCardCVV = $('#cvv');

//Update-able variables to store the total activity cost upon user selection.
let activityTotal = $('<div></div>');
$activityFieldset.append(activityTotal);
let activityCost = 0;

/***
   Preparing form for initial load.
***/

//Hide other job option and focus on the name field.
$jobRoleOther.hide();
$name.focus();

/***
   Job Role Section
***/

//Create function to show job option field if selected and hide otherwise.
$jobRole.change(function() {

  if ( $(this).val() === "other" ) {

    $jobRoleOther.show();

  }

  else {

    $jobRoleOther.hide();

  }

});

/***
   T Shirt Section
***/

//Make the 'Select Theme' option unselectable.
$designOptionSelect.attr('hidden', true);

//Once user selects design choice, only show the associated design colors.
$shirtDesign.change(function() {

  if ( $(this).val() === "js puns" ) {

    $firstJSPunsColor.prop('selected', true);
    $allIHeartJSColors.hide();
    $allJSPunsColors.show();

  }

  else if ( $(this).val() === "heart js" ) {

    $firstIHeartJSColor.prop('selected', true);
    $allJSPunsColors.hide();
    $allIHeartJSColors.show();

  }

});

/***
   Activity Section
***/

//Watch the acticity section and update the total activity cost when a checkbox is selected/unselected.
$activityFieldset.change( function(e) {

  //Create vars to extract activity values for each activity.
  let checkboxTarget = $(e.target);
  let checkboxParent = checkboxTarget.parent().text();
  let symbolIndex = checkboxParent.indexOf('$') + 1;
  let costSlice = checkboxParent.slice(symbolIndex, symbolIndex + 3);
  let costVar = parseInt(costSlice);
  let emDashIndex = checkboxParent.indexOf('—') + 2;
  let commaIndex = checkboxParent.indexOf(',');
  let dayTime = checkboxParent.slice(emDashIndex, commaIndex);

  //Use these vars to update the cost as an activity is selected or unselected.
  if ( checkboxTarget.prop('checked') ) {

    activityCost += costVar;

  } else {

    activityCost -= costVar;

  }

  //Store updating cost in a span element with a Total:$ format.
  activityTotal.html('<span>Total: $' + activityCost + '</span>');

  //Loop through all checkboxes to determine any conflicting time slots.
  for ( let i = 0; i < $allCheckboxes.length; i += 1 ) {

    //Create vars to extract date/time values for each activity.
    let checkboxLoop = $($allCheckboxes[i]);
    let checkboxParentLoop = checkboxLoop.parent().text();
    let emDashIndexLoop = checkboxParentLoop.indexOf('—') + 2;
    let commaIndexLoop = checkboxParentLoop.indexOf(',');
    let dayTimeLoop = checkboxParentLoop.slice(emDashIndexLoop, commaIndexLoop);

    //Use these vars to prevent user from selecting overlapping activities.
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

//Initially hide the paypal/bitcoin info sections + prevent selection of the 'Select method' option.
$('#payment option:eq(0)').attr('hidden', true);
$paypalPayment.hide();
$bitcoinPayment.hide();

$paymentOptions.change(function() {

  if ( $(this).val() === "credit card" ) {

    $creditPayment.prop('selected', true);
    $creditCard.attr('hidden', false);
    $paypalPayment.hide();
    $bitcoinPayment.hide();

  }

  else if ( $(this).val() === "paypal" ) {

    $paypalPayment.prop('selected', true);
    $creditCard.attr('hidden', true);
    $paypalPayment.show();
    $bitcoinPayment.hide();

  }

  else if ( $(this).val() === "bitcoin" ) {

    $bitcoinPayment.prop('selected', true);
    $creditCard.attr('hidden', true);
    $paypalPayment.hide();
    $bitcoinPayment.show();

  }

});

/***
   Form Validation
***/

//Create validation functions for each user-input form field
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

/***
   Form Submission
***/

//Create function to run form validations and check the appropriate ones depending on payment method.
$('button').click(function(e) {

//Run validations
isValidName();
isValidEmail();
isValidActivity();
isValidCreditNumber();
isValidCreditZip();
isValidCreditCVV();

  //Check all validations when credit is the payment method.
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

  //Check all non-credit validations when credit is NOT the payment method.
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

});
