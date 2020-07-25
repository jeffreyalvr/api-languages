const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    title: 'japanese',
    topics: [
      { id: 1, title: 'Hiragana 1' },
      { id: 2, title: 'Hiragana 2' },
      { id: 3, title: 'Hiragana 3' },
      { id: 4, title: 'Greetings' },
      { id: 5, title: 'Katakana 1' },
    ]
  },
  {
    id: 2,
    title: 'korean',
    topics: [
      { id: 1, title: 'Hangul 1' },
      { id: 2, title: 'Hangul 2' },
      { id: 3, title: 'Greetings' },
      { id: 4, title: 'Phrases 1' },
    ]
  },
];

app.get('/', (req, res) => {
  res.send('Hello there.');
});

// NOTE: COURSES

// 1. Add a course
app.post('/courses', (req, res) => {
  const { error } = validateTitle(req.body.title, 3, 15);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const checkTitle = courses.some(course => course.title === req.body.title);

  if (checkTitle) {
    res.status(409).send('There is already a course with the same title.');
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
  res.status(201).send(course);
});

// 2. Edit a course by its ID
app.put('/courses/:id', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const { error } = validateTitle(req.body.title, 3, 15);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const checkTitle = courses.some(course => course.title === req.body.title);

  if (checkTitle) {
    res.status(409).send('There is already a course with the same title.');
    return;
  }

  courseReference.title = req.body.title;
  res.status(200).send(courseReference);
});

// 3. List all courses
app.get('/courses', (req, res) => {
  let serializedCourses = [];

  const c = courses.map(course => {
    serializedCourses.push({ id: course.id, title: course.title });
  });

  res.status(200).send(serializedCourses);
});

// 4. List a course by its ID
app.get('/courses/:id', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const serializedCourse = { id: courseReference.id, title: courseReference.title };

  res.status(200).send(serializedCourse);
});

// 5. Delete a course by its ID
app.delete('/courses/:id', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const index = courses.indexOf(courseReference);
  courses.splice(index, 1);

  res.status(200).send(courseReference);
});

// NOTE: TOPICS

// 1. Add a topic to a course
app.post('/courses/:id', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const { error } = validateTitle(req.body.title, 3, 25);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const topics = courseReference.topics;
  const checkTitle = topics.some(topic => topic.title === req.body.title);

  if (checkTitle) {
    res.status(409).send('There is already a topic with the same title.');
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
  res.status(201).send(object);
});

// 2. Edit a course's topic by its ID
app.put('/courses/:id/topics/:topicId', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const topics = courseReference.topics;
  const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

  if (!topicReference) {
    res.status(404).send('The specified topic doesn\'t exist.');
    return;
  }

  const { error } = validateTitle(req.body.title, 3, 25);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const checkTitle = topics.some(topic => topic.title === req.body.title);

  if (checkTitle) {
    res.status(409).send('There is already a topic with the same title.');
    return;
  }

  topicReference.title = req.body.title;

  res.status(200).send(topicReference);
});

// 3. List all course's topics
app.get('/courses/:id/topics', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const topics = courseReference.topics;

  res.status(200).send(topics);
});

// 4. List a course's topic by its ID
app.get('/courses/:id/topics/:topicId', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const topics = courseReference.topics;
  const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

  if (!topicReference) {
    res.status(404).send('The specified topic doesn\'t exist.');
    return;
  }

  res.status(200).send(topicReference);
});

// 5. Delete a course's topic by its ID
app.delete('/courses/:id/topics/:topicId', (req, res) => {
  const courseReference = courses.find(course => course.id === parseInt(req.params.id));

  if (!courseReference) {
    res.status(404).send('The specified course doesn\'t exist.');
    return;
  }

  const topics = courseReference.topics;
  const topicReference = topics.find(topic => topic.id === parseInt(req.params.topicId));

  if (!topicReference) {
    res.status(404).send('The specified topic doesn\'t exist.');
    return;
  }

  const index = topics.indexOf(topicReference);
  topics.splice(index, 1);

  res.status(200).send(topicReference);
});

// NOTE: Optimization function

function validateTitle(title, min, max) {
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

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));