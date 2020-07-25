# Description

> This API stores language courses;
> Each course has many topics.

**Started on July 24, 2020.**
**Finished on July 27, 2020.**

# Functionalities

## A • COURSES (23/07)
- [x] Add a course 
- [x] Edit a course by its ID
- [x] List all courses
- [x] List a course by its ID
- [x] Delete a course by its ID

## B • TOPICS (24/07)
- [x] Add a topic to a course
- [x] Edit a course's topic by its ID
- [x] List all course's topics
- [x] List a course's topic by its ID
- [x] Delete a course's topic by its ID

# To do later
- Validate the data using @hapi/joi:
- [ ] See if title is empty
- [ ] See if title has only numbers
- [ ] See if title already exists
- [ ] See if title is less than 3 characters long

- [ ] Optimize code
- [ ] Switch from arrays to a SQLITE database
- [ ] Develop a frontend interface using React JS
- [ ] Deploy the project on GitHub and Heroku