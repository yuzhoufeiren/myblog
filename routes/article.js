var express = require('express');
var router = express.Router();
const querySql = require('../db/index')

/* 新增博客接口 */
// router.post('/add', async(req, res, next) => {
//   let {title,content} = req.body
//   let {username} = req.user
//   try {
//     let result = await querySql('select id from user where username = ?',[username])
//     let user_id = result[0].id
//     await querySql('insert into article(title,content,user_id,create_time) values(?,?,?,NOW())',[title,content,user_id])
//     res.send({code:0,msg:'新增成功',data:null})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });

// 获取全部博客列表接口
router.get('/allList', async(req, res, next) => {
  try {
    // let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from test'
    let sql = 'select id, x, y, create_date, modify_date, bridge_name from test'
    let result = await querySql(sql)
    res.send({code:0,msg:'获取成功',data:result})
  }catch(e){
    console.log(e)
    next(e)
  } 
});

// 获取我的博客列表接口
router.get('/myList', async(req, res, next) => {
  let {username} = req.user
  try {
    let userSql = 'select id from user where username = ?'
    let user = await querySql(userSql,[username])
    let user_id = user[0].id
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where user_id = ?'
    let result = await querySql(sql,[user_id])
    res.send({code:0,msg:'获取成功',data:result})
  }catch(e){
    console.log(e)
    next(e)
  } 
});

// 获取博客详情接口
router.get('/detail', async(req, res, next) => {
  let article_id = req.query.article_id
  try {
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where id = ?'
    let result = await querySql(sql,[article_id])
    res.send({code:0,msg:'获取成功',data:result[0]})
  }catch(e){
    console.log(e)
    next(e)
  } 
});

// router.get('/getById', async(req, res, next) => {
//   let id = req.query.id
//   try {
//     let sql = 'select id,content,x,y from test where id = ?'
//     let result = await querySql(sql,[id])
//     res.send({code:0,msg:'获取成功',data:result[0]})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });

// router.get('/getById', async(req, res, next) => {
//   let id = req.query.id
//   try {
//     // let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from test'
//     let sql = 'select id,content,x,y from test where id = ?'
//     let result = await querySql(sql,[id])
//     res.send({code:0,msg:'获取成功',data:result})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });

//查询数据接口
router.get('/getById', async(req, res, next) => {
  let id = req.query.id
  try {
    let result = await querySql('select id,content1,content2,content3,content4,x,y,bridge_name,bridge_status from test where id = ?',[id])
    console.log(result)
    res.send({code:0,msg:'查询成功',data:result[0]})
  }catch(e){
    console.log(e)
    next(e)
  } 
});


// 更新数据接口
// router.post('/update', async(req, res, next) => {
//   try {
//     let obj = req.body;
//     console.log(JSON.stringify(obj, 5, null))
//     console.log(obj.id)
//     let userSql = 'select id from test where id = ?'
//     let user = await querySql(userSql, [obj.id])
//     let sql = 'update test set content = ?,x = ? ,y = ?, bridge_name=? where id = ?';
//     await querySql(sql, [obj.content1, obj.x, obj.y,, obj.bridge_name, obj.id]);
//     res.send({code:1,msg:'更新成功',data:null})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });

router.post('/update', async(req, res, next) => {
  try {
    let {id,content1,content2,content3,content4,x,y,bridge_name,bridge_status} = req.body;
    let userSql = 'select id from test where id = ?'
    let user = await querySql(userSql, [id])
    let sql = 'update test set content1 = ?,content2 = ?,content3 = ?,content4 = ?,x = ? ,y = ?, bridge_name=?, bridge_status = ? where id = ?';
    await querySql(sql, [content1,content2,content3,content4, x, y, bridge_name,bridge_status, id]);
    res.send({code:1,msg:'更新成功',data:null})
  }catch(e){
    console.log(e)
    next(e)
  } 
});

// 删除数据接口
// router.post('/delete', async(req, res, next) => {
//   let {id} = req.body
//   try {
//     let userSql = 'select id from test where id = ?'
//     let user = await querySql(userSql,[id])
//     let user_id = user[0].id
//     let sql = 'delete from test where id =?'
//     let result = await querySql(sql,[x,y])
//     res.send({code:0,msg:'删除成功',data:null})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });



//删除数据接口
router.post('/delete', async(req, res, next) => {
  let {id} = req.body
  try {
    await querySql('delete from test where id = ?',[id])
    res.send({code:0,msg:'删除坐标成功',data:null})
  }catch(e){
    console.log(e)
    next(e)
  } 
});




//获取坐标接口
router.get('/test', async(req, res, next) => {
  try {
    let sql = 'select id, x , y, modify_date, content1, content2, content3, content4, color, bridge_status from test'
    let result = await querySql(sql)
    res.send({code:0,msg:'获取成功',data:result})
  }catch(e){  
    console.log(e)
    next(e)
  } 
});
//DATE_FORMAT(create_date,"%Y-%m-%d %H:%i:%s")  AS create_date

//新增坐标接口
router.post('/addX', async(req, res, next) => {
  let {bridge_name,x,y,content1, content2, content3, content4, bridge_status} = req.body
  try {
    await querySql('insert into test(bridge_name,x,y,content1, content2, content3, content4,bridge_status, create_date) values(?,?,?,?,?,?,?,?,NOW())',[bridge_name,x,y,content1, content2, content3, content4,bridge_status])
    res.send({code:0,msg:'新增坐标成功',data:null})
  }catch(e){
    console.log(e)
    next(e)
  } 
});


//桥梁的线条颜色状态
// router.get('/test', async(req, res, next) => {
//   console.log(req)
//   try {
//     let sql = 'select id, x , y, color, bridge_status, content1, content2, content3, content4 from test'
//     let result = await querySql(sql)
//     res.send({code:0,msg:'获取成功',data:result})
//   }catch(e){
//     console.log(e)
//     next(e)
//   } 
// });

//查询表格数据
router.get('/getTableData', async(req, res, next) => {
  try {
    // let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from test'
    let sql = 'select content1, content2, content3, content4 from test'
    let result = await querySql(sql)
    res.send({code:0,msg:'获取成功',data:result})
  }catch(e){
    console.log(e)
    next(e)
  } 
});





module.exports = router;
