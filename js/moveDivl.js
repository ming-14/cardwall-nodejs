/*
    Copyright © 李牧敲代码
    https://juejin.cn/post/6844904150979837960
**/

function scrollMove()
{ // 平滑移动时间版
    let top;
    let speed;
    let startTime = Date.now();
    top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

    function move( distance = 10, time = 1000 )
    {
        speed = ( top / time );
        distance = speed * ( Date.now() - startTime );
        top = top - distance;
        document.documentElement.scrollTop = top;
        if ( top <= 0 )
        {
            throw "";
        }
    }

    function stMove()
    {
        try
        {
            move();
            setTimeout( stMove, 16.6 );
        }
        catch ( e )
        {
            return;
        }
    }

    function raf()
    {
        try
        {
            move();
            requestAnimationFrame( raf );
        }
        catch ( e )
        {
            return;
        }
    }
    
    raf();
}
