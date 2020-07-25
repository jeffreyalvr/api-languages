import express from 'express';

import CoursesController from './controllers/CoursesController';
import TopicsController from './controllers/TopicsController';

const routes = express.Router();

const coursesController = new CoursesController();
const topicsController = new TopicsController();

// NOTE: COURSES
routes.get('/courses', coursesController.index);
routes.get('/courses/:id', coursesController.show);
routes.post('/courses', coursesController.store);
routes.put('/courses/:id', coursesController.update);
routes.delete('/courses/:id', coursesController.destroy);


// NOTE: TOPICS
routes.get('/courses/:id/topics', topicsController.index);
routes.get('/courses/:id/topics/:topicId', topicsController.show);
routes.post('/courses/:id/topics', topicsController.store);
routes.put('/courses/:id/topics/:topicId', topicsController.update);
routes.delete('/courses/:id/topics/:topicId', topicsController.destroy);

export default routes;