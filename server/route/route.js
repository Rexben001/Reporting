import express from 'express';
import UserControllers from '../controllers/users';
import ReportControllers from '../controllers/reports';


const router = express.Router();


router.get('/users', UserControllers.getUsers);
router.post('/users', UserControllers.createUser);

router.get('/reports', ReportControllers.getReport);
router.post('/reports', ReportControllers.createReport);
router.get('/reports/:report_id', ReportControllers.getAReport);
router.put('/reports/:report_id', ReportControllers.editLocation);


export default router;
