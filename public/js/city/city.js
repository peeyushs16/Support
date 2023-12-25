$(document).ready(function(){
    getcitylist();

    $('.city-form').validate({
        rules:{
            city_name : {
                required : true,
                minlength : 3,
                maxlength : 100
            },
            state_id : {
                required : true
            },
            active : {
                required : true
            }
        }
    });

    $('.city-form').on("submit", function(e){
        e.preventDefault();
        if(!$('.city-form').valid()){
            return;
        }
        save_city();
    });
});

function removeErrorMessages(fieldName) {
    // Assuming error messages are displayed in a container with the class 'error-container'
    $('.error-container[data-field="' + fieldName + '"]').html('');
}

function save_city(){    
    let form_data = $('.city-form').serialize();
    city_name = $('input[name=city_name]').val();
    active = $('input[name=active]').val();
    $('#dvResponseMsg').hide();
    $('#ResponseMsgTxt').html('');
    
    $('#imgLoader').show();
    $('.button-section button').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: $('.city-form').attr('action'),
        data: form_data,
        success: function(response) {
            $('#imgLoader').hide();
            $('.button-section button').prop('disabled', false);

            if(response.success){
                $('#dvResponseMsg').addClass("alert-success");
                $('#dvResponseMsg').removeClass("alert-danger");
                $('#dvResponseMsg').show();
                $('#ResponseMsgTxt').html(response.result);
                        
                setTimeout(() => {
                    getcitylist();
                    $('.city-form').trigger('reset');
                }, 2000);
            }else{
                $('#dvResponseMsg').removeClass("alert-success");
                $('#dvResponseMsg').addClass("alert-danger");
                $('#dvResponseMsg').show();
                $.each(res.result, function (key, value) {
                    $('#ResponseMsgTxt').html("<p>"+value[0]+"</p>");
                });
            }
            
        },
        error:function(XMLHttpRequest){
            $('#imgLoader').hide();
            $('.button-section button').prop('disabled', false);

            $('#dvResponseMsg').removeClass("alert-success");
            $('#dvResponseMsg').addClass("alert-danger");
            $('#dvResponseMsg').show();
            $.each(XMLHttpRequest.responseJSON.result, function (key, value) {
                $('#ResponseMsgTxt').html("<p>"+value[0]+"</p>");
            });
        }
    });

}

function getcitylist(){
    backtolist();
    $.ajax({
        type: 'GET',
        url: BASE_URL+`city/getlist`,
        success: function(response) {
            $('.project-list').html(response);

            $('#tblcityList').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }
    });
}

function edit_city(city_id){
    show_cityform();
    $.ajax({
        type: 'GET',
        url: BASE_URL+`city/edit_city/`+city_id,
        success: function(response) {            
            $('input[name="city_name"]').val(response.city_name);
            $('#state_id').val(response.state_id);
            $('input[name="active"]').prop('checked', false);
            if(response.active == 1){
                $('input[name="active"]').prop('checked', true);
            }

            $('.city-form').attr('action', BASE_URL+`city/update/`+city_id)
        }
    });
}

function delete_city(city_id){
    
    if(confirm("Are you sure you want to delete?")){
        $.ajax({
            type: 'DELETE',
            url: BASE_URL+`city/delete_city/`+city_id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
            success: function(response) {            
                $('input[name="city_name"]').val(response.city_name);
                $('input[name="active"]').prop('checked', false);
                if(response.active == 1){
                    $('input[name="active"]').prop('checked', true);
                }
                $('#tr_city_'+city_id).remove();
                backtolist();
            }
        });  
    }
}

function show_cityform(){    
    $('#dvResponseMsg').hide();
    $('#ResponseMsgTxt').html('');

    $('.city-form').trigger('reset');
    $('.city-form').attr('action', BASE_URL+`city/save`)

    $('.project-list').hide();
    $('#dv_project_form').show();
}

function backtolist(){
    $('.project-list').show();
    $('#dv_project_form').hide();
}