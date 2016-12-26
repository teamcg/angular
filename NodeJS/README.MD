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

- John Lois Frades