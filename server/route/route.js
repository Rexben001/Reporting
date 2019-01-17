import express from 'express';
import UserControllers from '../controllers/users';
import ReportControllers from '../controllers/reports';
import Validation from '../middlewares/validate';
import Auth from '../middlewares/auth';

const router = express.Router();


router.get('/users', UserControllers.getUsers);
router.post('/users', Validation.checkUser, UserControllers.createUser);
router.post('/users/login', UserControllers.loginUser);
router.patch('/users/make_admin/:id', Auth.verifyUser, UserControllers.makeAdmin);
router.get('/users/:id', Auth.verifyUser, UserControllers.getAUSer);

router.get('/reports', Auth.verifyUser, ReportControllers.getReport);
router.post('/reports', Validation.checkReports, Auth.verifyUser, ReportControllers.createReport);
router.get('/reports/:report_id', Auth.verifyUser, ReportControllers.getAReport);
router.patch('/reports/:report_id/edit', Validation.checkEdit, Auth.verifyUser, ReportControllers.editLocation);
router.patch('/reports/:report_id/status', Validation.checkStatus, Auth.verifyUser, ReportControllers.editStatus);
router.patch('/reports/:report_id/cancel', Auth.verifyUser, ReportControllers.deleteReport);
router.patch('/reports/:report_id/edit_all', Auth.verifyUser, ReportControllers.editAll);


export default router;
