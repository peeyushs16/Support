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
                    <div class="project-list"  style="display: none;">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <td class="project-status">
                                        <span class="label label-primary">Active</span>
                                    </td>
                                    <td class="project-title">
                                        <a href="project_detail.html">Contract with Zender Company</a>
                                        <br />
                                        <small>Created 14.08.2014</small>
                                    </td>
                                    <td class="project-completion">
                                        <small>Completion with: 48%</small>
                                        <div class="progress progress-mini">
                                            <div style="width: 48%;" class="progress-bar"></div>
                                        </div>
                                    </td>
                                    <td class="project-people">
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a3.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a1.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a2.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a4.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a5.jpg"></a>
                                    </td>
                                    <td class="project-actions">
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> View </a>
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Edit </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="project-status">
                                        <span class="label label-primary">Active</span>
                                    </td>
                                    <td class="project-title">
                                        <a href="project_detail.html">There are many variations of passages</a>
                                        <br />
                                        <small>Created 11.08.2014</small>
                                    </td>
                                    <td class="project-completion">
                                        <small>Completion with: 28%</small>
                                        <div class="progress progress-mini">
                                            <div style="width: 28%;" class="progress-bar"></div>
                                        </div>
                                    </td>
                                    <td class="project-people">
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a7.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a6.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a3.jpg"></a>
                                    </td>
                                    <td class="project-actions">
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> View </a>
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Edit </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="project-status">
                                        <span class="label label-default">Unactive</span>
                                    </td>
                                    <td class="project-title">
                                        <a href="project_detail.html">Many desktop publishing packages and web</a>
                                        <br />
                                        <small>Created 10.08.2014</small>
                                    </td>
                                    <td class="project-completion">
                                        <small>Completion with: 8%</small>
                                        <div class="progress progress-mini">
                                            <div style="width: 8%;" class="progress-bar"></div>
                                        </div>
                                    </td>
                                    <td class="project-people">
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a5.jpg"></a>
                                        <a href="#"><img alt="image" class="rounded-circle" src="img/a3.jpg"></a>
                                    </td>
                                    <td class="project-actions">
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> View </a>
                                        <a href="#" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Edit </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="ibox-content" id="dv_project_form">
                        <!-- <form onsubmit="return false"  action="{{BASE_URL}}api/state/save" method="POST"> -->
                        <form class="state-form" method="POST">
                            @csrf
                            <p>Sign in today for more expirience.</p>
                            <div class="form-group row">
                                <label class="col-lg-2 col-form-label">State Name</label>
                                <div class="col-lg-4">
                                    <input type="text" name="state_name" placeholder="State Name" class="form-control"> 
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <div class="i-checks">
                                        <label> <input type="checkbox" value="1" name="active"> Active </label></div>
                                </div>
                            </div>
                            <div>
                            <!-- onclick="save_state()" -->
                                <button  type="submit" class="btn btn-primary float-right">Save changes</button>
                                <button type="button" class="btn btn-grey  float-right m-r-xs" data-dismiss="modal">Close</button>
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