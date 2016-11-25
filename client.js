var authorization = '';

$.ajax({ type: "GET",   
         url: "http://localhost:5000/client_token",   
         async: false,
         success : function(text)
         {
             authorization = text;
         }
});


    alert(authorization);
alert("hello");
//var submit = document.getElementById("submitbutton");
var submit = document.querySelector('input[type="submit"]');
braintree.client.create({
  authorization: authorization
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
    return;
  }

  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '11pt'
      },
      'input.invalid': {
        'color': 'red'
      },
      'input.valid': {
        'color': 'green'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10/2019'
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
      return;
    }

    submit.removeAttribute('disabled');
  });
});

