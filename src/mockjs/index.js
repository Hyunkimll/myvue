import Mock from "mockjs";
const Random = Mock.Random;
//请求列表
Mock.mock('/data/list','get',(req)=>{
//输出请求参数
console.log(req);
return Mock.mock({
        "list|10-20":[{
            "ctitle": Random.ctitle(2, 5),
            "cparagraph": Random.cparagraph(),
            "img": Random.image('200x100', '#16d46b', '#fff', 'png', 'Hello'),
            "date": '@datetime',
            'lng|99-112.6':102.620655,
            'lat|26-33.6':30.920677
        }
        ],
        pageno:1,
        pagenum:10,
        total:20,
        code:200,
        message:'ok'
    })
})

//请求列表
Mock.mock('/data/details','get',(req)=>{
    //输出请求参数
    console.log(req);
    return Mock.mock({
            "basic":{
                "username":Random.first(),
                "ctitle":Random.ctitle(2, 5),
                "cparagraph":Random.cparagraph(),
                "adress":'未知',
                "data":'@datetime'
            },
            "diary|10-20":[{
                "data":'@datetime',
                "cparagraph":Random.cparagraph()
            }],
            "photograph|2-3":[{
                "ctitle":Random.ctitle(2, 5),
                "cparagraph":Random.cparagraph()
            }],
            "photoalbum|10-20":[{
                "img":Random.image('200x100', '#16d46b', '#fff', 'png', 'Hello')
            }],
            code:200,
            message:'ok'
        })
})

//评论
Mock.mock('/data/comment','get',(req)=>{
    //输出请求参数
    console.log(req);
    return Mock.mock({
            "list|10-20":[{
                id: Random.string(5), //主键id
                date: "@datetime()",  //评论时间
                ownerId: Random.string(5), //文章的id
                fromId: Random.string(5),  //评论者id
                fromName: Random.word(2, 5),   //评论者昵称
                fromAvatar: Random.image('200x100', '#16d46b', '#fff', 'png', 'Hello'), //评论者头像
                likeNum: Random.integer(0, 100), //点赞人数
                content: Random.cparagraph(),  //评论内容
                "reply|0-2": [  //回复，或子评论
                {
                   id: Random.string(5),  //主键id
                   commentId: Random.string(5),  //父评论id，即父亲的id
                   fromId: Random.string(5),  //评论者id
                   fromName: Random.word(2, 5),  //评论者昵称
                   fromAvatar: Random.image('200x100', '#16d46b', '#fff', 'png', 'Hello'), //评论者头像
                   toId: Random.string(5),  //被评论者id
                   toName: Random.word(2, 5),  //被评论者昵称
                   toAvatar: Random.image('200x100', '#16d46b', '#fff', 'png', 'Hello1'),  //被评论者头像
                   content: Random.cparagraph(),  //评论内容
                   date: "@datetime()"   //评论时间
                }]
            }
            ],
            total:20,
            code:200,
            message:'ok'
        })
    })