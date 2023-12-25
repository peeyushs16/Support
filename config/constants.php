<?php

if($_SERVER['HTTP_HOST'] == '127.0.0.1:8000'){
    define('BASE_URL', 'http://127.0.0.1:8000/');
}else{
    define('BASE_URL', 'http://localhost:8080/AdminPanel/');  
}


define('APP_TOKEN', 'EXACTIT');