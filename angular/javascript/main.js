
var a = document.querySelector('#clickME');







//
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


$(function () {

})

//var d = document.getElementById('menu-toggle');
//d.className += " toggled";

//function expFormValidate(){
//    var expCategory = document.getElementById('experienceCategory');
//    var expRole = document.getElementById('experienceRole');
//    var expCompany = document.getElementById('experienceCompany');
//    var expCompanyDescription = document.getElementById('experienceCompanyDescription');
//    var expCity = document.getElementById('experienceCity');
//    var expCountry = document.getElementById('experienceCountry');
//    var expButton = document.getElementById('experienceSubmit');
//
//    var expStartDate = $('#experienceStartdate input');
//    var expEndDate = $('#experienceEnddate input');
//    
//    if(expCategory.value !== "" && expRole.value !== "" && expCompany.value !== "" && expCompanyDescription.value !== "" && expCity.value !== "" && expCountry.value !== "" && expStartDate[0].value !== "" && expEndDate[0].value !== ""){
//        expButton.disabled = false;
//    } else {
//        expButton.disabled = true;
//    }
//
//}


angular.module('tooltipDemo1', ['ngMaterial'])
.controller('AppCtrl', function($scope) {
  $scope.demo = {
    showTooltip : false,
    tipDirection : ''
  };

  $scope.demo.delayTooltip = undefined;
  $scope.$watch('demo.delayTooltip',function(val) {
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;
  });

  $scope.$watch('demo.tipDirection',function(val) {
    if (val && val.length ) {
      $scope.demo.showTooltip = true;
    }
  })
});
