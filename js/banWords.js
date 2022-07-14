// 仅在前端做验证，要绕过不难
// 违禁词绝对拦不完，表白墙必须有人管理

var banData = null;
$.get("data/banWords/banlist", function(data, status)
{
    if (status === "success")
    {
        banData = data;
    }
});

function isban (str, callback)
{
    if (banData === null)
    {
        return 501;
    }

    var banWords = banData.split("\n");
    var isban = false;
    for (var i = 0; i < banWords.length; ++i)
    {
        var temp = Base64.decode(banWords[i]);
        // 词库每个词后面有个回车，这里删掉
        var banStatus = str.indexOf(temp.slice(0, temp.length - 1));
        if (banStatus >= 0)
        {
            isban = true;
            callback(banStatus);
        }
    }

    return isban ? 403 : 200;
}
