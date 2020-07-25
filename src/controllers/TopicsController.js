import knex from '../database/connection';
import Joi from '@hapi/joi';

class TopicsController {
  // 1. Add a topic to a course
  async store(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const { error } = validateTitle(req.body.title, 3, 25);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const topics = courseReference.topics;
    const checkTitle = topics.some(topic => topic.title === req.body.title);

    if (checkTitle) {
      res.status(409).json('There is already a topic with the same title.');
      return;
    }

    let id = topics.length + 1;

    const topicWithSameId = topics.some(topic => topic.id === id);
    if (topicWithSameId) id += 1;

    const object = {
      id,
      title: req.body.title,
    };

    topics.push(object);
    return res.status(201).json(object);
  }

  // 2. Edit a course's topic by its ID
  async update(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const topics = courseReference.topics;
    const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

    if (!topicReference) {
      res.status(404).json('The specified topic doesn\'t exist.');
      return;
    }

    const { error } = validateTitle(req.body.title, 3, 25);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }

    const checkTitle = topics.some(topic => topic.title === req.body.title);

    if (checkTitle) {
      res.status(409).json('There is already a topic with the same title.');
      return;
    }

    topicReference.title = req.body.title;

    return res.status(200).json(topicReference);
  }

  // 3. List all course's topics
  async index(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const topics = courseReference.topics;

    return res.status(200).json(topics);
  }

  // 4. List a course's topic by its ID
  async show(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const topics = courseReference.topics;
    const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

    if (!topicReference) {
      res.status(404).json('The specified topic doesn\'t exist.');
      return;
    }

    return res.status(200).json(topicReference);
  }

  // 5. Delete a course's topic by its ID
  async destroy(req, res) {
    const courseReference = courses.find(course => course.id === parseInt(req.params.id));

    if (!courseReference) {
      res.status(404).json('The specified course doesn\'t exist.');
      return;
    }

    const topics = courseReference.topics;
    const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

    if (!topicReference) {
      res.status(404).json('The specified topic doesn\'t exist.');
      return;
    }

    const index = topics.indexOf(topicReference);
    topics.splice(index, 1);

    return res.status(200).json(topicReference);
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

export default TopicsController;