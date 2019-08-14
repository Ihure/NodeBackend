import express from 'express';
import DepartmentController from "../../controllers/departmentController";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       properties:
 *         department_id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Regional
 *         description:
 *           type: string
 *           example: Proud of your country? Wear a T-shirt with a national symbol stamp!
 */


/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get All departments
 *     tags:
 *        - Departments
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/departments', DepartmentController.getAllDepartments);

/**
 * @swagger
 * /departments/{department_id}:
 *   get:
 *     summary: Get All departments
 *     tags:
 *       - Departments
 *     parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of department
 *     responses:
 *       200:
 *         description: Return a Object of Customer with auth credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         description: Return an Error object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 */

router.get('/departments/:departmentId', DepartmentController.getDepartment);

module.exports = router;
