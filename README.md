## URl API : 

requerimientos: 
 -Docker 

- 1.- docker-compose up 

## URL API:
    http://127.0.0.1:3000/api/v1

## ejemplo:
registrar nuevo usuario:
    - POST /api/v1/users
    {
        "email":"eduardoczv2@gmail.com",
        "name":"Juan Eduardo",
        "paLastName": "Chavez",
        "moLastName": "Vargas",
        "phone":5512278348,
        "password":"123456789"
    }

response:
    {
        "createdAt": "2022-05-11T23:05:29.706Z",
        "id": 1,
        "email": "eduardoczv2@gmail.com",
        "name": "Juan Eduardo",
        "paLastName": "Chavez",
        "moLastName": "Vargas",
        "accounts": [
            {
                "createdAt": "2022-05-11T23:05:29.731Z",
                "id": 1,
                "userId": 1,
                "number": "4532004569883110",
                "type": "debit",
                "balance": "1000",
                "balanceInitial": "1000"
            },
            {
                "createdAt": "2022-05-11T23:05:29.760Z",
                "id": 2,
                "userId": 1,
                "number": "4929977710186015",
                "type": "credit",
                "balance": "0",
                "balanceInitial": "1000"
            }
        ]
    }
""Guardar el "number" de las cuentas, para hacer los movimientos de deposito, retiro y pago de cuenta"", 

## LOGIN :
- /auth/login

    {
        "email":"@gmail.com",
        "password":""
    }
    
response jwt token




## OPERACIONES
- /account/pay-credit/:numberAccount
- /account/withdraw/:numberAccount
- /account/deposit/:numberAccount

!requieren barer token!

body 
    {
        "amount":200
    }


