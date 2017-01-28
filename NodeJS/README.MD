Simple setup of JSON Web Token on NodeJS <br>


Nov 27 <br>
-- added modules.. Officegen, Async, Nodemailer. <br>
-- added authkey, cv, education and experience models <br>

Nov 28 <br>
-- added generate auth key.. <br>

Dec 1 <br>
-- Added new route for adding cv (cvsave.js) <br>

Dec 2 <br>
-- Added 2 POST routes for saving CV experience and getting updated CV experience to pass in the data to angularjs (table) <br>

Dec 5 <br>
-- Reworked the education model and user model. <br>
  -- user model, added website value on the schema <br>
  -- education model, removed start month & year, end month & year. Replaced with Start date & End Date <br>
-- added 2 POST routes for saving CV education and getting updated CV education to pass in the data to angularjs (table) <br>
-- Changed the '/authenticate' route, from finding the user by EMAIL to STUDENTID <br>

Dec 6 <br>
-- Added a Skill model schema <br>
-- Added 2 POST routes for adding a skill on the database and querying the database for updated skill and pass into the AngularJS through res.json <br>
-- Added PHONE value on USER model schema <br>
-- Added a POST route for updating and getting the PROFILE of the student <br>

Dec 7 <br>
-- reworked the authentication and register. changed the error from 'console.log' to 'res.json' <br>
-- Added back the Personal Info post route <br>

Dec 10 <br>
-- Added 4 POST routes. Editing Experience, Editing Education, Deleting Experience & Deleting education <br>
-- Still have a problem with deleting, it only deletes on Experience Schema, it should also delete on CV Schema <br>

Dec 12 <br>
-- Delete Experience and Education is now working <br>

Dec 13 <br>
-- Edited the EducationSchema <br>

Dec 19 <br>
-- added Education Papers model <br>
-- Added POST route for Education Paper <br>

Dec 20 <br>
-- Added Edit Education Papers route <br>

Dec 21 <br>
-- Added Delete Education Paper and it's binded ID to the Education <br>

Dec 22 <br>
-- Added add Education Achievement model <br>
-- Added POST route for adding education achievement and querying the education and populate the achievements <br>

Dec 23 <br>
-- Added Edit and Delete routes for Education Achievement <br>
-- Added Education Projects Schema model <br>
-- Added POST route for adding projects in Education <br>

Dec 26 <br>
-- Added POST route for Editing Education Project <br>

Dec 27 <br>
-- Added POST route for deleting education project <br>
-- Added Experience Responsibilities model schema <br>
-- Added POST route for adding and getting Experience Responsibilities <br>

Jan 9 <br>
-- Added Achievements in Experience Model<br>
-- Added two post routs for Adding and getting ExperienceAchievements<br>
-- Added achievements on experience schema<br>

Jan 10 <br>
-- Added post route for editing experience achievement <br>
-- Added post route for deleting the experience-achievemnts and the achievements in experience schema <br>

Jan 14 <br>
-- Added SkillExample model schema <br>
-- Added POST route for adding SkillExample <br>



Jan 15 <br>
-- Added post route for editing experience responsibilities <br>
-- Added post route for deleting the experience-responsibilities and the responsibilities in experience schema <br>
-- Added POST route for adding Skill Example <br>
-- Added GET route for querying the Skill Example <br>


Jan 20 <br>
-- changed made on GET CV EDUCATION, where it populates educationpaper and educationachievement <br>

Jan 21 <br>
-- Created a seperate file for Experience, Education and Skill route. <br>

Jan 23 <br>
-- Added POST route for updating and deleting skills <br>
-- Added a pre-schema on skill model, to be also deleted on CV <br>
-- Added delete skill example route <br>
-- Added edit skill example route <br>

Jan 24 <br>
-- Added adds folder to the CV folder when the user registers. Saves as Fullname + the student id <br>
-- Added /cvexpand route for checking the whole content of the CV <br>
-- Added POST route for generating cv. (format not fnished) <br>
-- Added POST route for getting the CV files inside the folder <br>

Jan 25 <br>
-- Added route for downloading CV and sending it to the client side (AngularJS) <br>
-- Install FileSave.js <br>

Jan 27 <br>
-- Reworked skill Example, added category function, when user click on the category, it will populate the data under that category <br>
-- Reworked the skill example database model. <br>

Jan 28 <br>
-- reconfigured the '/getexskillcategory' route, added populate for skills <br>
-- DELETED the old example skill routes <br>
-- Added personal statement example. similar to skill example. <br>


-- John Lois Frades & Surinderpal Kaur Sidhu

