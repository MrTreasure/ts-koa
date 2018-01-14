import * as Router from 'koa-router';
import ResumeCon from '../controller/resumeCon';

const router = new Router({
  prefix: '/resume'
});

router.get('/info', ResumeCon.getInfo);

export default router;