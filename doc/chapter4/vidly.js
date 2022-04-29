const express = require('express');
const { func } = require('joi');
const Joi = require('joi');



const app = express();
app.use(express.json()); // 添加中间件
app.get('/', (req, res) => res.send('homepage'));

// database
const movies = [
    {id: 1, genre: 'Action', name: 'Inception',  year: 2010},
    {id: 2, genre: 'Comedy', name: 'Hot Fuzz',   year: 2007},
    {id: 3, genre: 'Crime',  name: 'Dâku naito', year: 2008}
]   

function validateMovie(movie){
    const schema = Joi.object({
        genre: Joi.string().min(3).max(100).required(),
        name: Joi.string().min(3).max(100).required(),
        year: Joi.number().min(1900).max(2022),
    })
    return schema.validate(movie);
}

app.get('/api/movies/', (req, res)=> res.send(movies));
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(c=>c.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('not found');
    res.send(movie);
})

app.post('/api/movies/', (req, res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = {
        id: movies.length+1,
        genre: req.body.genre,
        name: req.body.name,
        year: req.body.year
    }
    
    movies.push(movie);
    res.send(movie);
})

app.put('/api/movies/:id', (req, res)=>{
    // 数据查找
    const movie = movies.find(c=>c.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('not found');
    // 数据验证
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // 数据提交
    movie.genre = req.body.genre;
    movie.name = req.body.name;
    movie.year = req.body.year;
    
    movies.push(movie);
    res.send(movie);
})

app.delete('/api/movies/:id', (req, res) => {
    // 数据查找
    const movie = movies.find(c=>c.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('not found');
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`vidly is listening ${port} ...`));
