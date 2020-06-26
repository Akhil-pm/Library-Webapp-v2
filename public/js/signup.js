function validate()
{
    let name= document.getElementById('Name');
    let uname= document.getElementById('UserName');
    let phno= document.getElementById('phoneNumber');
    let email= document.getElementById('inputEmail').value;
    let pass= document.getElementById('InputPassword1');
    let cpass= document.getElementById('confirmPassword');
    let regexp=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,4})(\.[a-z]{2,4})?$/;
    var phregexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var passregexp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!$%@#£€*?&]{8,}$/;


    let name1= document.getElementById("name1");          //hidden elements
    let uname1= document.getElementById("usname");        //hidden elements
    let pnum= document.getElementById("pnum");            //hidden elements
    let mail= document.getElementById("mail");            //hidden elements
    let pass1= document.getElementById("pass1");          //hidden elements
    let pass2= document.getElementById("pass2");          //hidden elements
    
    if(name.value=="")
    {
     alert("All fields are required");
     name1.style.visibility="visible";
     return false;
}
else{
  name1.style.visibility="hidden";
}



if(uname.value=="")
{
 alert("All fields are required");
 uname1.style.visibility="visible";
 return false;
}
else{
uname1.style.visibility="hidden";
}


if(phno.value=="")
{
 alert("All fields are required");
 pnum.style.visibility="visible";
 return false;
}
else if(phregexp.test(phno.value)==false)
{
  alert("Enter a valid phone number");
  pnum.innerHTML="** Enter a valid phone number";
  pnum.style.visibility="visible";
  return false;
}
else{
  pnum.innerHTML="";
  pnum.style.visibility="hidden";
}

   
if(email.value=="")
{
 alert("All fields are required");
 mail.style.visibility="visible";
 return false;
}
else if(regexp.test(email)==false)
{
  alert("Enter a valid email id");
  mail.innerHTML="** Enter a valid email id";
  mail.style.visibility="visible";
  return false;
}
else{
mail.style.visibility="hidden";
}



if(pass.value=="")
{
 alert("All fields are required");
 pass1.style.visibility="visible";
 return false;
}
else if(passregexp.test(pass.value)==false)
{
  alert("**** Password must contain ****\n \n 1.At least one uppercase.\n 2.At least one lowercase.\n 3.At least one number.\n 4.Minimum 8 characters.");
  pass1.innerHTML="** Enter a valid password";
  pass1.style.visibility="visible";
  return false;
}
else{
  pass1.innerHTML="";
pass1.style.visibility="hidden";
}


if(cpass.value=="")
{
 alert("All fields are required");
 pass2.style.visibility="visible";
 return false;
}
else if(pass.value!=cpass.value)
{
  alert("Passwords doesnot match");
  pass2.innerHTML="** Passwords doesnot match";
  pass2.style.visibility="visible";
  return false;
}
else{
pass2.style.visibility="hidden";
alert("Signup success");
return true;
}

}