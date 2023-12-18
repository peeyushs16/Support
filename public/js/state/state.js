
$(document).ready(function(){

    getstatelist();

    $('.state-form').validate({
        rules:{
            state_name : {
                required : true,
                minlength : 3,
                maxlength : 100
            },
            active : {
                required : true
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

    state_name = $('input[name=state_name]').val();
    active = $('input[name=active]').val();


    $.ajax({
        type: 'POST',
        url: BASE_URL+`state/save`,
        data: form_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(response) {
            if(response.success){
                $('#dvResponseMsg').addClass("alert-success");
                $('#dvResponseMsg').removeClass("alert-danger");
                $('#dvResponseMsg').show();
                $('#ResponseMsgTxt').html(response.result);
            }else{
                $('#dvResponseMsg').removeClass("alert-success");
                $('#dvResponseMsg').addClass("alert-danger");
                $('#dvResponseMsg').show();

                $.each(response.result, function (key, value) {
                    $('#ResponseMsgTxt').html("<p>"+value[0]+"</p>");
                });
            }
        }
    });

}

function getstatelist(){
    $.ajax({
        type: 'GET',
        url: BASE_URL+`state/getlist`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(response) {
            $('#tblStateList tbody').html(response);

            $('#tblStateList').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            } );
        }
    });
}

function edit_state(state_id){
    $.ajax({
        type: 'GET',
        url: BASE_URL+`state/edit_state/`+state_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(response) {
            
            $('input[name="state_name"]').val(response.state_name);

            $('input[name="active"]').prop('checked', false);
            if(response.active == 1){
                $('input[name="active"]').prop('checked', true);
            }
        }
    });
}