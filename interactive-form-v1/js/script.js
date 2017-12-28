//counter variables to prevent repeated messages
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let x = 0;
let y = 0;
let z = 0;

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
$('#design').change(function() {
    if (this.value === "js puns") {
        $("#colors-js-puns").show();
        $("#color option:gt(2)").hide();
        $("#color option:lt(3)").show();
    } else if (this.value ==="heart js")  {
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
        $(".activities label input[name='"+ selected +"']").prop('disabled', true).parent().css("color", "#707070");
    }
    function enable(selected) {
        $(".activities label input[name='" + selected +"']").prop('disabled', false).parent().css("color", "#000");
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
    } else {}
});

//a function to add the total cost of activities selected beneath the activities fieldset
//a counter is declared to stop repeated printing.
function appendTotal(total) {
    if (a = 1) {
        $('.activities p').last().remove();
    }
    $('.activities').append('<p class="total">Total Cost: $'+ total + '.00</p');
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
        total -= 200;}
 } else {
    if($(this).prop('checked') === true) {
        total += 100;
    } else {
        total -= 100;
        }}

appendTotal(total);
if (total === 0) {
    $('.total').hide();
}
});

//add an ID to payment section so it can be accessed easily
$('.activities').next().attr('id', 'payment-info')

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
    if (selected ==='paypal') {
        displayPayment($paypal, $bitcoin, $creditCard)
    } else if (selected === 'bitcoin') {
        displayPayment($bitcoin, $paypal, $creditCard);
    } else {
        displayPayment($creditCard, $bitcoin, $paypal);
    }
});

//Form Validation

//email validity function
function validateEmail(emailValue) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailValue.toLowerCase());
}

$('button').on('click', function () {
//name validation
    var nameInput = $('#name');
    var nameLength = nameInput.val().length;
    if (nameLength <= 1) { 
        event.preventDefault();
            if (y === 0) {
                nameInput.prev().append('<p class="invalidText nameInput">' + "Please enter your name." + '</p>');
                y += 1
            } 
    } else {
        y = 0;
        $('.nameInput').remove();
    }

 //email validation
    var email = $('#mail');
    var emailValue = $(email).val()  
    if (validateEmail(emailValue) === false) {
        event.preventDefault();
            if (z === 0) {
                email.prev().append('<p class="invalidText emailInput">' + "Please enter your email." + '</p>');
                z += 1;
            } 
    } else {
        z = 0;
        $('.emailInput').remove();
    }

//activity registration validation
    if ($('.activities input[type=checkbox]:checked').length ) {
        b = 0 
        $('.activities p').removeClass("invalidText")   
    } else {
        if (b === 0){
        b += 1
        $('.activities').append('<p class="invalidText">' + "Please choose at least one activity." + '</p>');
        }
    }

// credit card validation
    // credit card variables
    var $creditNumber = $('#cc-num').val();
    var $creditNumberLength = $('#cc-num').val().length;
    var $creditZip = $('#zip').val();
    var $creditZipLength = $('#zip').val().length;
    var $creditCvv = $('#cvv').val();
    var $creditCvvLength = $('#cvv').val().length;

    if ($creditNumberLength === 0) {
        event.preventDefault();
        if (x === 0) {
            $('#exp-year').parent().append('<p class="invalidText noNumber">' + "Please enter a credit card number" + '</p>');
            x += 1;
        } 
    } else {
            console.log('amego')
            x = 0;
            if ($creditNumberLength >= 13 && $creditNumberLength <= 16 && !isNaN($creditNumber)) {
                $('.creditNumber').remove()
                c = 0;
            } else {
                event.preventDefault();
                if (c === 0) {
                    $('.noNumber').remove()
                    $('#exp-year').parent().append('<p class="invalidText creditNumber">' + "Please enter a credit card number between 13 and 16 digits." + '</p>');
                    c += 1;
                }
            }
        }
   

    

    //zipcode validation

    if ($creditZipLength !== 5 || isNaN($creditZip) ) {
        event.preventDefault();
        if ( d === 0 ) {
            $('#exp-year').parent().append('<p class="invalidText creditZip">' + "Please enter a valid zip code." + '</p>');
            d += 1;
        } 
    } else {
        d = 0;
        $('.creditZip').remove()
    }

    //CVV validation
    if ($creditCvvLength !== 3 || isNaN($creditCvv)) {
        event.preventDefault();
            if ( e === 0 ) {
            $('#exp-year').parent().append('<p class="invalidText creditCvv">' + "Please enter a valid CVV number." + '</p>');
            e += 1;
        } 
    } else {
            e = 0;
            $('.creditCvv').remove()
         }

    //close button on click function
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


