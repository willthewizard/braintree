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
var submit = document.querySelector('input[type="submit"]');
var authorization
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

function getToken()
{

 

    xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open( "GET", "http://localhost:5000/client_token", true );
//request.setRequestHeader("User-Agent", "Mozilla/5.0");
    xmlHttp.setRequestHeader("Accept","text/plain");
    xmlHttp.setRequestHeader("Content-Type","text/plain");
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin","localhost");
    xmlHttp.send( null );
}

function ProcessRequest() 
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
    {
        if ( xmlHttp.responseText == "Not found" ) 
        {
            document.getElementById( "TextBoxCustomerName"    ).value = "Not found";
            document.getElementById( "TextBoxCustomerAddress" ).value = "";
        }
        else
        {
           /* var info = eval ( "(" + xmlHttp.responseText + ")" );

            // No parsing necessary with JSON!        
            document.getElementById( "TextBoxCustomerName"    ).value = info.jsonData[ 0 ].cmname;
            document.getElementById( "TextBoxCustomerAddress" ).value = info.jsonData[ 0 ].cmaddr1;
        }   */
        document.write(xmlHttp.responseText);               
      }
    }
}
