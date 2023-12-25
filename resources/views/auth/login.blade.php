<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>EMIS Login Panel</title>
        <link href="{{ assetpublic('css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ assetpublic('font-awesome/css/font-awesome.css') }}" rel="stylesheet">

        <link href="{{ assetpublic('css/animate.css') }}" rel="stylesheet">
        <link href="{{ assetpublic('css/style.css') }}" rel="stylesheet">
        <script src="{{ assetpublic('js/jquery-2.1.1.js') }}"></script>
        <script>

            function login(){
                username = $('input[name=username]').val();
                password = $('input[name=password]').val();

                $.ajax({
                    type: 'POST',
                    url: "<?= BASE_URL ?>process_login",
                    data: {username,password},
                    dataType: "text",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(resultData) {
                        var response = $.parseJSON(resultData);

                        if(!response.success){
                            // Display validation errors
                            $.each(response.message, function (key, value) {
                                $('#form-error').append("<p>"+value[0]+"</p>");
                            });
                        }else{
                            window.location.href = "<?= BASE_URL ?>home";
                        }
                    }
                });

            }
        </script>
    </head>

    <body class="gray-bg">

    <div class="loginColumns animated fadeInDown">
        <div class="row">

            <div class="col-md-6">
                <h2 class="font-bold">Welcome to IN+</h2>
                <p>
                    <img src="{{ assetpublic('img/emis-icon.png') }}" alt="logo" style="width: 30%;margin-bottom: 20px;margin-top:5%;"/>
                </p>
            </div>
            <div class="col-md-6">
                <div class="ibox-content">
                    <form class="m-t" name="quickLookForm" role="form" onsubmit="return false" method="post" action="#" autocomplete="off" >
                        @csrf
                        <div class="form-group">
                            <input value="peeyush" id="txtUser" type="text" class="form-control" autocomplete="off" name="username" placeholder="Username" maxlength="30">
                            <span id="username-error" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <input value="peeyush@123" id="txtPassword" type="password" maxlength="30" name="password" autocomplete="off" class="form-control" placeholder="Password">
                            <span id="password-error" class="error-message"></span>
                        </div>
                        <button type="submit" onclick="login()" class="btn btn-primary block full-width m-b">Login</button>
                        

                        <a href="#">
                            <small>Forgot password?</small>
                        </a>

                        <p class="text-muted text-center">
                            <small>Do not have an account?</small>
                        </p>

                        <span id="form-error" class="error-message"></span>
                    </form>
                </div>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-6">
                Copyright Company
            </div>
            <div class="col-md-6 text-right">
               <small>© 2014-2015</small>
            </div>
        </div>
    </div>

</body>

</html>