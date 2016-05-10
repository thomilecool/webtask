# webtask Facebook Login

Purpose
--------------

Take a FB Login in parameter, check with Facebook API if it is valid.
If yes, return a JsonWebToken which can be used for API authentication.
If not, return the error message.

Example
--------------

```bash
$ wt create facebook_login.js.js
```

```bash
$ curl https://webtask.it.auth0.com/api/run/wt-*************/facebook_login?webtask_no_cache=1&fbtoken=EAAGm0******************************
{"status":200,"success":true,"message":"Authentication success!","token":"eyJ0eXAiOiJKV1Q**********","user":{"facebookUserId":"5*******","firstName":"Thomas","lastName":"******","email":"********@hotmail.com"}}
```