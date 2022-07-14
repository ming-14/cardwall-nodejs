"use strict";

function getCookie (name)
{
    // 拆分 cookie 字符串
    var cookieArr = document.cookie.split(";");

    // 循环遍历数组元素
    for (var i = 0; i < cookieArr.length; i++)
    {
        var cookiePair = cookieArr[i].split("=");

        /* 删除 cookie 名称开头的空白并将其与给定字符串进行比较 */
        if (name == cookiePair[0].trim())
        {
            // 解码cookie值并返回
            return (cookiePair[1]);
        }
    }
    // 如果未找到，则返回null
    return null;
}

function getCookieLength ()
{
    if (document.cookie == "")
        return 0;

    // 拆分 cookie 字符串
    var cookieArr = document.cookie.split(";");
    return cookieArr.length;
}

//清除所有cookie函数
function clearAllCookie ()
{
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys)
    {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0)
            .toUTCString()
    }
}

//删除指定cookie的值
function removeCookie (cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    var cookieStr = "";
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0)
        {
            document.cookie = c + ';expires=' + new Date(0)
                .toUTCString()
        }
        else
        {
            cookieStr += c;
            cookieStr += ";";
        }
        document.cookie = cookieStr;
    }
}

//检测是否支持Cookie
function check ()
{
    document.cookie = "Cookie_test_rererererere=text";
    if (getCookie("Cookie_test_rererererere") != "text")
        return false;
    else
    {
        removeCookie("Cookie_test_rererererere");
        return true;
    }
}
