<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>EMIS Login Panel</title>

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/font-awesome/css/font-awesome.css" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="css/myalert.css"/>

        <link href="css/animate.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

        <script src="js/jquery-2.1.1.js"></script>
        <script src="js/myalert.js" type="text/javascript"></script>

        <style>
            .loginbox-shadow{
                box-shadow: 5px 10px 15px 5px #aaaaaa;
                padding:0px;
            }
        </style>
    </head>

    <div class="myalert"></div>
    <body class="gray-bg bgimg">
        
        <div class="loginColumns animated fadeInDown">
            <div class="row">

                <div class="col-md-12 loginbox-shadow" style="background-color: #220b6c;">
                    <div class="col-md-6">
                        <p class="text-center">
                            <img src="img/emis-icon.png" alt="logo" style="width: 30%;margin-bottom: 20px;margin-top:25%;"/>
                            <br/><br/>
                            <img src="img/emis.png" alt="logo" style="width: 55%;"/>
                        </p>
                    </div>
                    <div class="col-md-6 p-rt">
                        <div class="ibox-content">
                            <h3 class="theme-color font-bold">
                                LOG IN
                            </h3>
                            <br/>
                            <form class="m-t" name="quickLookForm" role="form" method="post" action="login-user" autocomplete="off" >
                            @csrf
                               <div class="form-group">
                                    <input id="txtUser" type="text" class="form-control" autocomplete="off" name="userName" placeholder="Username" maxlength="30">
                                    @error('userName')
                                        {{$message}}
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <input id="txtPassword" type="password" maxlength="30" name="password" autocomplete="off" class="form-control" placeholder="Password">
                                    @error('password')
                                        {{$message}}
                                    @enderror
                                </div>
                                <input name="Submit" type="submit" value="SUBMIT" id="btnLogin" class="btn btn-success block full-width m-b">

                                <a href="forgot_password.php" class="theme-color font-bold">
                                    <small>Forgot password?</small>
                                </a> 

                                <div style="height: 50px; margin: 20px;">&nbsp;</div>

                            </form>                    
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="col-md-6">&nbsp;</div>
                <div class="col-md-6 text-right theme-color font-bold">
                    <small>© Formbay</small>
                </div>
            </div>
        </div>

    </body>

</html>