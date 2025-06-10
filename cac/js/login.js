/** 点击登录的事件 */
function signIn(){
    if(!document.getElementById("userName").value){
        $("#spanCode").text("账户不能为空");
        return ;
    }else if(!document.getElementById("p_w").value){
        $("#spanCode").text("密码不能为空");
        return ;
    }else if(isValidateCodeEnable && !document.getElementById("verify").value){
        $("#spanCode").text("验证码不能为空");
        return ;
    } else {
        localStorage.removeItem('cosmoItem');
        var base = new Base64();
        // var exp = new Date();
        // exp.setTime(exp.getTime() + 60000);
        var item=$('#userName').val() + "&pw="+  $('#p_w').val();
        localStorage.setItem("items",base.encode(base.encode(item)));

        var publichex = '042bbcab1deb97d4f98c8926d5d7358bb4b8f127978f13bab159880f8daaffb68abb32c5c9b106b621e3ef47174953295a12602bf1b1d3b03cae8f1713fd53a84f';
        // var pwd = sm2Encrypt('cosmo_AD123!@#$%^&*()',publichex,0);
        // console.log(pwd)
        if (isValidateCodeEnable) {
            document.getElementById("p_w").value = sm2Encrypt($('#p_w').val() + "_" + $('#verify').val(),publichex,0);
        } else {
            var p_ran = null;
            $.ajax({
                async:false,
                url:"oauth/random?num="+Math.random(),
                type:"post",
                dataType:"text",
                success: function(result){
                    p_ran = result;
                },
                error: function () {
                    $("#spanCode").text("登录失败，请重新尝试！");
                    return ;
                }
            });
            document.getElementById("p_w").value = sm2Encrypt($('#p_w').val() + "_" + p_ran,publichex,0);
        }
        localStorage.setItem("userName",document.getElementById("userName").value);
        $("#loginForm").submit();
    }
}
/** 浏览器兼容*/
$(document).ready(function(){
    document.getElementById("companyTop").innerHTML = navSetting.companyTop;
    document.getElementById("companyBot").innerHTML = navSetting.companyBot;
    document.getElementsByTagName('title')[0].innerText = navSetting.title;
    var errormsg = getQueryString("errormsg");
    var base = new Base64();
    if(localStorage.getItem("items")){
        var item=base.decode(base.decode(localStorage.getItem("items")));
        var name = item.split("&pw=")[0];
        var pw = item.split("&pw=")[1];
    }

    if (errormsg) {
        $("#spanCode").text(errormsg);
        if(name){
            document.getElementById("userName").value = name;
        }
        if(pw){
            document.getElementById("p_w").value = pw;
        }
    };

    /*地址栏参数*/
    // 租户过期提示语
    var alertContent = getQueryString("alertContent");
    // 今日不再提示
    var isCheckBox = getQueryString("isCheckBox");
    //是否修改密码
    var isChangePwd = getQueryString("isChangePwd")
    // 修改密码周期
    var pwdChangeInterval = getQueryString("pwdChangeInterval")
    // 强密码开关
    var pwdRuleStrengthenEnabled = getQueryString("pwdRuleStrengthenEnabled")

    // 用户已过期或将要过期 且不需要修改密码 保持原来逻辑弹窗
    if(alertContent && isChangePwd != 'true'){
        $("#errorTip").text(alertContent);
        $(".errorTip-dialog").show();
        if(isCheckBox == 1){
            $(".selCheck").show();
        } else if(isCheckBox == 0){
            $(".selCheck").hide();
        }
        if(name){
            document.getElementById("userName").value = name;
        }
        if(pw){
            document.getElementById("p_w").value = pw;
        }
    }
    // 只要需要修改密码 就直接进入修改密码页面 无弹窗  在修改密码页面提醒
    if(isChangePwd == 'true'){
        if(name){
            document.getElementById("userName").value = name;
        }
        if(pw){
            document.getElementById("p_w").value = pw;
        }
        // 显示修改密码页面
        $('#wrap').hide()
        $('#myiframe').attr('src','/common_setting_comsvr/change/userInfo.html')
    }
})