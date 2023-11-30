//General Functions

function trimAllSpace(str) { var str1 = ''; var i = 0; while(i != str.length) { if(str.charAt(i) != ' ') str1 = str1 + str.charAt(i); i ++; } return str1; }

function trimString(str) { var str1 = ''; var i = 0; while ( i != str.length) { if(str.charAt(i) != ' ') str1 = str1 + str.charAt(i); i++; } var retval = IsNumeric(str1); if(retval == false) return -100; else return str1; }

function IsNumeric(strString) 
{ 
	var strValidChars = "0123456789"; var strChar; var blnResult = true; 
	//var strSequence = document.frmQuestionDetail.txtSequence.value; 
	// test strString consists of valid characters listed above 
	if (strString.length == 0) return false; 
	for (i = 0; i < strString.length && blnResult == true; i++) 
	{ 
		strChar = strString.charAt(i); 
		if (strValidChars.indexOf(strChar) == -1) 
		{ 
			blnResult = false; 
		} 
	} 
	return blnResult; 
}


// Declaring valid date character, minimum year and maximum year
var dtCh= "-";
var minYear=1900;
var maxYear=2100;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		//alert("The date format should be : dd/mm/yyyy")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		//alert("Please enter a valid month")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		//alert("Please enter a valid day")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		//alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		//alert("Please enter a valid date")
		return false
	}
return true
}





function validatetime(strval)
 {
  //var strval = document.Form1.TextBox1.value;
  var strval1;
    
  //minimum lenght is 6. example 1:2 AM
  if(strval.length < 6)
  {
   //alert("Invalid time. Time format should be HH:MM AM/PM.");
   return false;
  }
  
  //Maximum length is 8. example 10:45 AM
  if(strval.lenght > 8)
  {
   //alert("Invalid time. Time format should be HH:MM AM/PM.");
   return false;
  }
  
  //Removing all space
  strval = trimAllSpace(strval); 
  
  //Checking AM/PM
  if(strval.charAt(strval.length - 1) != "M" && strval.charAt(strval.length - 1) != "m")
  {
   //alert("Invalid time. Time shoule be end with AM or PM.");
   return false;
   
  }
  else if(strval.charAt(strval.length - 2) != 'A' && strval.charAt(strval.length - 2) != 'a' && strval.charAt(strval.length - 2) != 'p' && strval.charAt(strval.length - 2) != 'P')
  {
   //alert("Invalid time. Time shoule be end with AM or PM.");
   return false;
   
  }
  
  //Give one space before AM/PM
  
  strval1 =  strval.substring(0,strval.length - 2);
  strval1 = strval1 + ' ' + strval.substring(strval.length - 2,strval.length)
  
  strval = strval1;
      
  var pos1 = strval.indexOf(':');
  //document.Form1.TextBox1.value = strval;
  
  if(pos1 < 0 )
  {
   //alert("Invalid time. A color(:) is missing between hour and minute.");
   return false;
  }
  else if(pos1 > 2 || pos1 < 1)
  {
   //alert("Invalid time. Time format should be HH:MM AM/PM.");
   return false;
  }
  
  //Checking hours
  var horval =  trimString(strval.substring(0,pos1));
   
  if(horval == -100)
  {
   //alert("Invalid time. Hour should contain only integer value (0-11).");
   return false;
  }
      
  if(horval > 12)
  {
   //alert("Invalid time. Hour can not be greater that 12.");
   return false;
  }
  else if(horval < 0)
  {
   //alert("Invalid time. Hour can not be hours less than 0.");
   return false;
  }
  //Completes checking hours.
  
  //Checking minutes.
  var minval =  trimString(strval.substring(pos1+1,pos1 + 3));
  
  if(minval == -100)
  {
   //alert("Invalid time. Minute should have only integer value (0-59).");
   return false;
  }
    
  if(minval > 59)
  {
     //alert("Invalid time. Minute can not be more than 59.");
     return false;
  }   
  else if(minval < 0)
  {
   //alert("Invalid time. Minute can not be less than 0.");
   return false;
  }
   
  //Checking minutes completed.  
  
  //Checking one space after the mintues 
  minpos = pos1 + minval.length + 1;
  if(strval.charAt(minpos) != ' ')
  {
   //alert("Invalid time. Space missing after minute. Time should have HH:MM AM/PM format.");
   return false;
  }
 
    
  return true;
  
  
 }


/*
function ValidateTime(Q) 
{	
    var T;
    if ((T = /^(\d\d):(\d\d)\s?(([ap])\.?m\.?)?$/i.exec(Q)) == null) {
        return -2;
    }    
    if (T[3] != "") {
        if (T[1] > "12") {
            return -1;
        }
        T[1] = T[1] % 12 + 12 * /p/i.test(T[3]);
    }
    if (!ValidTime(T[1], T[2], 0)) {
        return -1;
    }
    return 0; //[+T[1], +T[2]];
}

function isTime(F) 
{
    
    S = ValidateTime(F);
    if (S < -1)
    {
		return false;
    }
    else
    {
		return true;
    }
    //USR.value = S < -1 ? "Not dd:dd x.m." : S == -1 ? "Bad value" : S;
    //Out.value = S < 0 ? "??" : (new Date(2000, 0, 1, S[0], S[1])).USlocaltimeStr();
    //UST.focus();
    
}

*/