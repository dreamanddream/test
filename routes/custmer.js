
var express = require('express');
var mongoose=require("./conn");
var router = express.Router();

var Schema = mongoose.Schema;
//通过Schema创建一个模式custmerSchema
var custmerSchema  = new Schema({
    name: String,
    sex:String,
    tel: String,
    address: String,
    content:String
});

//通过模式custmerSchema  创建一个模型custmerModel
var custmerModel = mongoose.model("chengdus",custmerSchema);
var custmerQueryModel= mongoose.model("chengdus");//用于查询的模型

/* 第一次get请求打开表单页面 */
router.get('/add', function(req, res, next) {
    res.render('custmeradd',{  });
});

//填写完表单数据，点击提交按钮后添加信息 处理post请求
router.post('/add', function(req, res, next) {
    var name=req.body.tbname;
    var sex=req.body.tbsex;
    var tel=req.body.tbtel;
    var address=req.body.tbaddress;
    var content=req.body.tbcontent;
    //custmerModel 写入数据
    var instance1 = new custmerModel ();
    instance1.name=name;
    instance1.sex=sex;
    instance1.tel=tel;
    instance1.address=address;
    instance1.content=content;
    //通过save方法保存
    instance1.save(function(err){
        if (!err) {
            res.end("保存成功!")
        }
        else
        {
            res.end("保存失败!")
        }
    });
});

//分页显示
router.get('/list', function(req, res, next) {
    var pageindex=req.query.p;
    var allpage=0;
    var pagesize=10;
    if(isNaN(pageindex))
    {
        pageindex=1;
    }
    custmerQueryModel.find({}).exec(function(allerr,alldocs){
        var allrecordscount=alldocs.length;//满足条件的总的文档数
        allpage=(allrecordscount%pagesize==0)?(allrecordscount/pagesize):(parseInt(allrecordscount/pagesize)+1)
        var prepage= parseInt(pageindex)-1;
        var nextpage=parseInt(pageindex)+1;
        if(prepage<1)
        {
            prepage=1;
        }
        if(nextpage>allpage)
        {
            nextpage=allpage;
        }
        var lastpage=allpage;
        custmerQueryModel.find({}).skip(pagesize*(pageindex-1)).limit(pagesize).exec(function(err,docs){
            res.render('custmerlist',{"datalist":docs,"allrecordscount":allrecordscount,"pagesize":pagesize,"allpage":allpage,"pageindex":pageindex,"prepage":prepage,"nextpage":nextpage,"lastpage":lastpage});
        });
    });

});


//查看详情
router.get('/view', function (req,res,next) {
    var id=req.query.id;
    custmerQueryModel.find({"_id":id},function(err,docs){
        var item=docs[0];
        res.render("custmerview",{"name":item.name,"sex":item.sex,"tel":item.tel,"content":item.content,"address":item.address});
    });
});

//修改功能制作
router.get('/edit', function (req,res,next) {
    var id=req.query.id;
    custmerQueryModel.find({"_id":id},function(err,docs){
        var item=docs[0];
        res.render("custmeredit",{"id":item._id,"name":item.name,"sex":item.sex,"tel":item.tel,"content":item.content,"address":item.address});
    });
});
//保存编辑后的数据
router.post('/edit', function (req,res,next) {
    //接收前端提交到后端的参数
    var id=req.body.tbid;
    var name=req.body.tbname;
    var sex=req.body.tbsex;
    var tel=req.body.tbtel;
    var address=req.body.tbaddress;
    var content=req.body.tbcontent;
    custmerQueryModel.findById(id,function(err,doc){
        doc.name=name;
        doc.sex=sex;
        doc.tel=tel;
        doc.address=address;
        doc.content=content;
        doc.save(function(err){
            if(!err)
            {
                res.redirect("/custmer/list/?p=1");
            }
            else
            {
                res.end(err.message);
            }
        });
    });
});


router.get('/delete', function (req,res,next) {
    var id=req.query.id;
    custmerQueryModel.findById(id,function(err,doc){
        if(doc)
        {
            doc.remove(function(err){
                res.redirect("/custmer/list/?p=1");
            });
        }
    });
});

module.exports = router;