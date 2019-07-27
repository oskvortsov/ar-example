AR example Web App
==================

1. For test on Local Network you should Generate SSL certificate 

    ```openssl req -new -sha256 -newkey rsa:2048 -nodes -keyout private.key -x509 -days 3650 -out private.crt```
    
    ```openssl x509 -in private.crt -out private.pem -outform PEM```
    
    ```npm run webpack-dev-server -- --open --https --cert private.pem --key private.key```
