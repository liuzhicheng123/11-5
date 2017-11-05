/**
 * Created by Administrator on 2017/11/3.
 */
var express = require('express');
var router = express.Router();
var mysql=require('mysql');

var conn=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root'
})
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.post('/insert', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var title=req.body.title;
    var write=req.body.write;
    var sj=req.body.sj;
    var sel=req.body.sel;

    var col=req.body.color;
    console.log(sj,write,title,col)
    conn.query(`INSERT INTO taobao.liu(tit,wr,shij,color,uid) VALUES('${title}','${write}','${sj}','${col}','${sel}')`,function(err,rows){
        res.send(rows);
        //console.log(rows)
    })
})
router.post('/cha', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    conn.query('SELECT * FROM taobao.liu',function(err,rows){
        res.send(rows);
        //console.log(rows)
    })
})
router.post('/del', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    conn.query('DELETE FROM taobao.liu WHERE id='+id,function(err,rows){
        res.send(rows);
        //console.log(rows)
    })
})
router.post('/update',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    var bb=req.body.b;
    var xxtit=req.body.xtit;
    var xxzz=req.body.xzz;
    var yyy=req.body.yy;
    var sj=req.body.sj;
    console.log(yyy,bb,xxtit,xxzz,sj)
    conn.query('UPDATE taobao.liu SET tit="'+xxtit+'",wr="'+xxzz+'",color="'+bb+'",shij="'+sj+'" WHERE id='+yyy,function(err,rows,fields){
        res.send(rows);
    })
})
module.exports = router;
