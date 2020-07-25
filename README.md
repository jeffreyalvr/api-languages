## Description

> This API stores language courses;

> Each course has many topics.

**Started on July 24, 2020.**

**Finished on July 27, 2020.**

## Functionalities

### A • COURSES (23/07)
- [x] Add a course 
- [x] Edit a course by its ID
- [x] List all courses
- [x] List a course by its ID
- [x] Delete a course by its ID

### B • TOPICS (24/07)
- [x] Add a topic to a course
- [x] Edit a course's topic by its ID
- [x] List all course's topics
- [x] List a course's topic by its ID
- [x] Delete a course's topic by its ID

## To do later
- Validate the data using @hapi/joi (25/07):
- [x] See if title is empty
- [x] See if title is a string and alphanumeric
- [x] See if title is less than 3 characters long
- [x] See if title is bigger than 15 (courses) or 25 (topics) characters long

- [x] Optimize code (25/07)
- [ ] Switch from arrays to a SQLITE database (25/07)
- [ ] Develop a frontend interface using React JS (26/07)
- [ ] Deploy the project on GitHub and Heroku