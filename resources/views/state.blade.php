@extends('layouts.header')

@section('title', 'Exact State')

@section('page_content')

<script>
var BASE_URL = '{{BASE_URL}}';
</script>
<script src="js/jquery.validate.min.js"> </script>  
<script src="/js/state/state.js"></script>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-lg-8">
        <h2>State List</h2>
    </div>
    <div class="col-lg-4">
        <div class="title-action">
            <button type="button" class="btn btn-primary" onclick="show_stateform();">
                <i class="fa fa-plus"></i> Add State
            </button>
        </div>
    </div>
</div>
<div class="wrapper wrapper-content animated fadeInUp">
    <div class="row">
        <div class="col-lg-12">

            <div class="ibox">
                <div class="ibox-content">
                    <div class="project-list">                        
                        
                    </div>

                    <div class="ibox-content display-none" id="dv_project_form">
                        <form class="state-form" method="POST" action="{{BASE_URL}}state/save">
                            @csrf
                            <div class="form-group row">
                                <label class="col-lg-2 col-form-label">State Name</label>
                                <div class="col-lg-4">
                                    <input type="text" name="state_name" placeholder="State Name" class="form-control"> 
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <div class="i-checks">
                                        <label> Active <input type="checkbox" value="1" name="active"> </label></div>
                                </div>
                            </div>
                            <div class="button-section">
                                <button type="submit" class="btn btn-primary float-right">Save changes</button>
                                <button type="button" onclick="backtolist()" class="btn btn-outline btn-default float-right m-r-xs" data-dismiss="modal">Close</button>
                                <img src="img/loader.gif" id="imgLoader" class="float-right img-loader display-none">
                            </div>
                            <br/>
                            <div class="form-group col-md-5">
                                <div id="dvResponseMsg" class="display-none alert alert-success">
                                    <span id="ResponseMsgTxt"></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection