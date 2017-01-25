var app = angular.module('main');

app.service('cvGenService', function($http, $localStorage){
    
    
    
    this.generateCV = function(){
        
        var cvGenerate = {
            method: 'POST',
            url: 'http://localhost:3000/gencv',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                userid: $localStorage.studentID,
                cvid: $localStorage.currentcv 
            }
        }
        
        return $http(cvGenerate)
            .then(function(response){
                console.log('Successfully generated CV');
                return true;
        });
        
    }
    
    
    
    
    this.getCV = function(){
        
        var cvGet = {
            method: 'POST',
            url: 'http://localhost:3000/studentfile',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                folder: $localStorage.studentFolder
            }
        }
        
        return $http(cvGet)
            .then(function(response){
                $localStorage.cvlist = response.data.theFiles;
                return true;
        });
    }
    
    
    this.downloadCV = function(thecv){
        
        var dlCV = {
            method: 'GET',
            responseType: 'blob',
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            url: 'http://localhost:3000/CV/' + $localStorage.studentFolder + '/' + thecv,
            
        }
        
        return $http(dlCV)
            .then(function(response){
            console.log(response.data);
                   var file = new Blob([response.data], {type: "application/msword;charset=utf-8"});
                    saveAs(file, thecv);
                return true;
        });
        
    }
    
    
    
    
    
    
    
    
})