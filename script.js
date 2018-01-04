//counter variables to prevent repeated messages
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
let g = 0;
let h = 0;
let j = 0;

const name = $('#name');
const email = $('#mail');
const card = $('#cc-num');


//function to check if email is in a valid format
function validateEmail(emailValue) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailValue.toLowerCase());
}


//cursor appears in first field upon load
$(':input:enabled:visible:first').focus();

//if user selects other an input field appears, if they deselect the field disappears
$('#title').change(function () {
    if (this.value === 'other') {
        $(this).parent().append('<input id="other-title" type="text" placeholder="Your Job Role"/>');
    } else {
        $('#other-title').remove();
    }
});

//hide colors until a shirt is selected
$('#colors-js-puns').hide();
//when a t-shirt is selected only the sizes for that shirt are displayed.
$('#design').change(function () {
    if (this.value === "js puns") {
        $("#colors-js-puns").show();
        $("#color option:gt(2)").hide();
        $("#color option:lt(3)").show();
    } else if (this.value === "heart js") {
        $("#colors-js-puns").show();
        $("#color option:lt(3)").hide();
        $("#color option:gt(2)").show();
    } else {
        $('#colors-js-puns').hide();
    }
});

//activities with conflicting times are disabled and the color is changed to grey
$('.activities label input:checkbox').change(function () {
    let selected = this.name;
    var isChecked = $(this).prop('checked') === true;

    //functions to add correct styling to disabled and enabled events.
    function disable(selected) {
        $(".activities label input[name='" + selected + "']").prop('disabled', true).parent().css("color", "#707070");
    }
    function enable(selected) {
        $(".activities label input[name='" + selected + "']").prop('disabled', false).parent().css("color", "#000");
    }

    if (selected === 'js-frameworks') {
        if (isChecked) {
            disable('express');
        } else {
            enable('express');
        }
    } else if (selected === 'express') {
        if (isChecked) {
            disable('js-frameworks');
        } else {
            enable('js-frameworks');
        }
    } else if (selected === 'js-libs') {
        if (isChecked) {
            disable('node');
        } else {
            enable('node');
        }
    } else if (selected === 'node') {
        if (isChecked) {
            disable('js-libs');
        } else {
            enable('js-libs');
        }
    } else { }
});

//a function to add the total cost of activities selected beneath the activities fieldset
//a counter is declared to stop repeated printing.
function appendTotal(total) {
    if (a = 1) {
        $('.activities p').last().remove();
    }
    $('.activities').append('<p class="total">Total Cost: $' + total + '.00</p');
    a += 1;
}

//event listener for activities fieldset checkboxes. As checkboxes are checked and unchecked the total
//cost is calculated. If no activities are selected the cost disappears.
let total = 0;
$('.activities label input:checkbox').change(function () {
    let selected = this.name;
    if (selected === 'all') {
        if ($(this).prop('checked') === true) {
            total += 200;
        } else {
            total -= 200;
        }
    } else {
        if ($(this).prop('checked') === true) {
            total += 100;
        } else {
            total -= 100;
        }
    }
    appendTotal(total);
    if (total === 0) {
        $('.total').hide();
    }
});


//payment section variables
var $paypal = ('#payment-info div:nth-child(5)');
var $bitcoin = ('#payment-info div:nth-child(6)');
var $creditCard = $('#credit-card');

//hide paypal & hide bitcoin
$($paypal).hide();
$($bitcoin).hide();

function displayPayment(selected, hideOne, hideTwo) {
    $(selected).show();
    $(hideOne).hide();
    $(hideTwo).hide();
}

//show the correct payment information for the users selection
$('#payment').change(function () {
    let selected = this.value;
    if (selected === 'paypal') {
        displayPayment($paypal, $bitcoin, $creditCard)
    } else if (selected === 'bitcoin') {
        displayPayment($bitcoin, $paypal, $creditCard);
    } else {
        displayPayment($creditCard, $bitcoin, $paypal);
    }
});

//keyup validation
$('#name, #mail, #cc-num, #zip, #cvv').keyup(function () {
    if ($(this).val() === "") {
        $(this).removeClass('valid');
        $(this).addClass('invalid');
    } else {
        $(this).removeClass('invalid');
        $(this).addClass('valid');
    }
});

//PAYMENT VALIDATION

//add an ID to payment section so it can be accessed easily
$('.activities').next().attr('id', 'payment-info')

//create a div for warning messages
$('#payment-info').append('<div id="errorMessageContainer"></div>');

//functions to check the payment section
function checkName() {
    nameLength = document.getElementById('name').value.length;
    if (nameLength <= 1) {    
        event.preventDefault();
        if (b === 0) {
        name.after("<p class='invalidText nameInput'>Please enter a valid name.</p>");
        b += 1;
        } 
    } else {
        b = 0;
        $('.nameInput').remove();
    }
}

function checkMail() {
    
    var emailValue = $(email).val()
    if (validateEmail(emailValue) === false) {
        event.preventDefault();
        if (c === 0) {
            email.prev().append('<p class="invalidText emailInput">' + "Please enter your email." + '</p>');
            c += 1;
        }
    } else {
        c = 0;
        $('.emailInput').remove();
    }
}

function checkActivity() {
    if ($('.activities input[type=checkbox]:checked').length) {
        d = 0
        $('.activities p').removeClass("invalidText");
    } else {
        event.preventDefault();
        if (d === 0) {
            d += 1
            $('.activities').append('<p class="invalidText">' + "Please choose at least one activity." + '</p>');
        }
    }
}

function checkZip() {
    var $creditZip = $('#zip').val();
    var $creditZipLength = $('#zip').val().length;
    if ($creditZipLength !== 5 || isNaN($creditZip)) {
            event.preventDefault();
            if (j === 0) {
                $('#errorMessageContainer').append('<p class="invalidText" id="creditZip">' + "Please enter a valid zip code." + '</p>');
                j += 1;
            }
        } else {
            j = 0;
            $('#creditZip').remove()
        }
}

function checkCvv() {
    var $creditCvv = $('#cvv').val();
    var $creditCvvLength = $('#cvv').val().length;
        if ($creditCvvLength !== 3 || isNaN($creditCvv)) {
        event.preventDefault();
            if (e === 0) {
                $('#errorMessageContainer').append('<p class="invalidText" id="creditCvv">' + "Please enter a valid CVV number." + '</p>');
                e += 1;
                return false;
            }
        } else {
            e = 0;
            $('#creditCvv').remove();
        }
}

function checkPayment() {

    var selectedPayment = document.getElementById('payment').value;
    if (selectedPayment === 'select_method') {
        event.preventDefault();
            if (f === 0 ) {
                $('#errorMessageContainer').append("<p class='invalidText' id='noPayment'>Please select a payment type.</p>");
            f += 1
            }
    } else {
        f = 0;
        $('#noPayment').remove();
    }
}  

function checkCard() {

    let selectedPayment = document.getElementById('payment').value;
    let creditCardInput = $('#cc-num').val();
    let creditCardInputLength = $('#cc-num').val().length;  

    if (selectedPayment === 'credit card' ) {
      if (creditCardInputLength > 0){
        //remove no number error in case it appeared last try
        g = 0;
        $('#noCCNum').remove();
        //if the credit number was entered correctly remove error and check zip and cvv.
        if (creditCardInputLength >= 13 && creditCardInputLength <= 16 && !isNaN(creditCardInput)) {
            $('#creditNumber').remove();
            h = 0;
        } else {
            event.preventDefault();
            console.log(e);
            if (h === 0) {
                $('#errorMessageContainer').append('<p class="invalidText" id="creditNumber">Please enter a credit card number between 13 and 16 digits</p>');
                h += 1;
            }
        }
      } else {
          event.preventDefault();
          if (g === 0) {
              $('#errorMessageContainer').append("<p class='invalidText' id='noCCNum'>Please enter a credit card.</p>");
          g += 1;
          } 
      }
      checkZip();
      checkCvv();
}
}
    
$('button').on('click', function () {
    checkName();
    checkMail();
    checkActivity();
    checkPayment();
    checkCard();
});