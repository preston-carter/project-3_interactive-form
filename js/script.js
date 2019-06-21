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
const $shirtColorsLabel = $shirtColors.prev();
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
//Regex variables to check field validation.
const nameRegex = /^\S+$/;
const emailRegex = /^[^@.]+@[^@.]+\.[^@.]+$/i;
const creditCardRegex = /^(\d){13,16}$/;
const creditZipRegex = /^(\d){5}$/;
const creditCVVRegex = /^(\d){3}$/;

/***
   Preparing form for initial load.
***/

//Hide other job option and focus on the name field.
$jobRoleOther.hide();
$shirtColors.hide();
$shirtColorsLabel.text('Please select a T-shirt theme!').addClass('invalid-text');
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

  $shirtColors.show();
  $shirtColorsLabel.text('Color:').removeClass('invalid-text');

  if ( $(this).val() === "js puns" ) {

    $allIHeartJSColors.hide();
    $allJSPunsColors.show();
    $firstJSPunsColor.prop('selected', true);

  }

  else if ( $(this).val() === "heart js" ) {

    $allJSPunsColors.hide();
    $allIHeartJSColors.show();
    $firstIHeartJSColor.prop('selected', true);

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

//The user input fields can be check with a single function by reading in the regex var + input field.
function isValid(regex, field) {

  if ( regex.test(field.val()) === false ) {

    field.addClass('invalid');
    field.prev().addClass('invalid-text');
    return false;

  }

  else {

    field.removeClass('invalid');
    field.prev().removeClass('invalid-text');
    return true;

  }

}

//The activity section needs to be checked separately because there's no character input to check from the user.
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

/***
   Form Submission
***/

//Create function to run form validations and check the appropriate ones depending on payment method.
$('button').click(function(e) {

  //Store validation function calls for each field/part of form.
  const isValidName = isValid( nameRegex, $name );
  const isValidEmail = isValid( emailRegex, $email );
  const isValidAct = isValidActivity();
  const isValidCreditNumber = isValid( creditCardRegex, $creditCardNum );
  const isValidCreditZip = isValid( creditZipRegex, $creditCardZip );
  const isValidCreditCVV = isValid( creditCVVRegex, $creditCardCVV );

  //Check all validations when credit is the payment method.
  if ( $paymentOptions.val() === "credit card" ||
    $paymentOptions.val() === "select_method") {

    if ( isValidName && isValidEmail && isValidAct &&
    isValidCreditNumber && isValidCreditZip && isValidCreditCVV ) {

      $('form').submit();
      alert('Thank you for registering!');

    }

    else {

      e.preventDefault();

    }

  }

  //Check all non-credit validations when credit is NOT the payment method.
  else {

    if ( isValidName && isValidEmail && isValidAct ) {

      $('form').submit();
      alert('Thank you for registering!');

    }

    else {

      e.preventDefault();

    }

  }

});

});
