function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++)
            if (this[i] == obj)
                return i;
        return -1;
    }
}
//Array.prototype.insertAt = function (i,el){ return this.splice(i,0,el); }
//Array.prototype.deleteAt = function (i){return this.splice(i, 1); }
//VIP
String.prototype.splitByComma = function () {
    var orig = this.split(/[,;]/g);
    var arr = new Array();
    for (var i = 0; i < orig.length; i++) {
        var p = $.trim(orig[i]).toLowerCase();
        p = p.replace(/[^a-z0-9- ]/g, '');
        if (p)
            arr.push(p)
    }
    return arr;
}
if (!window.JSON) {
    JSON = {parse: function (s) {
            return $j.parseJSON(s);
        }, stringify: function (s) {
            return $j.toJSON(s);
        }};
}
function now() {
    return (new Date()).getTime();
}
function dtStr(d) {
    return d.toString().substr(0, 4) + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
}
;
function dtTimeStr(d) {
    var h = d.getHours();
    if (h >= 12) {
        h = h - 12;
        var a = 'pm';
    } else
        var a = 'am';
    var m = d.getMinutes();
    if (m < 10)
        m = "0" + m;
    return d.toString().substr(0, 4) + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ", " + h + ":" + m + a;
}
;
function usd(flt) {
    return (Math.round(flt * 100) / 100).toFixed(2);
}
;
function isArray(ob) {
    return (ob.constructor.toString().indexOf('Array') > -1)
}
function log(str) {
    try {
        console.log(str);
    } catch (e) {
        if (typeof str == "string")
            str = $j.toJSON(str);
        $j('#footer .debug').append(str + "<br/>");
    }
}
function check(ob) {
    return (ob)
}
function checkFalse(ob) {
    return (!ob)
}
function getProps(ob) {
    var a = [];
    for (k in ob)
        a.push(k);
    return a;
}
function hasProps(ob) {
    var n = 0;
    for (k in ob)
        n++;
    return (n);
}
function cloneObject(what) {
    for (i in what) {
        if (typeof what[i] == 'object')
            this[i] = new cloneObject(what[i]);
        else
            this[i] = what[i];
    }
}
function concatArraysInOb(ob) {
    var baseArray = [];
    for (k in ob)
        if (isArray(ob[k]))
            baseArray = baseArray.concat(ob[k]);
        else
            baseArray = baseArray.concat(concatArraysInOb(ob[k]));
    return baseArray;
}
function cleanSpaces(str) {
    //str=str.replace(/  */g,' ').replace(/\n\n*/g,"\n");
    str = str.replace(/^\s+|\s+$/g, '');
    if (str.substr(0, 1) == "\n")
        str = str.substr(1);
    if (str.substr(-1, 1) == "\n")
        str = str.substr(0, str.length - 1);
    return str;
}
function convert_to_24h(time_str) {
    // Convert a string like 10:05:23 PM to 24h format, returns like [22,5,23]
    var time = time_str.match(/(\d+):(\d+):(\d+) (\w)/);
    var hours = Number(time[1]);
    var minutes = Number(time[2]);
    var seconds = Number(time[3]);
    var meridian = time[4].toLowerCase();

    if (meridian == 'p' && hours < 12) {
        hours = hours + 12;
    } else if (meridian == 'p' && hours == 12) {
        hours = 0;
    }
    else if (meridian == 'a' && hours == 12) {
        hours = hours - 12;
    }

    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    var sSeconds = seconds.toString();
    if (hours < 10)
        sHours = "0" + sHours;
    if (minutes < 10)
        sMinutes = "0" + sMinutes;
    if (seconds < 10)
        sSeconds = "0" + sSeconds;

    var returnFrmt = sHours + ":" + sMinutes + ":" + sSeconds
    return returnFrmt;
}
function trimWord(str, n) {
    //log("trimming " + str);
    if (str.length < n)
        return str;
    var a = str.substr(0, n - 1);
    var b = trimWord(str.substr(n - 1), n);
    log(b);
    return a + "- " + b;
}
function trimWordLen(str, n) {
    str = cleanSpaces(str);
    var lines = str.split(/\n/g);
    var ss = "";
    for (var k = 0; k < lines.length; k++) {
        //log(k); log(lines[k]);
        var words = lines[k].split(/ /g);
        log(words);
        for (var j = 0; j < words.length; j++)
            ss += trimWord(words[j], n) + " ";
        ss += "\n";
    }
    return cleanSpaces(ss);
}
function nl2br(str) {
    return cleanSpaces(str).replace(/\n/g, "<br/>");
}


function removeDummyVars(what) {
    for (i in what) {
        if (i == 'dummy')
            return {};
        else if (typeof what[i] == 'object')
            what[i] = removeDummyVars(what[i]);
    }
    return what;
}
function getSelText() {
    if (window.getSelection)
        return window.getSelection();
    if (document.getSelection)
        return document.getSelection();
    if (document.selection)
        return document.selection.createRange().text;
    return null;
}
function ai(ob, propName, rif) { //return value of propName or rif.propname==false if not contained
    if (propName in ob)
        return ob[propName];
    return rif;
}
obAddByKey = function (ob, k, val) {
    if (ob[k] == undefined)
        ob[k] = [val];
    else
        ob[k].push(val);
}
function jumpTo(url) {
    window.location = url;
}
function swapDisplay() {
    var h = $j(this).html();
    $j(this).hide().html($j(this).attr('swap_txt')).fadeIn();
    $j(this).attr('swap_txt', h);
}
function implode(delimiter, arr) {
    var str = "";
    $j.each(arr, function (k, v) {
        v = $j.trim(v);
        if (k > 0)
            str += delimiter + v;
        else
            str += v;
    });
    return str;
}
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}
function validPosInt(e) { //assigned to onFocus
    var orig = $j(this).val();
    $j(this).unbind('change').bind('change', e.data, function (ev) {
        var el = $j(this);
        var val = $j.trim(el.val());
        var blankOk = ev.data.blankOk;
        var updateTotalCell = ai(ev.data, 'updateTotalCell', false);
        if (!val) { //user entered blank field 
            if (!blankOk) {
                alert('Value must not be blank');
                el.val(orig);
            }
            return null;
        }
        if (val.search(/[^0-9]/g) != -1) {
            el.val(orig);
            alert('Value must be an integer > 0');
            return null;
        }
        if (typeof updateTotalCell == "function")
            return updateTotalCell(el, val);
        return true;
    });
}
function updateTotalCell(el, val) {
    var scope = el.parent().parent();
    var price = $j.trim($j('.price_cell', scope).text());
    price = price.substr(1, price.length - 1).replace(',', '');
    var newTotal = (parseFloat(val) * price).toFixed(2);
    $j('.total_cell', scope).text('$' + addCommas(newTotal));
    var grandTotal = 0;
    $j('.total_cell').each(function (k, v) {
        var total = $j.trim($j(v).text());
        total = total.substr(1, total.length - 1).replace(',', '');
        grandTotal += parseFloat(total);
    });
    $j('.grand_total_cell').text('$' + addCommas(grandTotal.toFixed(2)));
    return true;
}
function validPosFloat(e) { //assigned to onFocus
    var orig = $j(this).val();
    //log('validPosInt');
    $j(this).unbind('change').bind('change', e.data, function (ev) {
        var el = $j(this);
        var val = $j.trim(el.val());
        var blankOk = ev.data.blankOk;
        if (!val) { //user entered blank field 
            if (!blankOk) {
                alert('Value must not be blank');
                el.val(orig);
            }
            return null;
        }
        if (val.search(/^[0-9]*\.?[0-9]+$/g) == -1) {
            el.val(orig);
            alert(val + ' Value must be number > 0');
            return null;
        }
        return true;
    });
}

function validhtmlspecialchars(str){
    
//    if((/[<>|&;$%@'"\'\"{}()?+,\\//]/.test(str))){
//        return 'Invalid';
//    }else{
//        return 'Valid';
//    }
//     ",","&",  "'", 
    var InvalidChar = ["|", ";", "$", "%", "@",'"', "\\'", '\\"', "e<>", "()", "+", "<", ">",  "\\"];
    
    var fl = 0; 
    for(var i = 0; i < InvalidChar.length; i++){
        var n = str.includes(InvalidChar[i]);
        
        if(n == true){
            fl = 1;
        }
    }
    
    return fl;
}

function waitMsg() {
    $j('#wrap,#footer').hide();
    $j('#loader').fadeIn();
}
function replaceWithLoader(el, prepend) { //the element to hide and replace with an animated loader
    var pt = $j(el).hide().parent();
    if (prepend == true)
        pt.prepend("<img class='loader' style='margin:3px;' src='img/loader.gif'>");
    else
        pt.append("<img class='loader' style='margin:3px;' src='img/loader.gif'>");
    return $j("img.loader", pt);
}
$j.extend(xApp, {
    pageVars: null,
    userPrefDefaults: {
        "showImages": {
            "def": "no",
            "no": "Display Images",
            "yes": "Hide Images"
        }
    },
    gotoStep: function (stepNum, containerID, func) {
        //visual only
        var scope = $j('#' + containerID);
        $j('.stepContainer', scope).hide();
        $j('.step' + stepNum.toString(), scope).fadeIn();
        $j('.stepTab', scope).removeClass('stepOn').eq(stepNum - 1).addClass('stepOn');
        if (func)
            if (typeof xApp[func] == 'function')
                xApp[func]();
    },
    jumpByVal: function () {
        var val = $j.trim($j('#' + $j(this).attr('txt_field')).val());
        if (!val)
            return null;
        window.location = $j.trim($j(this).attr('jump_to')) + escape(val);
    },
    enablePassVar: function () {
        var val = $j(this).attr('value');
        var trigFunc = $j(this).attr('trigger');
        xApp[trigFunc](val);
    },
    lastTimer: null,
    lastSearchStr: null,
    lastSearchFunc: null,
    //pick list related methods
    buildPickList: function (listID, items, refVar) {
        var pickList = '';
        var cntr = 0;
        $j.each(items, function (k, v) {
            if (!ai(refVar, k, false))
                pickList += '<li val=' + k + '  onclick="xApp.picked(this,\'' + k + '\');">' + v + '</li>';
            else
                pickList += '<li val=' + k + ' class="picked" onclick="xApp.picked(this,\'' + k + '\');">' + v + '</li>';
            cntr++;
        });
        if (pickList) {
            $j('.match[forff=' + listID + ']').show();
            $j('.noMatch[forff=' + listID + ']').hide();
        }
        else {
            $j('.match[forff=' + listID + ']').hide();
            $j('.noMatch[forff=' + listID + ']').show();
        }
        $j('#' + listID).html(pickList);
        return cntr;
    },
    picked: function (el, val) {
        var pickEl = $j(el).parent();
        var refVar = pickEl.data('refVar');
        var pickID = pickEl.attr('id');
        if (ai(refVar, val, false))
            return null;

        $j('.dropList[forff=' + pickID + ']')
                .append('<li class=\'none\' onclick="xApp.unpicked(this,\'' + val + '\');">' + $j(el).html() + '</li>').children().fadeIn();
        refVar[ val ] = $j(el).html();
        $j(el).addClass('picked');
        $j('.nonePicked[forff=' + pickID + ']').hide();
        $j('.somePicked[forff=' + pickID + ']').fadeIn();

        //trigger any functions we have to call upon a pick
        var trigFunc = pickEl.attr('trigger');
        if (trigFunc)
            xApp[trigFunc]();
    },
    unpicked: function (el, val) {
        var pickEl = $j('#' + $j(el).parent().attr('forff'));
        var refVar = pickEl.data('refVar');
        var pickID = pickEl.attr('id');
        delete refVar[val];
        //in case the removed item should be on the curretly displayed list from the pick list
        $j('[val=' + val + ']').removeClass('picked');
        $j(el).fadeOut(0, function () {
            $j(this).remove()
        });

        if (getProps(refVar).length == 0) {
            $j('.somePicked[forff=' + pickID + ']').hide();
            $j('.nonePicked[forff=' + pickID + ']').fadeIn();
        }
        //trigger any functions we have to call upon an unpick 
        var trigFunc = $j(el).parent().attr('trigger');
        if (trigFunc)
            xApp[trigFunc]();
    },
    pickAll: function (el) {
        $j('#' + $j(el).attr('forff')).children().each(function (k, v) {
            $j(v).trigger('click');
        });
    },
    unpickAll: function (el) {
        $j('.dropList[forff=' + $j(el).attr('forff') + ']').children().each(function (k, v) {
            $j(v).trigger('click');
        });
    },
    /* end pick list methods */

    onTopNavClick: function () {
        $j(".subCatGroup").hide();
        var subCatDiv = $j(this).attr("reveal");
        $j("#" + subCatDiv).fadeIn();
    },
    validateForm: function (frm, fieldNames) {
        var ok = true;
        var params = {};
        $j.each(fieldNames, function (i, fn) {
            var f = $j("#" + fn);
            var req = (f.hasClass("req"));
            var pattern = f.attr("pattern");
            var fs = f.parents(".fs");
            var val = $j.trim(f.val());
            if (!val && req) {
                $j("label", fs).addClass("err");
                ok = false;
            }
            params[fn] = val;
        });
        if (!ok) {
            $j(".errMsg", frm).fadeIn();
            return false
        }
        return params;
    },
    applyOnFocus: function (els, btnID) {
        els.unbind('focus').bind('focus', function () {
            var _this = $j(this);
            $j(this).keypress(function (e) {
                if (e.which == 13) {
                    //switch off the listener to avoid double click
                    _this.trigger('blur');
                    $j('#' + btnID).trigger('click');
                }
            });
        }).unbind('blur').bind('blur', function () {
            $j(this).unbind('keypress');
        });
    },
    frmSubmit_start: function (frm, msg) {
        //log('test in frmSubmit_start');
        $j(".errMsg, .ajaxOkMsg, .ajaxErrMsg, div.fs", frm).hide();
        $j("label", frm).removeClass("err");
        $j(".progressMsg", frm).html(msg).fadeIn();
        xApp.lastFrmSubmit = frm;
    },
    frmSubmit_end: function (passThru) {
        $j(".progressMsg", xApp.lastFrmSubmit).hide();
        return passThru;
    },
    frmSubmit: function (frm, startMsg, fs, xtraParams, restFile, onSuccess, onFail, onError) {
        xApp.frmSubmit_start(frm, startMsg);
        var params = xApp.validateForm(frm, fs);
        if (!params) {
            $j("div.fs", frm).fadeIn();
            return xApp.frmSubmit_end(false);
        }
        if (xtraParams)
            params = $j.extend(params, xtraParams);
        $j.ajax({
            type: "POST", url: "REST/" + restFile,
            dataType: 'json', data: {json: $j.toJSON(params), nonce: (new Date()).getTime()},
            complete: xApp.frmSubmit_end,
            success: function (json) {
                if (json.status) {
                    $j(".ajaxOkMsg", frm).html(json.msg).fadeIn();
                    xApp.holdJSON = json;
                    $j(".modalOkBtn", frm).show().select().parent().fadeIn();
                    setTimeout(function () {
                        onSuccess(json);
                    }, 1000);
                }
                else {
                    xApp.holdErr = json;
                    $j(".ajaxErrMsg", frm).html(json.msg).fadeIn();
                    $j("div.fs", frm).fadeIn();
                    if (onFail)
                        setTimeout(function () {
                            onFail(json);
                        }, 1000);
                }
            },
            error: function (a, b, c) {
                xApp.holdErr = [a, b, c];
                $j(".ajaxErrMsg", frm).html("Ajax Error. Oh no!").fadeIn();
                if (onError)
                    onError();
            }
        });
        return params;
    },
    modalOk: function () { //closes a the modal form the button is in
        $j(this).parents(".modalWrapperDiv").eq(0).data("overlay").close();
    },
    showModError: function (elToSel, msg) {
        $j('#modErrorDiv .msg').html(msg);
        xApp.modErrSelOnClose = elToSel;
        xApp.modErr.load();
    },
    /* COMMON SHOPPING CART METHODS */
    onAddBtnHover: function () {
        var blk = $j(this).parents("div.item_block");
        $j(".qtyWrap", blk).fadeIn();
    },
    onAddBtnClick: function () {
        var blk = $j(this).parents("div.item_block");
        var qtyField = $j('.qtyField', blk);
        var qty = $j.trim(qtyField.val());
        if (!qty || qty == "0" || qty.search(/[^0-9]/g) != -1)
            return xApp.showModError(qtyField, "Invalid qty entered.<br/>Qty must be a number greater than 0");

        //hide the controls	to minimize accidental double click
        $j(this).css('visibility', 'hidden').removeClass('push').html("<img class='loader' style='margin:8px 40px 0 0;' src='img/loader.gif'>").css('visibility', 'visible').unbind("mouseover").unbind("click");

        $j('.qtyWrap', blk).hide();

        var sel = $j('select.itemAttr', blk);
        if (sel.length)
            var nmbr = sel.val();
        else
            var nmbr = blk.attr('nmbr');
        var uom = $j('div[item_uom]', blk).attr('item_uom');
        xApp.addToCart(blk, nmbr, uom, qty);
    },
    onItemAttrChange: function () {
        var newNmbr = $j(this).val();
        var blk = $j(this).parents("div.item_block");
        //log(newNmbr);
        $j("[nmbr]", blk).attr("nmbr", newNmbr);
        $j(".item_nmbr", blk).html(newNmbr);

        //check if there are inCartQtys for the newNmbr
        $j("div.itemInCartDiv", blk).children().hide();
        $j("div[incart_nmbr=" + newNmbr + "]", blk).fadeIn(); //if any

    },
    //set listener on qty field - only in shopping cart or order page
    applyCartListeners: function () {
        $j('.del.btn').bind('click', xApp.removeFromCart);
        $j('input.qtyField').bind('change', xApp.onQtyChange);
    },
    offCartListeners: function () {
        $j('.del.btn').unbind('click');
        $j('input.qtyField').unbind('change');
    },
    onQtyChange: function () {
        var blk = $j(this).parents("div.cartItem");
        var qtyField = $j('.qtyField', blk);
        var qty = $j.trim(qtyField.val());
        if (!qty || qty.search(/[^0-9]/g) != -1) {
            qtyField.val(qtyField.attr('orig_val'));
            return xApp.showModError(qtyField, "Invalid qty entered.<br/>Qty must be a number greater than 0");
        }

        if (parseInt(qty) > 999) {
            qtyField.val(qtyField.attr('orig_val'));
            return xApp.showModError(qtyField, "Invalid qty entered.<br/>Qty must not exceed 999.  For large orders, please contac customer service.");
        }

        if (qty == 0) {
            //send to remove
            $j(".del.btn", blk).trigger("click");
            return true;
        }

        qtyField.attr('orig_val', qty);
        $j(".qtyWrap", blk).hide();
        $j(".qtyWrapProgress", blk).fadeIn();
        var uom = $j(".uom", blk).attr("item_uom");
        var params = {"action": "oq", "nmbr": blk.attr('nmbr'), "uom": uom, "qty": qty};
        var restFile = 'a_updateC.php';

        //check if this is on the order page
        if (xApp.pageVars.page == 'order.php') {
            var restFile = 'a_updateO.php';
            params["o_id"] = xApp.pageVars.o_id;
            params["udt"] = xApp.pageVars.o_udt;
        }

        $j.ajax({
            type: "POST", url: "REST/" + restFile,
            dataType: 'json', data: {json: $j.toJSON(params), nonce: (new Date()).getTime()},
            success: function (json) {
                //window.location="logout.php?msg="+escape('Session timed out');
                xApp.pageVars.cart = json.data.cart;
                xApp.uponCartChange();
                $j(".qtyWrapProgress", blk).hide();
                return xApp.onQtyChangeSuccess(json, blk);
            },
            error: function (a, b, c) {
                xApp.holdErr = [a, b, c];
            }
        });

        return true;
    },
    //overwritten by hc and dir
    onQtyChangeSuccess: function (json, blk) {
        if (json.status) {
            var newTotalPrice = parseFloat(json.data.newTotalPrice).toFixed(2);
            var lineTotal = parseFloat(json.data.newTotal).toFixed(2);
            $j('.totalPrice', blk).hide().html('$' + addCommas(newTotalPrice)).fadeIn();
            $j('.cartTotal').hide().html('$' + addCommas(lineTotal)).fadeIn();
            $j(".qtyWrap", blk).show();
            return true;
        }
    },
    addToCart: function (blk, nmbr, uom, qty) {
        var params = {"action": "iq", "nmbr": nmbr, "uom": uom, "qty": qty};
        $j.ajax({
            type: "POST", url: "REST/a_updateC.php",
            dataType: 'json', data: {json: $j.toJSON(params), nonce: (new Date()).getTime()},
            //complete: xApp.frmSubmit_end,
            success: function (json) {
                if (json.status) {
                    var div = $j(".itemInCartDiv", blk).hide();
                    var msg = json.data.newQty + " (" + uom + ") in cart";
                    xApp.pageVars.cart = json.data.cart;
                    xApp.uponCartChange();
                    if ($j("div[incart_nmbr=" + nmbr + "]").length) { //item in group is already there
                        $j("div[incart_nmbr=" + nmbr + "]").html(msg); //just update the msg
                        div.fadeIn();
                    }
                    else {
                        div.children().hide(); //hide any existing items that might be there already
                        var msg = "<div incart_nmbr='" + nmbr + "'>" + msg + "</div>";
                        div.append(msg).fadeIn();
                    }
                    $j('.qtyField', blk).val('1');
                    $j('.add.btn', blk).css('visibility', 'hidden').addClass('push').html("Add To Cart").css('visibility', 'visible').bind("mouseover", xApp.onAddBtnHover).bind("click", xApp.onAddBtnClick);
                    //$j('.qtyWrap',blk).fadeIn();;

                    xApp.hold = json;
                    return true;
                }

                //probably session timed out
                window.location = "logout.php?msg=" + escape('Session timed out');
            },
            error: function (a, b, c) {
                xApp.holdErr = [a, b, c];
            }
        });
    },
    removeFromCart: function () {
        var blk = $j(this).parents("div.cartItem");
        var qtyField = $j('.qtyField', blk);
        var uom = $j(".uom", blk).attr("item_uom");
        var params = {"action": "rm", "nmbr": blk.attr("nmbr"), "uom": uom};

        $j(".removeProgress", blk).fadeIn();
        $j(".cartItem_controls", blk).hide();

        var restFile = 'a_updateC.php';

        //check if this is on the order page
        if (xApp.pageVars.page == 'order.php') {
            var restFile = 'a_updateO.php';
            params["o_id"] = xApp.pageVars.o_id;
            params["udt"] = xApp.pageVars.o_udt;
        }

        $j.ajax({
            type: "POST", url: "REST/" + restFile,
            dataType: 'json', data: {json: $j.toJSON(params), nonce: (new Date()).getTime()},
            success: function (json) {
                xApp.pageVars.cart = json.data.cart;
                xApp.uponCartChange();
                xApp.onRemoveFromCartSuccess(json, blk);
                $j(".qtyWrapProgress", blk).hide();
            },
            error: function (a, b, c) {
                xApp.holdErr = [a, b, c];
            }
        });
        return true;
    },
    onRemoveFromCartSuccess: function (json, blk) {
        if (json.status) {
            $j('.cartTotal').hide().html('$' + json.data.newTotal).fadeIn();
            return blk.slideUp(function () {
                $j(this).remove()
            });
        }
        else
            window.location = "logout.php?msg=" + escape('Session timed out');
    },
    copyOrderToCart: function (o_id, replace, btn) {
        var params = {"action": "copy", "replace": replace, "o_id": o_id};
        var loader = replaceWithLoader(btn, true);
        $j.ajax({
            type: "POST", url: "REST/a_copyOrderToCart.php",
            dataType: 'json', data: {json: $j.toJSON(params), nonce: (new Date()).getTime()},
            success: function (json) {
                xApp.hold = json;
                xApp.pageVars.cart = json.data.cart;
                xApp.uponCartChange();
                if (json.status) {
                    $j(loader).replaceWith("<span class='notice'>Cart has been updated!</span><br/>");
                    $j(btn).fadeIn();
                }
                else {
                    if (json.data.code == "nla")
                        return alert(json.msg);
                }
            },
            error: function (a, b, c) {
                xApp.holdErr = [a, b, c];
            }
        });

        return true;
    },
    uponCartChange: function () {
        var c = xApp.pageVars.cart;
        //log(c);
        if (!c) {
            $j(".cartCount, .cartNotEmpty").hide();
            $j(".cartEmpty").fadeIn();
            $j('ul.linkNav').css('visibility', 'visible');
            return true; //cart is empty
        }
        if (c.length == 0) {
            $j(".cartCount, .cartNotEmpty").hide();
            $j(".cartEmpty").fadeIn();
            $j('ul.linkNav').css('visibility', 'visible');
            return true; //cart is empty
        }

        //got here, cart has items
        $j(".cartNotEmpty").show();
        if (xApp.pageVars.actioner)
            $j('#checkoutBtnContainer').show();  //cart has items, and logged in
        var n = getProps(c).length;
        $j('.cartCount').html('View Cart (' + n + ')').fadeIn();
        $j('ul.linkNav').css('visibility', 'visible');
    },
    toggleBR: function (el) {
        if (undefined == el)
            var self = this;
        else
            var self = el;
        return $j(self).html($j(self).html().replace(/\n\n*/g, "\n").replace(/\n/g, '<br/>'));
    },
    listenOnFocus: function () {
        $j('.listen_on_focus').unbind("focus").bind("focus", function () {
            //this - refers to the text box, not the button
            var btn = $j("a.btn[txt_field=" + $j(this).attr('id') + "]").addClass('hilite');
            $j(this).keypress(function (e) {
                if (e.which == 13)
                    btn.trigger('click');
            });
        }).unbind("blur").bind("blur", function () {
            $j("a.btn[txt_field=" + $j(this).unbind("keypress").attr("id") + "]").removeClass('hilite');
        });
    },
    nlog: function (str) {
        $j('#nodeStatus').hide().html(str).fadeIn();
    },
    attemptNodeConnect: function () {
        if (location.href.substr(0, 5) == "https")
            return true;
        if (xApp.pageVars.nodeURL)
            $j.getScript(
                    "http://" + xApp.pageVars.nodeURL + ":" + xApp.pageVars.nodePORT + "/socket.io/socket.io.js",
                    function () {
                        xApp.mmm = $j.ajax({
                            url: "js/xApp_node.js?" + (new Date()).getTime(), dataType: 'script',
                            success: function () {
                                try {
                                    if (io)
                                        return xApp.startUpNode();
                                    xApp.nlog("socket.io not loaded");
                                }
                                catch (e) {
                                    xApp.nlog('no socket.io')
                                }
                                ;
                            }
                        });
                    }
            );
        else
            xApp.nlog("socket not loaded, missing nodeURL");
    }
});
