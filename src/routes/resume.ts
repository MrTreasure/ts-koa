import * as Router from 'koa-router';
import ResumeCon from '../controller/resumeCon';

const router = new Router({
  prefix: '/resume'
});

router.get('/info', ResumeCon.getInfo);
router.get('/mysql', ResumeCon.getMySql);
router.post('/add', ResumeCon.addScore);

export default router;