module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router()
    //创建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //按id删除
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            message: 'success'
        })
    })
    //按keyword查询  
    router.get('/where', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'ExamRecord') { queryOptions.populate = ['user', 'exam'] }
        const items = await req.Model.find(req.query).setOptions(queryOptions)
        res.send(items)
    })

    //按id查询
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //获取全部
    router.get('/', async (req, res) => {
        const queryOptions = {}
        switch (req.Model.modelName) {
            case 'News':
                queryOptions.populate = 'categories'
                break;
            case 'Category':
                queryOptions.populate = 'parent'
                break;
            case 'ExamRecord':
                queryOptions.populate = ['user', 'exam']
                break;
            case 'Message':
                queryOptions.populate = ['user', 'course']
                break;

            default:
                break;
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    //分页查询用户
    router.post('/pagelist', async (req, res) => {
        const page = req.body.page;
        const rows = req.body.rows;

        const queryOptions = {}
        if (req.Model.modelName === 'Message') { queryOptions.populate = ['user', 'course'] }

        var query = req.Model.find({}).setOptions(queryOptions);
        query.skip((page - 1) * rows);
        query.limit(rows);



        //res.send(query)

        //计算分页数据
        query.exec(function (err, rs) {
            if (err) {
                res.send(err);
            } else {
                //计算数据总数
                req.Model.find(function (err, result) {
                    jsonArray = { rows: rs, total: result.length };
                    res.json(jsonArray);
                });

            }
        });
    })
    //模糊查询
    router.post('/searchByWord', async (req, res) => {
        var reg = new RegExp(req.body.KeyWord, 'i');
        const items = await req.Model.find({
            username: { $regex: reg }
        });
        res.send(items)
    })




    const authMiddleware = require("../../middleware/auth")

    const resourceMiddleware = require("../../middleware/resource")

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../uploads')
        },
        filename: function (req, file, cb) {
            var singfileArray = file.originalname.split('.');
            var fileExtension = singfileArray[singfileArray.length - 1];
            cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
            console.log(file);
        }
    })
    const upload = multer({storage: storage })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        req.file.url = "http://localhost:3000/uploads/" + req.file.filename
        res.send(req.file)
    })

    //登陆
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body

        //1.根据用户名查找用户

        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, "用户不存在")
        //2.校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, "密码错误")
        //3.返回token

        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send(token)
    })





    //错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })




}