// 展示卡片数据
function initCardData( id, Callback=()=>{} )
{
    try
    {
        if ( isNaN( id ) )
        {
            throw "捕捉到一个错误，id非数字";
        }
        if ( id == "" )
        {
            throw "捕捉到一个错误，id未填入";
        }


        // 需要展示数据的元素资源
        var sponsor_u = document.getElementById( "sponsor" );
        var lover_u = document.getElementById( "lover" );
        var tosay_u = document.getElementById( "tosay" );
        var name_u = document.getElementById( "name" );
        var cardtip_u = document.getElementById( "cardtip" );
        var time_u = document.getElementById( "time" );

        // 配对数据的id，获取数据
        $.ajax(
        {
            url: api_url + "/api/getcard/" + id,
            type: "GET",
            success: function ( data, r )
            {
                if ( JSON.stringify( data ) == '[]' )
                {
                    // 没有数据
                    
                    // 这里投异常不会被处理
                    // throw "我们找不到这张卡片，请退回主页刷新重试";
                    maketip( 2, "我们找不到这张卡片，请退回主页刷新重试" );
                    setTimeout( function ()
                    {
                        window.location = "index.html";
                    }, 5 * 1000 );
                    Callback();
                    return false;
                }

                // 需要展示的数据
                var sponsor = unescape( data[ 0 ].sponsor );
                var lover = unescape( data[ 0 ].lover );
                var tosay = unescape( data[ 0 ].tosay );
                var type = unescape( data[ 0 ].type );
                var reg_date = unescape( data[ 0 ].reg_date );

                // 卡片名称
                name_u.innerHTML = ( ( sponsor !== null && sponsor !== "" ) ? ( htmlEscape( sponsor ) + "的" ) : "匿名的" ) +
                    ( ( type == 520 ) ? "表白卡" :
                        ( type == 510 ) ? "语录" :
                        ( type == 500 ) ? "吐槽" : "" );

                // 发起人
                sponsor_u.innerHTML = ( ( sponsor !== null && sponsor !== "" ) ? htmlEscape( sponsor ) : "匿名" );

                // 对象
                lover_u.innerHTML = ( ( lover !== null && lover !== "" ) ? htmlEscape( lover ) : "" );

                // 说
                tosay_u.innerHTML = htmlEscape( tosay );

                // 提示内容
                cardtip_u.innerHTML = ( ( type == 520 ) ? "表白内容" :
                    ( type == 510 ) ? "说了什么呢" :
                    ( type == 500 ) ? "吐槽内容" : "" );

                time_u.innerHTML = htmlEscape( reg_date );
                Callback();
                return true;
            },
            error: function ( err )
            {
                window.location = "error/500_Internal_server_error.html?from=" + encodeURIComponent( window.location.href ) + "&err=" + encodeURIComponent( JSON.stringify( err ) );
            },
            dataType: "json"
        } );
    }
    catch ( err )
    {
        maketip( 2, err );
        setTimeout( function ()
        {
            window.location = "index.html";
        }, 5 * 1000 );
        Callback();
        return false;
    }
}

// 向界面添加评论
function showComment(name, content, time)
{
    var comment_body = document.getElementById( "comment_body" );
    
    var body = document.createElement( "div" );
    body.className = "inbox-item";
    
    var comment_name = document.createElement( "p" );
    comment_name.className = "inbox-item-author";
    comment_name.innerHTML = name;
    
    var comment_content = document.createElement( "p" );
    comment_content.className = "inbox-item-text";
    comment_content.innerHTML = content;
    
    var comment_time = document.createElement( "small" );
    comment_time.className = "text-muted";
    comment_time.innerHTML = time;
    
    body.appendChild(comment_name);
    body.appendChild(comment_content);
    body.appendChild(comment_time);
    
    comment_body.appendChild(body);
}

// 提交用户评论
function addComment(Callback=()=>{})
{
    var name = document.getElementById( "Myname" ).value;
    var content = document.getElementById( "content" ).value;

try
{
    if(name.length < 2)
    {
        throw "\"评论人\"不可小于2个字符";
    }
    if(content.length < 2)
    {
        throw "\"评论内容\"不可小于2个字符";
    }
    let sp1 = 0;
    for(let i = 0; i < name.length; ++i) if(name[i] == ' ') ++sp1;
    if(sp1 === name.length)
    {
        throw "\"评论人\"不可全是空格";
    }
    let sp2 = 0;
    for(let i = 0; i < content.length; ++i) if(content[i] == ' ') ++sp2;
    if(sp2 === content.length)
    {
        throw "\"评论内容\"不可全是空格";
    }
}
catch(err_msg)
{
    maketip( 2, err_msg );
    scrollMove();
    Callback();
    return false;
} 
    
    $.ajax(
    {
        url: api_url + "/api/addComment",
        data:
        {
            'cardid': getQueryVariable('id'),
            'name': name,
            'content': content
        },
        type: "POST",
        success: function ( data, r )
        {
            if ( data.code == 200 )
            {
                Callback();
                window.location=window.location.href.split('?')[0]+"?id="+getQueryVariable('id')+"&notifications=1&notifications_content=提交成功";
                // showComment(name, content, "");
            }
            else
            {
                Callback();
                window.location=window.location.href.split('?')[0]+"?id="+getQueryVariable('id')+"&notifications=2&notifications_content=提交失败";
            }
        },
        error: function ( err )
        {
            window.location = "error/500_Internal_server_error.html?from=" + encodeURIComponent( window.location.href ) + "&err=" + encodeURIComponent( JSON.stringify( err ) );
        },
        dataType: "json"
    } );
    
    return true;
}

function initComment(Callback=()=>{})
{
        if ( isNaN( getQueryVariable('id') ) )
        {
            return;
        }
        if ( getQueryVariable('id') == "" )
        {
            return;
        }


     $.ajax(
    {
        url: api_url + "/api/getComment/"+getQueryVariable('id'),
        type: "GET",
        success: function ( data, r )
        {
            document.getElementById("commentsum").innerHTML = data.length+"条"; 
            for(let i = 0; i < data.length; ++i)
            {
                showComment(data[i]['name'], data[i]['content'], data[i]['date']);
            }
            Callback();
        },
        error: function ( err )
        {
            Callback();
            window.location = "error/500_Internal_server_error.html?from=" + encodeURIComponent( window.location.href ) + "&err=" + encodeURIComponent( JSON.stringify( err ) );
        },
        dataType: "json"
    } );
}
