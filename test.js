/**
 * Created by liupan on 2017/6/20.
 */


//轮播
var app = new mbSlider({
    container: '.mb-container',
    wrapper: '.mb-wrapper',
    itmes: '.mb-slide',
    autoplay: 8000,
    isPages: false
});

//
String.prototype.temp = function(obj) {
    return this.replace(/\$\w+\$/gi, function(matchs) {
        var returns = obj[matchs.replace(/\$/g, "")];
        return (returns + "") == "undefined"? "": returns;
    });
};



$.get("http://api.chibaole.cc/share/restaurant/6417766",function(res){
    console.log(JSON.parse(res));
    var res_data = JSON.parse(res);
    var data = res_data.data;
    $('.res_name')[0].innerText = data.name;//餐厅名
    $('.small_cate')[0].innerText = data.small_cate;//菜系
    $('.renjun')[0].innerText = data.avg_price;//人均 并没有找到对应的字段 取了一个🌟的值
    $('.work_time')[0].innerText = data.work_time;//营业时间
    $('.like_num')[0].innerText = data.like_num;//点赞的数字
    $('.top_list_num')[0].innerText = data.comment_num;//金牌饭搭子点评数

    if(data.address === undefined){
        $('.res_info li')[0].css('display','none');
    }else {
        $('.address')[0].innerText = data.address;
    }
    if(data.phone === undefined){
        $('.Tel').css('display','none');
    }else {
        $('#Tel')[0].innerText = data.phone;
    }
    var likers = data.likers;
    var li_img =  $('.li_img img');
    if(likers.length !== 0){
        for(var i = 0; i < likers.length; i++  ){
            $('.li_img img')[i].src = likers[i].avatar.small_url;

            if( $('.li_img img')[i] === ''){
                $('.li_img img')[i].css('display','none');
            }
        }
    }else{
        $('.li_img').css('display','none');
    }

//      ------  金牌饭搭子点评  数据渲染代码模版

    var kol_comment_user = data.kol_comments;//金牌饭搭子数组
    var kol_comment = [];//金牌用户信息数组
    var nomral_comments_user = data.nomral_comments;//普通用户数组
    var nomral_comment = [];//定义普通用户的点评内容数据数组；

    // 数据格式化
    function dataInit(user_type,comment) {
        console.log(user_type.length);

        for(var i = 0;i < user_type.length; i++){

            var comment_user = new Object();//处理每个点评用户点评数据 实例化为一个对象
            comment_user.nick_name = user_type[i].user.nickname;
            comment_user.small_url = user_type[i].user.avatar.small_url;
            comment_user.content = user_type[i].content;
            comment_user.like_num = user_type[i].like_num;
            var tags = user_type[i].tags;//点评的标签
            if(tags !== undefined){//有点评标签
                var arr=[];
                for(var i =0 ;i < tags.length; i ++ ){
                    if(tags[i].photo !==undefined && ){//点评有图的
                        var tags_imgs = tags[i].photo.small_url;//点评的图片
                        comment_user.tags_img1 =tags[i].photo.small_url;//默认展示出前三张图
                        // comment_user.tags_img2 =tags[i+1].photo.small_url;
                        // comment_user.tags_img3 =tags[i+2].photo.small_url
                    }else{//无点评标签
                        //done 有标签但没有图片的逻辑----
                    }
                    if(parseInt(tags[i].tag_type) === 1){
                        //整体标签逻辑


                        // var arr_index = i;//


                        var tags_type_name_str = '#' + tags[i].name;

                        var tags_type_name  = tags_type_name_str.split(',');//标签数组

                    }
                    comment_user.tags_name ='#' + tags[i].name;//取出点评的标签名

                }
            }else{
                $('.img_box_message').css('display','none')
                //done 没有标签的逻辑---
            }

            console.log(comment_user);
            comment.push(comment_user);
            // console.log(comment);
        }
        return comment;

    }
    dataInit(kol_comment_user,kol_comment);//取出金牌的评论信息
    dataInit(nomral_comments_user,nomral_comment);//取出普通用户的评论信息

    var kol_json_data =  kol_comment;//金牌de是个数组 每个元素都是对象

    var normal_json_data = nomral_comment;//普通用户的

    var  kol_htmlList = '', nor_htmlList = '', htmlTemp = $("textarea")[0].value;

    kol_json_data.forEach(function(object) {

       kol_htmlList += htmlTemp.temp(object);

    });
    //分别替换数据模版
    normal_json_data.forEach(function(object) {

        nor_htmlList += htmlTemp.temp(object);

    });


    $('.vip_user_container')[0].innerHTML = kol_htmlList;//生成的模版插入指定的位置
    $('.normal_user-container')[0].innerHTML = nor_htmlList;//

});










