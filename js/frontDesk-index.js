/*
        函数名：AddLoveLetter
        作用：添加一封表白信
        参数 1（必填）：sponsor，表白人的名字，若是匿名传false
        参数 2（必填）：对谁说
        参数 3（必填）：传520：表白；传510：对某人说；传500：吐槽
        参数 4（选填）：想说的话
*/
function AddLoveLetter( id, sponsor, lover, type, tosay )
{
    var cards = document.getElementById( "cards" );

    var index_1 = document.createElement( "div" );
    index_1.className = "col-md-6 col-lg-3";

    var index_2 = document.createElement( "div" );
    index_2.className = "card d-block";

    var card = document.createElement( "div" );
    card.className = "card d-block";

    var card_body = document.createElement( "div" );
    card_body.className = "card-body";

    var card_title = document.createElement( "h5" );
    card_title.innerHTML = ( ( sponsor !== false && sponsor !== "" ) ? ( htmlEscape( sponsor ) + "的" ) : "匿名的" ) +
        ( ( type == 520 ) ? "表白卡" :
            ( type == 510 ) ? "语录" :
            ( type == 500 ) ? "吐槽" : "" );
    card_title.className = "card-title";
    var foot_right = document.createElement( "span" );
    foot_right.className = "foot-right";
    var badge = document.createElement( "span" );
    badge.className = ( sponsor !== false && sponsor !== "" ) ? "badge badge-danger" : "badge badge-light";
    badge.innerHTML = ( ( sponsor !== false && sponsor !== "" ) ? htmlEscape( sponsor ) : "匿名" );
    foot_right.appendChild( badge );
    card_title.appendChild( foot_right );

    var card_subtitle = document.createElement( "h6" );
    card_subtitle.className = "card-subtitle text-muted";
    if ( type == 520 )
    {
        card_subtitle.innerHTML = ( ( sponsor !== false && sponsor !== "" ) ?
            htmlEscape( sponsor ) : "匿名" ) + " 表白 " + htmlEscape( lover );
    }
    else if ( type == 510 )
    {
        card_subtitle.innerHTML = ( ( sponsor !== false && sponsor !== "" ) ?
                htmlEscape( sponsor ) : "匿名" ) +

            ( ( lover !== false && lover !== "" ) ?
                " 对 " + htmlEscape( lover ) : "" ) + " 说";
    }
    else if ( type == 500 )
    {
        card_subtitle.innerHTML = ( ( sponsor !== false && sponsor !== "" ) ? htmlEscape( sponsor ) : "匿名" ) + " 吐槽" +
            ( ( lover !== false && lover !== "" ) ?
                ( " " + htmlEscape( lover ) ) : "" );
    }

    var go = document.createElement( "a" );
    go.href = "card.html?id=" + id;
    var card_text = document.createElement( "p" );
    card_text.className = "card-text";
    card_text.innerHTML = htmlEscape( tosay ) + "...点击查看详情";
    go.appendChild( card_text );

    card_body.appendChild( card_title );
    card_body.appendChild( card_subtitle );
    card_body.appendChild( document.createElement( "br" ) );
    card_body.appendChild( go );
    card_body.appendChild( document.createElement( "br" ) );
    index_2.appendChild( card_body );
    index_1.appendChild( index_2 );
    cards.appendChild( index_1 );
}

/* 生成默认愿望 */
function init( callback )
{
    console.log( "初始化函数执行" ); // !~log

    // 获取卡片
    $.ajax(
    {
        url: api_url + "/api/getcards",
        type: "GET",
        success: function ( data, r )
        {
            for ( let i = data.length-1; i >= 0; --i )
            {
                var wish = data[ i ];
                AddLoveLetter( unescape( wish[ 'id' ] ), unescape( wish[ 'sponsor' ] ), unescape( wish[ 'lover' ] ), unescape( wish[ 'type' ] ), wish[ 'tosay' ] === null ? "啥也没说" : unescape( wish[ 'tosay' ] ) );
            }
            callback();
        },
        error: function ( err )
        {
            window.location = "error/500_Internal_server_error.html?from=" + encodeURIComponent( window.location.href ) + "&err=" + encodeURIComponent( JSON.stringify( err ) );
        },
        dataType: "json"
    } );

}