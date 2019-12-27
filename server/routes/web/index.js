module.exports = app => {
  const router = require('express').Router()
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  //查询广告
  router.get('/ads/where', async (req, res) => {
    const AD = require('../../models/Ad')
    const items = await AD.find(req.query)
    res.send(items)
  })

  //按条件查询订单
  router.get('/orders/where', async (req, res) => {
    const CourseOrder = require('../../models/CourseOrder')
    const items = await CourseOrder.find(req.query).populate('Course')
    res.send(items)
  })

  //查询购买数
  router.get('/orders/:id', async (req, res) => {
    const CourseOrder = require('../../models/CourseOrder')
    const items = await CourseOrder.find({ 'Course': req.params.id })
    res.send(items.length)
  })

  //查询试卷是否购买
  router.get('/exam_orders/where', async (req, res) => {
    const ExamOrder = require('../../models/ExamOrder')
    const items = await ExamOrder.find(req.query)
    res.send(items)
  })



  //查询热门课程
  router.get('/hot_courses', async (req, res) => {
    const CourseOrder = require('../../models/CourseOrder')
    const Course = require('../../models/Course')

    const courses = await CourseOrder.find()
    const hot_ids = await CourseOrder.aggregate([
      {
        $match: {
          "courses": courses._id
        }
      },
      {
        $group: {
          _id: "$Course",
          totalTime: { $sum: 1 },
        }
      },
      {
        $sort: { totalTime: -1 }
      }
    ]).limit(3)
    let items = await Course.find({ _id: { $in: hot_ids.map(id => { return id._id }) } })
    for (let i = 0; i < items.length; i++) { items[i].description = hot_ids[i].totalTime }
    res.send(items)
  })


  //查询试题
  router.get('/all_exams', async (req, res) => {
    const Exam = require("../../models/Exam")
    const items = await Exam.find()
    res.send(items)
  })

  //查询新闻
  router.get('/all_news', async (req, res) => {
    const News = require("../../models/News")
    const items = await News.find()
    res.send(items)
  })

  //查询课程下的分类
  router.get('/course_categories', async (req, res) => {
    const Category = require("../../models/Category")
    const parent = await Category.findOne({
      name: '课程'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    res.send(cats)
  })

  //查询课程
  router.get('/courses', async (req, res) => {
    const Course = require("../../models/Course")
    const CourseOrder = require('../../models/CourseOrder')
    const items = await Course.find()
    for (let i = 0; i < items.length; i++) {
      const ii = await CourseOrder.find({ 'Course': items[i]._id })
      items[i].__v = ii.length
    }
    res.send(items)
  })
  //按条件查询课程
  router.get('/courses/where', async (req, res) => {
    const Course = require("../../models/Course")
    const CourseOrder = require('../../models/CourseOrder')
    const items = await Course.find(req.query)
    for (let i = 0; i < items.length; i++) {
      const ii = await CourseOrder.find({ 'Course': items[i]._id })
      items[i].__v = ii.length
    }
    res.send(items)
  })

  //查询某课程的所有章节
  router.get('/chapters/:id', async (req, res) => {
    const Chapter = require('../../models/Chapter')
    const items = await Chapter.find({ 'course': req.params.id }).populate('course')
    res.send(items)
  })

  //考试相关
  //查询考试下的分类
  router.get('/exam_categories', async (req, res) => {
    const Category = require("../../models/Category")
    const parent = await Category.findOne({
      name: '试题'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    res.send(cats)
  })

  //查询试题
  router.get('/exams', async (req, res) => {
    const Exam = require("../../models/Exam")
    const items = await Exam.find()
    res.send(items)
  })
  //按条件查询试题
  router.get('/exams/where', async (req, res) => {
    const Exam = require("../../models/Exam")
    let items
    if (req.query.type) {
      items = await Exam.find({ 'type': req.query.type })
    } else { items = await Exam.find() }

    if (req.query.order) {
      const ExamOrder = require('../../models/ExamOrder')
      let removeItems = await ExamOrder.find({ 'user': req.query.user })
      removeItems = removeItems.map(el => { return String(el.Exam) })
      if (req.query.order == 0) {
        items = items.filter(it => removeItems.includes(String(it._id)))
      } else if (req.query.order == 1) {
        items = items.filter(it => !removeItems.includes(String(it._id)))
      }
    }
    res.send(items)
  })
  //上传答题卡
  router.post('/exam_record', async (req, res) => {
    const ExamRecord = require("../../models/ExamRecord")
    const item = await ExamRecord.create(req.body)
    res.send(item)
  })

  router.get('/exams/:id', async (req, res) => {
    const Exam = require("../../models/Exam")
    const item = await Exam.findById(req.params.id)
    res.send(item)
  })


  //留言相关
  //根据课程查找留言
  router.get('/messages/:id', async (req, res) => {
    const Message = require('../../models/Message')
    const items = await Message.find({ 'course': req.params.id }).populate('user')
    res.send(items)
  })
  //保存留言
  router.post('/messages', async (req, res) => {
    const Message = require('../../models/Message')
    await Message.create(req.body)
    res.send({
      message: "发送成功"
    })
  })


  //学习卡相关
  //查询
  router.get('/study_cards/:id', async (req, res) => {
    const StudyCard = require('../../models/StudyCard')
    const item = await StudyCard.findOne({ 'user': req.params.id }).populate('user')
    res.send(item)
  })
  //充值
  //获得积分
  router.post('/get_point', async (req, res) => {
    const StudyCard = require('../../models/StudyCard')
    const Course = require('../../models/Course')
    const CourseRecord = require('../../models/CourseRecord')
    const { user, course } = req.body
    const { statu, chapters } = await CourseRecord.findOne({ 'Course': course, 'user': user })
    chapters.forEach(el => {
      if (el == false) {
        res.send('还未完成所有任务')
        return
      }
    });
    if (statu == false) {
      const { point } = await Course.findById(course)
      await CourseRecord.findOneAndUpdate({ 'Course': course, 'user': user }, { 'statu': true })

      const { points } = await StudyCard.findOne({ 'user': user })
      await StudyCard.findOneAndUpdate({ 'user': user }, { 'points': parseInt(points) + parseInt(point) })
      res.send('获取成功')
    }
    res.send('已经获取过该奖励')
  })

  //兑换
  router.post('/exchange', async (req, res) => {
    const StudyCard = require('../../models/StudyCard')
    const { user, coins } = req.body
    const { points, studyCoins } = await StudyCard.findOne({ 'user': user })
    //暂时写死汇率  200积分1个学习币
    if (points < coins * 200) {
      res.status('402').send({ message: '兑换失败，您的积分不足' })
    } else {
      await StudyCard.findOneAndUpdate({ 'user': user }, { 'studyCoins': parseInt(studyCoins) + parseInt(coins), 'points': points - 200 * coins })
      res.status('200').send({ message: '兑换成功' })
    }
  })
  //购买
  router.post('/shop', async (req, res) => {
    const StudyCard = require('../../models/StudyCard')
    const CourseOrder = require('../../models/CourseOrder')
    const Course = require('../../models/Course')
    const { user, course } = req.body
    const { studyCoins } = await StudyCard.findOne({ 'user': user })
    const { price } = await Course.findById(course)
    if (studyCoins < price) {
      res.status('402').send({ message: '购买失败，您的余额不足' })
    } else {
      await StudyCard.findOneAndUpdate({ 'user': user }, { 'studyCoins': (parseInt(studyCoins) - parseInt(price)) })
      await CourseOrder.create({ 'Course': course, 'user': user })
      res.status('200').send({ message: '购买成功' })
    }
  })

  //购买试题
  router.post('/shop_exam', async (req, res) => {
    const StudyCard = require('../../models/StudyCard')
    const ExamOrder = require('../../models/ExamOrder')
    const Exam = require('../../models/Exam')
    const { user, exam } = req.body
    const { studyCoins } = await StudyCard.findOne({ 'user': user })
    const { price } = await Exam.findById(exam)
    if (studyCoins < price) {
      res.status('402').send({ message: '购买失败，您的余额不足' })
    } else {
      await StudyCard.findOneAndUpdate({ 'user': user }, { 'studyCoins': (parseInt(studyCoins) - parseInt(price)) })
      await ExamOrder.create({ 'Exam': exam, 'user': user })
      res.status('200').send({ message: '购买成功' })
    }
  })


  //学习记录
  //根据条件查询学习记录
  router.get('/course_records/where', async (req, res) => {
    const CourseRecord = require('../../models/CourseRecord')
    const items = await CourseRecord.find(req.query).populate('Course')
    res.send(items)
  })
  //创建学习记录
  router.post('/course_records', async (req, res) => {
    const CourseRecord = require('../../models/CourseRecord')
    const item = await CourseRecord.create(req.body)
    res.send(item)
  })
  //更新学习记录
  router.put('/update_records', async (req, res) => {
    const CourseRecord = require('../../models/CourseRecord')
    const { Course, user, chapters } = req.body
    const item = await CourseRecord.findOneAndUpdate({ 'Course': Course, 'user': user }, { 'chapters': chapters })
    res.send(item)
  })

  //新闻相关
  router.get('/news_categories', async (req, res) => {
    const Category = require("../../models/Category")
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    res.send(cats)
  })

  router.get('/news/where', async (req, res) => {
    const News = require('../../models/News')
    const items = await News.find(req.query).populate('categories')
    res.send(items)
  })
  router.get('/news/:id', async (req, res) => {
    const News = require('../../models/News')
    const item = await News.findById(req.params.id)
    res.send(item)
  })
  router.get('/news', async (req, res) => {
    const News = require('../../models/News')
    const items = await News.find().populate('categories')
    res.send(items)
  })

  //证书相关
  router.get('/issues/:id', async (req, res) => {
    const Issue = require('../../models/Issue')
    const items = await Issue.find({ 'user': req.params.id }).populate(['certificate', 'user'])
    res.send(items)
  })

  //查找用户
  router.get('/user/:id', async (req, res) => {
    const User = require('../../models/User')
    const item = await User.findById(req.params.id)
    res.send(item)
  })

  //搜索功能
  //模糊查询
  router.get('/search/where', async (req, res) => {
    const Course = require('../../models/Course')
    const Exam = require('../../models/Exam')
    const News = require('../../models/News')
    var reg = new RegExp(req.query.keyword, 'i');
    let items = { courses: '', exams: '', news: '' }
    items.courses = await Course.find({
      name: { $regex: reg }
    });
    items.exams = await Exam.find({
      title: { $regex: reg }
    });
    items.news = await News.find({
      title: { $regex: reg }
    });

    res.send(items)
  })

  //用户登陆与注册
  router.post('/createUser', async (req, res) => {
    const User = require('../../models/User')
    const StudyCard = require('../../models/StudyCard')
    const item = await User.create(req.body)
    await StudyCard.create({ 'user': item._id, 'points': 1000, 'studyCoins': 0 })
    res.send(item)
  })
  //登陆
  router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const User = require('../../models/User')
    //1.根据用户名查找用户
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, "用户不存在")
    //2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, "密码错误")
    //3.返回token

    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token: token, userId: user._id })
  })
  router.post('/updateUser/:id', async (req, res) => {
    const User = require('../../models/User')
    const item = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
  })
  router.post('/updatePassword/:id', async (req, res) => {
    const User = require('../../models/User')
    const { newpass, oldpass } = req.body
    const user = await User.findById(req.params.id).select('+password')
    const isValid = require('bcryptjs').compareSync(oldpass, user.password)
    assert(isValid, 422, "密码错误")
    const item = await User.findByIdAndUpdate(req.params.id, {'password':newpass})
    res.send(item)
  })

  router.get('/getID', async (req, res) => {
    const User = require('../../models/User')
    const token = String(req.headers.authorization || '').split(' ').pop();
    assert(token, 401, '请先登陆')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登陆')
    req.user = await User.findById(id)
    assert(req.user, 401, '请先登陆')
    res.send(req.user._id)
  })


  app.use('/web/api', router)


  //上传接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/web/api/upload', upload.single('file'), async (req, res) => {
    req.file.url = "http://localhost:3000/uploads/" + req.file.filename
    res.send(req.file)
  })


  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })


}




