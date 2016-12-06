angular.module("main").service("loginService", function($http, $localStorage){


    
    this.login = function(user, pass){
		
		var req = {
		 method: 'POST',
		 url: 'http://localhost:3000/authenticate',
		 dataType: 'json',
		 headers: {
		   'Content-Type': 'application/json'
		 },
		 data: { 
                studentid: user,
		 		password: pass 
		 		}
		}
        
		

		return $http(req)
			.then(function(response) {
                console.log(response.data.data);
//                $localStorage.studentinfo = {
//                    firstname: response.data.data.firstname,
//                    lastname: response.data.data.lastname,
//                    address: response.data.data.address,
//                    email: response.data.data.email,
//                    phone: response.data.data.phone,
//                    linkedin: response.data.data.linkedin,
//                    website: response.data.data.website
//                };
            $localStorage.studentID = response.data.data._id;
            $localStorage.studentFirstname = response.data.data.firstname;
            $localStorage.studentLastname = response.data.data.lastname;
            $localStorage.studentAddress = response.data.data.address;
            $localStorage.studentEmail = response.data.data.email;
            $localStorage.studentPhone = response.data.data.phone;
            $localStorage.studentLinkedin = response.data.data.linkedin;
            $localStorage.studentWebsite = response.data.data.website;
	        	$localStorage.token = response.data.token;
		        return response.data.success;

		    }, function(response) {
		        console.log("Error trying to log in.");
		        return false;
		    });

	}

    
//    this.authenticateUrlTest = function(){
//		
//		var req = {
//		 method: 'GET',
//		 url: 'https://edenzproj.herokuapp.com/authenticate',
//		 dataType: 'json',
//		 headers: {
//		   'Content-Type': 'application/json'
//		 }
//		}
//		
//
//		return $http(req)
//			.then(function(response) {
//	        	console.log(response.data);
//	        	return true;
//
//		    }, function(response) {
//		        console.log("Error trying to log in.");
//		        return false;
//		    });
//
//	}
    
    
    this.profileUpdate = function(address, email, phone, linkedin, website){
        var updatedProfile = {
            method: 'POST',
            url: 'http://localhost:3000/updatemyprofile',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: $localStorage.studentID,
                address: address,
                email: email,
                phone: phone,
                linkedin: linkedin,
                website: website
            }
        }
        
        return $http(updatedProfile)
            .then(function(response){
            console.log(response.data);
            $localStorage.studentAddress = response.data.info.address;
            $localStorage.studentEmail = response.data.info.email;
            $localStorage.studentPhone = response.data.info.phone;
            $localStorage.studentLinkedin = response.data.info.linkedin;
            $localStorage.studentWebsite = response.data.info.website;
            return response.data.success;
        }, function(error){
            return response.data.success;
            console.log('ERROR on Update Profile');
        });
        
    }
    
    this.cvname = function(cvname){
        
        var CVname = {
            method: 'POST',
            url: 'http://localhost:3000/cvname',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                cvname: cvname
            }
        }
        
        return $http(CVname)
            .then(function(response){
            $localStorage.currentcv = response.data.info._id;
            console.log(response.data.info);
            return true
        }, function(response){
                console.log('Error creating CV');
            return false
        });
    }
    
    
    this.cvpi = function(firstname, lastname, address, postcode, email, website, linkedin, phone){
        var currentCV = $localStorage.currentcv;
        var CVpersonalinfo = {
            method: 'POST',
            url: 'http://localhost:3000/cvpersonalinfo',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                firstname: firstname,
                lastname: lastname,
                address: address,
                phone: phone,
                website: website,
                linkedin: linkedin,
                email: email,
                postcode: postcode
            }
        }
        
        
        return $http(CVpersonalinfo)
            .then(function(response){
            console.log(response.data);
            return true;
        }, function(response){
            console.log('Error!');
            return false;
        });
    }
    
    
    this.cvexp = function(category, role, company, companydesc, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        
        var CVexperience = {
            method: 'POST',
            url: 'http://localhost:3000/cvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                category: category,
                role: role,
                company: company,
                companydesc: companydesc,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateExp = {
            method: 'POST',
            url: 'http://localhost:3000/getcvexperience',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVexperience)
            .then(function(response){
                console.log(response.data);
                return $http(cvUpdateExp)
                    .then(function(response2){
                        console.log(response2.data.info.experience);
                        $localStorage.cvexperience = response2.data.info.experience;
                        return true;
            }, function(error2){
                    console.log('update EXP erro!');
                    return false;
                });
        }, function(error){
            console.log('EXPERIENCE error');
            return false;
        });
    }
    
    
    this.cvedu = function(category, school, city, country, startdate, enddate){
        var currentCV = $localStorage.currentcv;
        
        var CVeducation = {
            method: 'POST',
            url: 'http://localhost:3000/cveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                category: category,
                school: school,
                city: city,
                country: country,
                startdate: startdate,
                enddate: enddate
            }
        }
        
        var cvUpdateEducation = {
            method: 'POST',
            url: 'http://localhost:3000/getcveducation',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVeducation)
            .then(function(response){
            console.log(response);
            return $http(cvUpdateEducation)
                .then(function(response2){
                console.log(response2.data.info.education);
                $localStorage.cveducation = response2.data.info.education;
                return true;
            }, function(error2){
                console.log(error2);
                return false;
            });
        
        }, function(err){
            console.log(err);
            return false;
        
        });
    
    
    }
    
    this.cvskills = function(name, description){
       var currentCV = $localStorage.currentcv;
        
        var CVskill = {
            method: 'POST',
            url: 'http://localhost:3000/cvskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV,
                name: name,
                description: description
            }
        }
        
        var cvUpdateSkill = {
            method: 'POST',
            url: 'http://localhost:3000/getcvskill',
            dataType: 'json',
            contentType: 'application/json',
            data: {
                id: currentCV
            }
        }
        
        return $http(CVskill)
            .then(function(response){
                console.log(response);
                return $http(cvUpdateSkill)
                    .then(function(response2){
                    console.log(response2.data.info.skills);
                    $localStorage.cvskill = response2.data.info.skills;
                     return true;
                }, function(error2){
                    console.log(error2);
                   return false;
                });
        }, function(error){
            console.log(error);
            return false;
        });
    }
        
    
});