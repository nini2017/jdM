window.onload = function () {
    search();
    banner();
    downtime();
}
// 搜索框
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    searchBox.style.background = 'rgba(201, 21, 35,0)';
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var scrollTop = window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop < height) {
            opacity = scrollTop / height * 0.85;          
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35,'+opacity+')';
    }
}
// 轮播图
var banner = function () {
    var banner = document.querySelector('.jd_banner');
    // 轮播容器
    var imageBox = document.querySelector('.jd_banner ul:first-child');
    // 点容器
    var point = document.querySelectorAll('.jd_banner ul:last-child li')
    var width = banner.offsetWidth;
    // 加过渡
    var addTransition = function () {
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransiton = "all 0.3s";
    }
    // 去过渡
    var removeTransition = function () {
        imageBox.style.transition = "none";
        imageBox.style.webkitTransiton = "none";
    }
    // 加位移
    var setTranslateX = function (translateX) {
        imageBox.style.transform = "translateX("+translateX+"px)";
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";

    }

    // 自动轮播
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index*width);     
    },2000);
    imageBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        var liNow = document.querySelector('.jd_banner ul:last-child li.now').classList.remove('now');
        point[index - 1].classList.add('now');
    });
    // 滑动效果
    var startX = 0;
    var distanceX = 0;
    var startTime = 0;
    imageBox.addEventListener('touchstart',function (e){
        // console.log(e);
        // 清除定时器
        clearInterval(timer);
        startTime = Date.now();
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index*width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        // console.log('move');
     });
    imageBox.addEventListener('touchend', function (e) { 
        console.log(e);
        if(Math.abs(distanceX < width /3)) {
            var endTime = Date.now();
            var time = endTime - startTime;
            var v = Math.abs(distanceX) / time;
            if(v >= 0.2) {
                if(distanceX>0){
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTranslateX(-index*width);               
            } else {
                addTransition();
                setTranslateX(-index*width);
            }
        } else {
            if(distanceX>0) {
                index--;
            } else {
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 2000); 
    });

}
// 倒计时
var downtime = function () {
    var spans = document.querySelectorAll('.sk_time span');
    var time = 6 *3600;
    var flag = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
    },1000);
}