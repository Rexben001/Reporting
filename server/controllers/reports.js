import reports from '../models/reportdb';

class ReporterControllers {
  static getReport(req, res) {
    return res.json({
	  messsage: reports
    });
  }

  static createReport(req, res) {
    const {
	  id, name, status, latitude, longitude, description
    } = req.body;

    const report = {
	  id,
	  name,
	  status,
	  latitude,
	  longitude,
	  description
    };
    reports.push(report);

    return res.json({
	  message: report
    });
  }

  static getAReport(req, res) {
    const id = parseInt(req.params.report_id, 10);
    reports.find((report) => {
	  if (report.id === id) {
        return res.json({
		  message: report
        });
	  }else{
		  return res.status(404).json({
			  message: 'Report can not be retrieved at the moment'
		  });
	  }
    });
  }

  static editLocation(req, res) {
    const id = parseInt(req.params.report_id, 10);
    const { latitude, longitude } = req.body;
    reports.find((report) => {
	  if (report.id === id) {
        report.latitude = latitude || report.latitude;
		report.longitude = longitude || report.longitude;
		console.log(report.latitude);

        return res.json({
		  message: 'Updated successfully',
		  data: report
        });
	  }
    });
  }
}

export default ReporterControllers;
