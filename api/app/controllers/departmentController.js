import DepartmentModel from '../model/departmentModel';
const Constant = require('../constants/common.definitations');

/**
 *
 *
 * @class DepartmentController
 */
class DepartmentController {
	/**
	 *@desc Get all departments
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with department data
	 * @memberOf DepartmentController
	 */
	static async getAllDepartments(req, res){
		try{
			const departments = await DepartmentModel.getAllDepartments();
			res.json(departments);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}
	/**
	 *@desc Get one departments
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @returns {json} json object with department data
	 * @memberOf DepartmentController
	 */
	static async getDepartment(req, res){
		const depId = req.params.departmentId;
		try{
			const departments = await DepartmentModel.getDepartment(depId);
			res.json(departments);
		}catch (e) {
			Constant.errorMessage.message = e.message;
			Constant.errorMessage.code = e.code;
			res.status(400).send(Constant.errorMessage)
		}
	}

}

module.exports = DepartmentController;
