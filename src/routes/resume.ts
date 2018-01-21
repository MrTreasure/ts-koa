import * as Router from 'koa-router';
import ResumeCon from '../controller/resumeCon';
import { validator } from '../middleware/validator';
import { USER } from '../schema/schema';

const router = new Router({
  prefix: '/resume'
});

router.get('/info',  ResumeCon.getInfo);
router.get('/mysql', ResumeCon.getMySql);
router.post('/add', ResumeCon.addScore);
router.post('/user', validator(USER),ResumeCon.addUser);
router.post('/saveFile', ResumeCon.saveFile);


export default router;