@extends('layouts.header')

@section('title', 'Exact State')

@section('page_content')

<script>
var BASE_URL = '{{BASE_URL}}';
</script>
<script src="js/jquery.validate.min.js"> </script>  
<script src="/js/state/state.js"></script>
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-sm-4">
        <h2>State list {{BASE_URL}}</h2>
    </div>
</div>
<div class="wrapper wrapper-content animated fadeInUp">
    <div class="row">
        <div class="col-lg-12">

            <div class="ibox">
                <div class="ibox-title">
                    <h5>All projects assigned to this account</h5>
                    <div class="ibox-tools">   
                        <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#state">
                            Create new state
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="project-list">
                        
                        <table class="table table-hover" id="tblStateList">
                            <thead>
                                <tr>
                                    <td>State Name</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div class="ibox-content" id="dv_project_form">
                        <form class="state-form" method="POST">
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
                            <div>
                                <button  type="submit" class="btn btn-primary float-right">Save changes</button>
                                <button type="button" class="btn btn-outline btn-default  float-right m-r-xs" data-dismiss="modal">Close</button>
                            </div>
                            <br/>
                            <div class="form-group col-md-5">
                                <div id="dvResponseMsg" class="pace-inactive alert alert-success alert-dismissable">
                                    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
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


<div class="modal inmodal" id="state" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content animated fadeIn">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
                    
            </div>
        </div>
    </div>
</div>

@endsection