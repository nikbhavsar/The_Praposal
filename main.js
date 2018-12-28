
 var i = 0;

 var answers = [];
 var modal = document.getElementById('myModel');
 var sendButton = document.getElementById("js_send");

 var arr = [{
  background: "https://www.wallpapersrc.com/img/2e9a22d139b543328354b40c5284d915/love-book-decoration-with-rose-blossom-4000x2667.jpg",
  question: "For some people book is the life. I know one of that person who make special place in my life. Can i be the favourite book from your list?"
}, {
  background: "https://previews.123rf.com/images/jchizhe/jchizhe1703/jchizhe170300555/73234974-food-ingredients-and-spices-for-cooking-mushrooms-tomatoes-cheese-onion-oil-pepper-salt-basil-olive-.jpg",
  question: "I know one foddie person like me. Can i be the favourite topping of her pizza?"
}, {
  background: "https://5.imimg.com/data5/JM/KI/GLADMIN-35826241/finding-love-on-online-matrimonial-500x500.jpg",
  question: "I am not perfect and i have not the qualiies which your dream bride has. Can you be my partner , teacher and most important thing my mceal lover for rest of my life?"
}];


function nextItem() {

  if (i === arr.length) {
    return null;
  }
  i = i + 1; // increase i by one

  return arr[i]; // give us back the item of where we are now

}


window.addEventListener('load', function () {
  document.getElementById('question').textContent = arr[0].question;
  document.getElementById('jumbotron').style.backgroundImage = "url('" + arr[0].background + "')"
  // initial value
  document.getElementById('prev_button').addEventListener(
    'click',
    function (e) {

      if (i === arr.length - 1) {
        modal.style.display = "block";
      }
     
      var next = nextItem();
      document.getElementById('jumbotron').style.backgroundImage = "url('" + next.background + "')";
      document.getElementById('question').textContent = next.question;
      answers.push("No");
      console.log(answers);

    }
  );

  document.getElementById('next_button').addEventListener(
    'click',
    function (e) {

      if (i === arr.length - 1) {
        modal.style.display = "block";
      }
     
      var next = nextItem();
      document.getElementById('jumbotron').style.backgroundImage = "url('" + next.background + "')";
      document.getElementById('question').textContent = next.question;
      answers.push("Yes");
      console.log(answers);
    }
  );
});


//sending Email


var form_id_js = "javascript_form";

var data_js = {
  "access_token": "swmjjyj8dgjxaaai67n6w2cv"
};

function js_onSuccess() {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}



function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    } else
      if (request.readyState == 4) {
        js_onError(request.response);
      }
  };

  var subject = "Praposal Answer";
  var message = "url('" + answers[0] + "')'" + answers[1] + "' )'" + answers[2] + "')";
  data_js['subject'] = subject;
  data_js['text'] = message;
  var params = toParams(data_js);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.send(params);

  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
  e.preventDefault();
});


