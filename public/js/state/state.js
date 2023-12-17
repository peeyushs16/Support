
$(document).ready(function(){


    $('.state-form').validate({
        rules:{
            state_name : {
                required : true,
                minlength : 3,
                maxlength : 100
            }
        }
    });

    $('.state-form').on("submit", function(e){
        e.preventDefault();

        if(!$('.state-form').valid()){
            return;
        }

        save_state();


    });
});


function save_state(){    
    let form_data = $('.state-form').serialize();
    console.log('form_data',form_data);

    state_name = $('input[name=state_name]').val();
    active = $('input[name=active]').val();


    $.ajax({
        type: 'POST',
        url: BASE_URL+`state/save`,
        data: form_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(resultData) {
            // var response = $.parseJSON(resultData);
            // console.log(response);
            // if(!response.success){
            //     // Display validation errors
            //     $.each(response.message, function (key, value) {
            //         $('#form-error').append("<p>"+value[0]+"</p>");
            //     });
            // }else{
            //     alert('login');
            //     window.location.href = "<?= BASE_URL ?>home";
            // }
        }
    });

}