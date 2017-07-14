/**
 * Created by liupan on 2017/6/20.
 */


//轮播
var app = new mbSlider({
    container: '.mb-container',
    wrapper: '.mb-wrapper',
    itmes: '.mb-slide',
    autoplay: 4000,
    isPages: true
});
//根据点评的条数 控制点评内容样式 函数
function vip_average(m,n,p,q) {
    for (var i = 0; i < n;i ++ ) {
        m[i].onclick = function () {
            window.location.href = 'share.html';
        };

        if(i>=2){
            p[i].style.display ='none';
            // console.log('点评超过三条的只显示两条')
        }
    }
    if(n === 1 ){
        p.css('border-bottom','none');
        $(".bar").css('display','none');
        //只有一条点评的 不显示'更多'和底部border；
    }else if( n === 2){
        p.css('border-bottom','0.0266rem solid #b5b5b5');
        $(".bar").css('display','none');
        //只有两条的显示底部的border不显示'更多'
    } else if(n > 2){
        $(".bar").css('display','block');
        p.css('border-bottom','0.0266rem solid #b5b5b5');
    }
    q[0].innerText = n + '条';
}

//大V的点评列表
var a =$('.vip_message_list .detail_text');//点评的内容
var b = a.length;//点评的条数
var c  =  $('.vip_message_list');
var d =  $('.vip_list .top_list_num');
vip_average(a,b,c,d);
//普通用户点评
var e =  $('.average_message_list .detail_text');//普通点评的内容
var f = e.length;

var g = $('.average_message_list');
var h = $('.average_top_list .top_list_num');
vip_average(e,f,g,h);
//---------------

function hiboy() {
    //是否显示点赞的人的图片列表函数  如果点赞的人数为0不显示  否侧显示
    var zan_num = parseInt($('.zan span')[1].innerText);
    if(zan_num === 0  ) {
        $('.li_img').css('display', 'none');
    }else {
        $('.li_img').css('display', 'block');
    }
}
hiboy();










