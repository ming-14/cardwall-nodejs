"use strict";

function loadjs( path, CallBack = () => {} )
{
    var sc = document.createElement( "script" );
    sc.setAttribute( "type", "text/javascript" );
    sc.src = path;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( sc );

    if ( window.ActiveXObject || "ActiveXObject" in window )
    { //判断是否是ie
        if ( sc.readyState )
        { //判断是否支持readyState
            sc.onreadystatechange = function ()
            {
                if ( this.readyState == "loaded" || this.readyState == "complete" )
                {
                    CallBack(); // IE10
                }
            }
        }
        else
        {
            sc.onload = function ()
            {
                CallBack(); // IE11
            }
        }
    }
    else
    { //不是ie
        sc.onload = function ()
        {
            CallBack(); // NO IE
        }
    }
}

// 获取url参数
function getQueryVariable( variable )
{
    var query = window.location.search.substring( 1 );
    var vars = query.split( "&" );
    for ( var i = 0; i < vars.length; i++ )
    {
        var pair = vars[ i ].split( "=" );
        if ( pair[ 0 ] == variable )
        {
            return pair[ 1 ];
        }
    }
    return ( false );
}

/* 传入html字符串源码，进行转码 */
function htmlEscape( text )
{
    return text.replace( /[<>"&'/]/g, function ( match, pos, originalText )
    {
        switch ( match )
        {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&#x27;";
            case "/":
                return "&#x2F;";
        }
    } );
}

let tipType = getQueryVariable("notifications");
let tipText = decodeURIComponent(getQueryVariable("notifications_content"));
if(getQueryVariable("notifications") && getQueryVariable("notifications_content"))
{ maketip(tipType, tipText); }

$.ajax(
    {
        url: statistics_url,
        type: "GET",
    } );