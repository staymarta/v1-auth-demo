function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUser() {
  var key = getParameterByName("key")
  var id  = getParameterByName("id")
  var url = "http://dev.staymarta.com/v1/users/me"

  var credentials = {
    id: id,
    key: key,
    algorithm: "sha256"
  };

  var header = hawk.client.header(
    url,
    'GET',
    {
      credentials: credentials
    }
  );
  var options = {
    url: url,
    headers: {
      Authorization: header.field
    }
  }

  $.get(options, function(data, status, jqXHR) {

    // ALWAYS VALIDATE
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // READ THIS
    //
    //
    var isValid = hawk.client.authenticate(jqXHR, credentials, header.artifacts, { payload: data });

    console.log(data)
    console.log(jqXHR)
    console.log(isValid)

    if(!isValid) {
      window.alert('WARNING: Recieved Invalid Response. Check Developer Console for more Info.')
    }
    $('#name').val(data.data.name)
    $('#email').val(data.data.email)
    $('#username').val(data.data.username)

    $('#raw').html(JSON.stringify(data, 0, 2))
  })
}

window.onload = function() {
  var key = getParameterByName("key")
  var id  = getParameterByName("id")

  $('#key').val(key)
  $('#id').val(id)
}
