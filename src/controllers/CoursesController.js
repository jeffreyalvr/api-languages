import knex from '../database/connection';
import Joi from '@hapi/joi';

class CoursesController {
  // 1. Add a course
  async store(req, res) {
    const { error } = validateTitle(req.body.title, 3, 15);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const checkTitle = courses.some(course => course.title === req.body.title);

    if (checkTitle) {
      res.status(409).json('There is already a course with the same title.');
      return;
    }

    let id = courses.length + 1;

    const courseWithSameId = courses.some(course => course.id === id);
    if (courseWithSameId) id += 1;

    const course = {
      id,
      title: req.body.title,
      topics: [],
    };

    courses.push(course);
    return res.status(201).json(course);
  }

  // 2. Edit a course by its ID
  async update(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const { error } = validateTitle(req.body.title, 3, 15);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const checkTitle = courses.some(course => course.title === req.body.title);

    if (checkTitle) {
      res.status(409).json('There is already a course with the same title.');
      return;
    }

    courseReference.title = req.body.title;
    return res.status(200).json(courseReference);
  }

  // 3. List all courses
  async index(req, res) {
    let serializedCourses = [];

    const c = courses.map(course => {
      serializedCourses.push({ id: course.id, title: course.title });
    });

    return res.status(200).json(serializedCourses);
  }

  // 4. List a course by its ID
  async show(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const serializedCourse = { id: courseReference.id, title: courseReference.title };

    return res.status(200).json(serializedCourse);
  }

  // 5. Delete a course by its ID
  async destroy(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const index = courses.indexOf(courseReference);
    courses.splice(index, 1);

    return res.status(200).json(courseReference);
  }

  // NOTE: Optimization function
  validateTitle(title, min, max) {
    const schema = Joi.object({
      title: Joi.string().alphanum().min(min).max(max).required().mesages({
        'string.base': 'The title must be a string.',
        'string.empty': 'The title cannot be empty.',
        'string.base': 'The title must be a string.',
        'string.alphanum': 'The title must be alphanumeric.',
        'string.min': `The title must be at least ${min} characters long.`,
        'string.max': `The title cannot be more than ${max} characters long.`,
        'string.required': 'The title is required.',
      })
    });

    return schema.validate({ title });
  }
}

export default CoursesController;