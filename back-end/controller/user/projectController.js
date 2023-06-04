var multer = require('multer');
const path = require('path')
const mysql = require('mysql');
const constant = require('../../config/constant')
const config = require('../../config/config');
var uuid = require('uuid')
var moment = require('moment');




/////////////////////////////////// DB CONNECTIONS//////////////////////////////////////
const con = mysql.createConnection({ //connect mySql Function
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

con.connect();

function queryDb(query) {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })
}

/////////////////////////////// PROJECT API's ///////////////////////////////////////

exports.addProject = async (req, res) => {
    console.log('api running ++++++++++++++++++++++++++++++++')
    try {
        let Data = req.body
        const INTERVALS = [];
        let getDate = new Date()
        getDate.setDate(getDate.getDate() + 1)
        let tdate = getDate.getDate();
        let month = getDate.getMonth()+1 ;
        let year = getDate.getFullYear();
        let check = (year + "-" + month + "-" + tdate)
        let templates = Data.templates
        var sum = 0;

console.log('checking the date+++++++++++++',getDate,check)

        /////////////////////////////// ADD PROJECT CODES ///////////////////////////////////////
        let projectId = uuid.v1().toString()
        var project_name = Data.project_name
        var date = check
        var id = projectId
        var user_id = req.userId
        let insertProjectQuery = "INSERT into `projects`(`project_name`,`id`, `user_id`,`created_at`) VALUES (" + con.escape(project_name) + "," + con.escape(id) + "," + con.escape(user_id) + " ," + con.escape(check) + " )"
        let saveProject = await queryDb(insertProjectQuery)
        /////////////////////////////// ADD TEMPLATES CODES ///////////////////////////////////////
        for (let i = 0; i < templates.length; i++) {
            let item = templates[i];
            var start_time = item.start_time
            var end_time = item.end_time
            var speed = item.item_speed ? item.item_speed : 'NORMAL'
            var temp_value = item.temp_value
            var logo_image = item.logo_image
            var call_to_action_image = item.call_to_action_image
            let id = uuid.v1().toString()
            var project_id = projectId
            var data = JSON.stringify(item.data_items)
            let insertQuery = "INSERT INTO `project_templates` ( `start_time`, `end_time`, `speed`,`logo_image`,`project_id`,`id`, `data`,`temp_value`,`call_to_action_image`) VALUES ( " + con.escape(start_time) + ", " + con.escape(end_time) + ", " + con.escape(speed) + "," + con.escape(logo_image) + "," + con.escape(project_id) + "," + con.escape(id) + "," + con.escape(data) + "," + con.escape(temp_value) + "," + con.escape(call_to_action_image) + ");";
            let saveTemplate = await queryDb(insertQuery)
        }
        res.send({
            code: constant.SUCCESS_CODE,
            msg: "Project Add Successfully"
        })
        return
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.checkTemplateDateTime = async (req, res) => {
    try {
        let Data = req.body
        ////////////////////////////////// Dates Check ////////////////////////////////////////////
        let getDate = new Date()
        let tdate = getDate.getDate();
        let month = getDate.getMonth() + 1;
        let year = getDate.getFullYear();
        let check = (year + "-" + month + "-" + tdate).toLocaleString(undefined, {
            timeZone: 'Asia/Kolkata'
        });
        let checkQuery = "select * from projects where created_at = " + con.escape(check) + "and user_id = " + con.escape(req.userId)
        let checkProject = await queryDb(checkQuery)
        if (checkProject.length != 0) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "You already added a project on this same date"
            })
        } else {
            let templates = Data.templates

            var sum = 0;
            for (let index in templates) {

                let current_start = new Date(`${check} ${templates[index].start_time}`);
                let current_end = new Date(`${check} ${templates[index].end_time}`);

                function diff_hours(dt2, dt1) {

                    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
                    diff /= (60 * 60);
                    return Math.abs(Math.round(diff));

                }
                sum += diff_hours(current_start, current_end)



                for (let inner_index in templates) {

                    let check_from = new Date(`${check} ${templates[inner_index].start_time}`);
                    let check_to = new Date(`${check} ${templates[inner_index].end_time}`);

                    if (index != inner_index) {
                        console.log('index------', index, inner_index)
                        if (check_from < current_start && check_to > current_start || check_from < current_end && check_to > current_start) {
                            console.log('yes conflicting------')
                            res.send({
                                code: constant.ERROR_CODE,
                                msg: "Please check your times"
                            })

                        }
                    }
                }
            }
            if (sum == 24) {
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Your Booking Complete 24 hours. Please click on generate Button to confirm"
                })
            } else {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Please make sure your templates is completing the min 24 hours"
                })
            }
            return
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.checkEditTemplateDateTime = async (req, res) => {
    try {
        let Data = req.body
        // const INTERVALS = [];
        ////////////////////////////////// Dates Check ////////////////////////////////////////////
        let getDate = new Date()
        let tdate = getDate.getDate();
        let month = getDate.getMonth() + 1;
        let year = getDate.getFullYear();
        let check = (year + "-" + month + "-" + tdate).toLocaleString(undefined, {
            timeZone: 'Asia/Kolkata'
        });
        let checkQuery = "select * from projects where created_at = " + con.escape(check) + " and user_id = " + con.escape(req.userId) + ""
        let checkProject = await queryDb(checkQuery)
        let templates = Data.templates
        var sum = 0;
        for (let index in templates) {

            let current_start = new Date(`${check} ${templates[index].start_time}`);
            let current_end = new Date(`${check} ${templates[index].end_time}`);

            function diff_hours(dt2, dt1) {

                var diff = (dt2.getTime() - dt1.getTime()) / 1000;
                diff /= (60 * 60);
                return Math.abs(Math.round(diff));

            }
            sum += diff_hours(current_start, current_end)

            for (let inner_index in templates) {

                let check_from = new Date(`${check} ${templates[inner_index].start_time}`);
                let check_to = new Date(`${check} ${templates[inner_index].end_time}`);

                if (index != inner_index) {
                    console.log('index------', index, inner_index)
                    if (check_from < current_start && check_to > current_start || check_from < current_end && check_to > current_start) {
                        console.log('yes conflicting------')
                        res.send({
                            code: constant.ERROR_CODE,
                            msg: "Please check your times"
                        })

                    }
                }
            }
        }
        if (sum == 24) {

            res.send({
                code: constant.SUCCESS_CODE,
                msg: "Your Booking Complete 24 hours. Please click on generate Button to confirm"
            })
        } else {

            res.send({
                code: constant.ERROR_CODE,
                msg: "Please make sure your templates is completing the min 24 hours"
            })
        }
        return
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.getProject = async (req, res) => {
    try {
        let data = req.body
        let today = Date.now();
        let getDate = new Date(today);
        let tdate = getDate.getDate();
        let month = getDate.getMonth();
        let year = getDate.getFullYear();
        let check = year + "-" + month + "-" + tdate
        let checkQuery = "select * from projects where user_id = " + con.escape(req.userId)
        let checkProject = await queryDb(checkQuery)
        if (checkProject) {
            res.send({
                code: constant.SUCCESS_CODE,
                'data': checkProject
            })
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        let data = req.params
        let deleteQuery = "DELETE FROM projects WHERE id = " + con.escape(data.project_id)
        let deleteProject = await queryDb(deleteQuery)
        if (!deleteProject) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to delete the project"
            })
        } else {
            let templateQuery = "DELETE FROM project_templates WHERE project_id = " + con.escape(data.project_id)
            let checkAndRemoveTemlate = await queryDb(templateQuery)
            res.send({
                code: constant.SUCCESS_CODE,
                msg: "Deleted successfully"
            })
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.updateProject = async (req, res) => {
    try {
        let Data = req.body
        let templates = Data.templates
        ////////////////////////////////// Dates Check ////////////////////////////////////////////
        let getDate = new Date();
        getDate.setDate(getDate.getDate() + 1)
        let tdate = getDate.getDate() ;
        let month = getDate.getMonth() + 1;
        let year = getDate.getFullYear();
        let check = year + "-" + month + "-" + tdate
        let checkQuery = "select * from projects where created_at = " + con.escape(check) + "and user_id = " + con.escape(req.userId) + ""
        let checkProject = await queryDb(checkQuery)
        let udpateQuery = "UPDATE projects SET project_name = " + con.escape(Data.project_name) + " where id = " + con.escape(Data.projectId)
        let updateProject = await queryDb(udpateQuery)

        let clearTemplateData = await queryDb("DELETE FROM `project_templates` WHERE project_id = " + con.escape(Data.projectId))
        for (let i = 0; i < templates.length; i++) {
            let item = templates[i];

            var start_time = item.start_time
            var end_time = item.end_time
            var speed = item.item_speed ? item.item_speed : 'NORMAL'
            var temp_value = item.temp_value
            var logo_image = item.logo_image
            var call_to_action_image = item.call_to_action_image
            let id = uuid.v1().toString()
            var project_id = Data.projectId
            var data = JSON.stringify(item.data_items)
            let insertQuery = "INSERT INTO `project_templates` ( `start_time`, `end_time`, `speed`,`logo_image`,`project_id`,`id`, `data`,`temp_value`,`call_to_action_image`) VALUES ( " + con.escape(start_time) + ", " + con.escape(end_time) + ", " + con.escape(speed) + "," + con.escape(logo_image) + "," + con.escape(project_id) + "," + con.escape(id) + "," + con.escape(data) + "," + con.escape(temp_value) + "," + con.escape(call_to_action_image) + ");";
            let saveTemplate = await queryDb(insertQuery)

            if (!saveTemplate) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to update the data"
                })
            }
        }
        res.send({
            code: constant.SUCCESS_CODE,
            msg: "Updated Successfully"
        })
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

/////////////////////////////// TEMPLATE API's ///////////////////////////////////////

exports.editProjectTemp = async (req, res) => {
    try {
        let data = req.body
        let project_id = data.project_id
        let projectQuery = "select * from projects where id = " + con.escape(project_id)
        let getProjectData = await queryDb(projectQuery)
        let templatesQuery = ("select start_time,end_time,speed,logo_image,call_to_action_image,id,data,temp_value,created_at from project_templates where project_id = " + con.escape(data.project_id))
        let getTemplateData = await queryDb(templatesQuery)
        if (!getProjectData) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to get project"
            })
        } else {
            let project_name = getProjectData[0].project_name
            let project_date = getProjectData[0].date
            let projectId = getProjectData[0].id
            let templates = getTemplateData


            updatedarry = templates.map(item => {
                return {
                    ...item,
                    item_speed: item.speed,
                    data_items: item.data
                };
            }); //Rename Keys

            updatedarry.forEach(object => {
                delete object['speed'];
            }); //Delete Keys
            templates = updatedarry


            for (let i = 0; i < templates.length; i++) {

                if (templates[i].data) {
                    templates[i].data_items = JSON.parse(templates[i].data_items)
                }

            }


            res.send({
                code: constant.SUCCESS_CODE,
                msg: "Success",
                data: {
                    project_name,
                    project_date,
                    projectId,
                    templates
                }
            })
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

exports.deleteTemplate = async (req, res) => {
    try {
        let data = req.params
        let deleteQuery = "DELETE from project_templates WHERE id = " + con.escape(data.template_id);
        let deleteTemplate = await queryDb(deleteQuery)
        if (!deleteTemplate) {
            res.send({
                code: constant.ERROR_CODE,
                msg: "Unable to delete the template"
            })
        } else {
            res.send({
                code: constant.SUCCESS_CODE,
                msg: "Project Deleted Successfully"
            })
        }
    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message
        })
    }
}

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/template_image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: Storage,
    limits: {
        fileSize: '100M'
    }
}).single("file")


exports.uploadTemplateImage = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            let file = req.file
            console.log('check--File', file)
            if (err) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to upload the images err", err
                })
            } else {
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Uploaded",
                    data: file.filename
                })
            }
        })

    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message,

        })
    }
}

var callToActionImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/template_image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var uploadActionImage = multer({
    storage: callToActionImage,
    limits: {
        fileSize: '100M'
    }
}).single("action_image")


exports.upload_call_to_action_image = async (req, res) => {
    try {
        uploadActionImage(req, res, async (err) => {
            let file = req.file
            if (err) {
                res.send({
                    code: constant.ERROR_CODE,
                    msg: "Unable to upload the image"
                })
            } else {
                res.send({
                    code: constant.SUCCESS_CODE,
                    msg: "Uploaded",
                    data: file.filename
                })
            }
        })

    } catch (err) {
        res.send({
            code: constant.ERROR_CODE,
            msg: err.message,

        })
    }
}


