// login js
"use strict";


function login(method) {
  var SERVER_HOST    = "http://dev.staymarta.com"
  var LOGIN_ENDPOINT = "/auth/"
  var redirect_uri   = "http://127.0.0.1:8000/callback.html"

  console.log('logging in via', method)
  var URI = SERVER_HOST+LOGIN_ENDPOINT+method
  window.location.href = URI+"?redirect_uri="+encodeURIComponent(redirect_uri)
}
