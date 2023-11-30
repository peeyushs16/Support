function Myalert(param)
{
    
    var type = param['type'];
    var message = param['message'];
    var sdTime = param['slideDown'];
    var supTime = param['slideUp'];
    var timeout = 4000;

    if(timeout==null || timeout=="")
    {
        timeout = 5000;
    }

    if(message==null||message=='')
    {
        message="Hello World";
    }

    $j('.myalert').removeClass('bg-success bg-danger bg-warning bg-info bg-dark');
    
    if(type=="success")
    {
        
        $j('.myalert').addClass('bg-success');
        
        $j('.myalert').html('<div class="text-center text-alert text-light"><strong><p>'+message+'</p></strong></div>');

    }
    else if(type=="danger")
    {
        $j('.myalert').addClass('bg-danger');
        $j('.myalert').html('<div class="text-center text-alert text-light"><strong><p>'+message+'</p></strong></div>');
    }
    else if(type=="info")
    {
        $j('.myalert').addClass('bg-info');
        $j('.myalert').html('<div class="text-center text-alert text-light"><strong><p>'+message+'</p></strong></div>');
    }
    else if(type=="warning")
    {
        $j('.myalert').addClass('bg-warning');
        $j('.myalert').html('<div class="text-center text-alert text-light"><strong><p>'+message+'</p></strong></div>');
    }
    else
    {
        $j('.myalert').addClass('bg-dark');
        $j('.myalert').html('<div class="text-center text-alert text-light"><strong><p>'+message+'</p></strong></div>');
    }

    $j('.myalert').slideDown(sdTime);
        setTimeout(function(){
            $j('.myalert').slideUp(supTime);
        },timeout)
}
