const connection = require('../config/seq');

class DepartmentModel {
	static getAllDepartments() {
		return new Promise((resolve, reject ) => {
			connection.query('SELECT * FROM department',{type: connection.QueryTypes.SELECT })
				.then(deps => {
					resolve(deps);
				})
				.catch(e => reject(e));
		});
	}

	static getDepartment(id) {
		return new Promise((resolve, reject ) => {
			connection.query('SELECT * FROM department WHERE department_id =:id',
				{replacements: { id: id },type: connection.QueryTypes.SELECT })
				.then(deps => {
					resolve(deps[0]);
				})
				.catch(e => reject(e));
		});
	}
}

module.exports = DepartmentModel;
