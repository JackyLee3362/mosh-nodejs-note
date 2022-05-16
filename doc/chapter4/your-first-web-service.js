const express = require('express');

const Joi = require('joi');
const app = express();


app.use(express.json()); // 添加中间件

// 数据库
const courses = [
    {id: 1, name: 'math'},
    {id: 2, name: 'art'},
    {id: 3, name: 'chemistry'}
]

// 验证逻辑函数
function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

// 快速开始
app.get('/', (req, res) => res.send('hello, world! this is homepage'));
app.get('/api/courses',(req, res) =>res.send(courses));

// 处理GET请求
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('not found');
    res.send(course);
})

// 处理POST请求
app.post('/api/courses/', (req, res) =>{
    // 验证发送过来的数据是否正确
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);

})

// 处理PUT请求
app.put('/api/courses/:id', (req, res) => {
    // 查找课程，如果不存在，返回404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('not found');

    // 验证，如果非法，返回400
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // 更新课程数据
    course.name = req.body.name;
    res.send(course);
})

// 处理DELETE请求
app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('not found');

    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})


// 启动服务器
const port = process.env.PORT || 3000; // 4.6 设置环境变量PORT 
app.listen(port, () => console.log(`listening on port ${port}...`));
