import express from 'express';
import UserControllers from '../controllers/users';
import ReportControllers from '../controllers/reports';
import Validation from '../middlewares/validate';
import Auth from '../middlewares/auth';

const router = express.Router();


router.get('/users', UserControllers.getUsers);
router.post('/users', Validation.checkUser, UserControllers.createUser);
router.post('/users/login', UserControllers.loginUser);

router.get('/reports', ReportControllers.getReport);
router.post('/reports', Validation.checkReports, ReportControllers.createReport);
router.get('/reports/:report_id', ReportControllers.getAReport);
router.patch('/reports/:report_id/edit', Validation.checkEdit, ReportControllers.editLocation);
router.patch('/reports/:report_id/status', Validation.checkStatus, ReportControllers.editStatus);
router.patch('/reports/:report_id/cancel', ReportControllers.deleteReport);


export default router;
