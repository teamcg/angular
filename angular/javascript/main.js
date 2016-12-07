

$(function() {
    $(".todolist").focus(function() {
    if(document.getElementById('todolist').value === ''){
        document.getElementById('todolist').value +='• ';
	}
});
$(".todolist").keyup(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        document.getElementById('todolist').value +='• ';
	}
	var txtval = document.getElementById('todolist').value;
	if(txtval.substr(txtval.length - 1) == '\n'){
		document.getElementById('todolist').value = txtval.substring(0,txtval.length - 1);
	}
});

});




function checkPass(){ 
  var pass1 = document.getElementById('pass1');
  var pass2 = document.getElementById('pass2');
  var message = document.getElementById('messageError');
  var btn = document.querySelector('#registerButton');

    if(pass1.value == pass2.value){
      btn.disabled = false;
      message.style.color = "#66cc66";
      message.innerHTML = "Confirm Password Matched!"
    }else{
      btn.disabled = true;
      message.style.color = "#ff6666";
      message.innerHTML = "Confirm Password Do Not Match!"
     }
} 
