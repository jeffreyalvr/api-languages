-- Description --

This API stores language courses;
Each course has many topics.

Started on July 24, 2020.
Finished on July 27, 2020.

-- Functionalities --

Legend:
[X] Completed
[+] Working
[-] Waiting

A • COURSES (23/07)
1. Add a course [X]
2. Edit a course by its ID [X]
3. List all courses [X]
4. List a course by its ID [X] 
5. Delete a course by its ID [X]

B • TOPICS (24/07)
1. Add a topic to a course [X]
2. Edit a course's topic by its ID [X]
3. List all course's topics [X]
4. List a course's topic by its ID [X]
5. Delete a course's topic by its ID [X]

-- TO DO LATER --
1. Validate the data using @hapi/joi [-]
  1.1. See if title is empty [-]
  1.2. See if title has only numbers [-]
  1.3. See if title already exists [-]
  1.4. See if title is less than 3 characters long [-]
2. Optimize code [-]
3. Switch from arrays to a SQLITE database [-]
4. Develop a frontend interface using React JS [-]
5. Deploy the project on GitHub and Heroku [-]