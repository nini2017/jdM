window.onload = function () {
    /*左侧滑动*/
    new IScroll('.left');
    /*右侧滑动*/
    new IScroll('.right', {
        /*click 不能触发  可以使用tap */
        click: true
    });
    /*1. 需要做滑动效果  如果是纵向滑动  子容器的高度大于父容器的高度 */
    /*2. 需要做滑动效果  如果是横向向滑动  子容器的宽度大于父容器的宽度 */
}