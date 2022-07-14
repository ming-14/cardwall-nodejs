// 加载中...
function makeloading ()
{
    let floatLayer = document.createElement("div");
    floatLayer.className = "floatLayer";
    // z-index: 9990;
    floatLayer.id = "_floatLayer_id";

    let boxLoading = document.createElement("div");
    boxLoading.className = "boxLoading";
    boxLoading.style = "z-index: 9997;";
    boxLoading.id = "_boxLoading_id";

    document.getElementsByTagName('body')[0].appendChild(floatLayer);
    document.getElementsByTagName('body')[0].appendChild(boxLoading);
}

// 加载完成
function removeloading ()
{
    document.getElementsByTagName('body')[0].removeChild(document.getElementById("_floatLayer_id"));
    document.getElementsByTagName('body')[0].removeChild(document.getElementById("_boxLoading_id"));
}

function maketip(tipType, tipText)
{
    let _alert = document.createElement("div");
    _alert.className = tipType==1?"alert alert-success alert-dismissible bg-success text-white border-0 fade show"
                      :tipType==2?"alert alert-warning alert-dismissible bg-warning text-white border-0 fade show"
                      :"alert alert-danger alert-dismissible bg-danger text-white border-0 fade show";
    _alert.role = "alert";
    _alert.id="tip";
    _alert.innerHTML = tipText;
    let _button = document.createElement("button");
    _button.className = "close";
    _button.data_dismiss="alert";
    _button.aria_label="Close";
    let _close = document.createElement("span");
    _close.aria_hidden="true";
    _close.innerHTML = "×";
    _close.onclick = function()
    {
        document.getElementById("alert").removeChild(document.getElementById("tip"));
    }
    _button.appendChild(_close);
    _alert.appendChild(_button);
    document.getElementById("alert").appendChild(_alert);
}