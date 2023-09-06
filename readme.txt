pirate weather doesnt allow for api requests from local host- 
to avoid cors errors, you have to deploy your own cors anywhere server to heroku
once heroku cli is installed and you have a heroku account:
    open new terminal and run these commands
        heroku login
        git clone https://github.com/Rob--W/cors-anywhere.git
        cd cors-anywhere/
        npm install
        heroku create
        git push heroku master
    this creates your own cors anywhere proxy
    you just need to replace the request url in app.js with the proxy url
