exports.html= (otp)=>{
    return (`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <style>
        ::selection {
            color: rgba(2, 87, 9, 0.8);
        }
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
            width: 100%;
        }
        div {
            height: 100%;
            width: 100%;
            background: #000000f8;
            color: rgb(210, 250, 212);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        span {
            font-weight: bolder;
            font-size: larger;
        }
    </style>
    <body>
        <div>
            <h1>Farmer's Palm.</h1>
            <h4>Products from the Farm</h4>
            <br />
            <p><span>${otp} </span>is the OTP to login/sign up Farmer's Palm into your account. It is valid for 5 minutes.</p>
            <p>DO NOT disclose it to anyone for security reasons.</p>
            <br>
            <br>
            <br>
            <h6>©️ All right's reserved - 2023</h6>
        </div>
    </body>
    </html>`)
}