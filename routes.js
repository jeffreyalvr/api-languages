import express from 'express';

import CoursesController from './controllers/CoursesController';
import TopicsController from './controllers/TopicsController';

const routes = express.Router();

const coursesController = new CoursesController();
const topicsController = new TopicsController();

/* const courses = [
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
]; */

app.get('/', (req, res) => {
  res.send('Hello there.');
});

// NOTE: COURSES
app.get('/courses', coursesController.index);
app.get('/courses/:id', coursesController.show);
app.post('/courses', coursesController.store);
app.put('/courses/:id', coursesController.update);
app.delete('/courses/:id', coursesController.destroy);


// NOTE: TOPICS
app.get('/courses/:id/topics', topicsController.index);
app.get('/courses/:id/topics/:topicId', topicsController.show);
app.post('/courses/:id/topics', topicsController.store);
app.put('/courses/:id/topics/:topicId', topicsController.update);
app.delete('/courses/:id/topics/:topicId', topicsController.destroy);

export default routes;