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
    $('#dvResponseMsg').hide();
    $('#ResponseMsgTxt').html('');
    
    $('#imgLoader').show();
    $('.button-section button').prop('disabled', true);

    $.ajax({
        type: 'POST',
        url: $('.state-form').attr('action'),
        data: form_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(response) {
            $('#imgLoader').hide();
            $('.button-section button').prop('disabled', false);

            if(response.success){
                $('#dvResponseMsg').addClass("alert-success");
                $('#dvResponseMsg').removeClass("alert-danger");
                $('#dvResponseMsg').show();
                $('#ResponseMsgTxt').html(response.result);
                        
                setTimeout(() => {
                    getstatelist();
                    $('.state-form').trigger('reset');
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

function getstatelist(){
    backtolist();
    $.ajax({
        type: 'GET',
        url: BASE_URL+`state/getlist`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
        },
        success: function(response) {
            $('.project-list').html(response);

            $('#tblStateList').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }
    });
}

function edit_state(state_id){
    show_stateform();
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

            $('.state-form').attr('action', BASE_URL+`state/update/`+state_id)
        }
    });
}

function delete_state(state_id){
    if(confirm("Are you sure you want to delete?")){
        $.ajax({
            type: 'DELETE',
            url: BASE_URL+`state/delete_state/`+state_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer "+ API_TOKEN);
            },
            success: function(response) {            
                $('input[name="state_name"]').val(response.state_name);
                $('input[name="active"]').prop('checked', false);
                if(response.active == 1){
                    $('input[name="active"]').prop('checked', true);
                }
                $('#tr_state_'+state_id).remove();
                backtolist();
            }
        });  
    }
}

function show_stateform(){    
    $('#dvResponseMsg').hide();
    $('#ResponseMsgTxt').html('');

    $('.state-form').trigger('reset');
    $('.state-form').attr('action', BASE_URL+`state/save`)

    $('.project-list').hide();
    $('#dv_project_form').show();
}

function backtolist(){
    $('.project-list').show();
    $('#dv_project_form').hide();
}