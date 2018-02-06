import * as Router from 'koa-router';
import { validator } from '../middleware/validator';
import { USER } from '../schema/schema';
import userCon from '../controller/userCon';

const router = new Router({
  prefix: '/user'
});

router.post('/login', userCon.login);
router.post('/add', validator(USER), userCon.addUser);
router.post('/upload', userCon.upload);

export default router;