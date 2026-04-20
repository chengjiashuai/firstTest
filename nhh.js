// 发送消息
sendMessage:function (sendData,text) {
  // var publicKey = '042bbcab1deb97d4f98c8926d5d7358bb4b8f127978f13bab159880f8daaffb68abb32c5c9b106b621e3ef47174953295a12602bf1b1d3b03cae8f1713fd53a84f';
  var params =JSON.stringify({
    id:parameter.id,
    name:parameter.name,
    members: text=='资料已补正'?membersId:[parameter.processStarter],//可为空
    message: sendData,
  })
  // var sm2params = sm2.doEncrypt(JSON.stringify(params), publicKey, 1);
  $.ajax({
    url: origin + `/cosmo-qnm/v1/comments/send`,
    type: 'POST',
    data: params,
    async: false,
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      'Authorization': 'bearer ' +  localStorage.getItem('access_token')
    },
    success: function(res) {

      document.getElementById("textContent").innerHTML = "";
      if (res.code == '00000') {
        var privateKey = '5b59e8864a09f533ceab2a9a187033df48fbdd15871fe7c7766a64c05a0ecfd0';
        var doDecrypt = sm2.doDecrypt(res.data, privateKey, 1);
        data = JSON.parse(doDecrypt);
        console.log('后端返回的',data);
        listData.unshift(data)
        publicMethod.renderHtml()
      }
    }
  })
},
//发送状态
sendBpm:function (sendData,text) {
  //"1":"审核中" "4": "资料待补充"
  var params ={
    procInstId:parameter.id,
    state: text=='资料已补正'?1:4
  }
  // var sm2params = sm2.doEncrypt(JSON.stringify(params), publicKey, 1);
  $.ajax({
    url: origin + `/cosmo-bpm/api/v1/updateByProcessStateToBeAdded`,
    type: 'POST',
    data: params,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'bearer ' +  localStorage.getItem('access_token')
    },
    success: function(res) {
      document.getElementById("textContent").innerHTML = "";
      if (res.code == '00000') {
        var privateKey = '5b59e8864a09f533ceab2a9a187033df48fbdd15871fe7c7766a64c05a0ecfd0';
        var doDecrypt = sm2.doDecrypt(res.data, privateKey, 1);
        data = JSON.parse(doDecrypt);
        console.log('后端返回的',data);
        listData.unshift(data)
        publicMethod.renderHtml()
      }
    }
  })
},

/**
 * 通知办理人
 * @param {*} text  补充办件资料||资料已补正
 */
sendNotice:function (text) {
  $.ajax({
    url: origin + `/cosmo-qnm/v1/comments/${parameter.id}/status`,
    type: 'post',
    data: {
      status:text=='资料已补正'?0:1
    },
    headers: {
      'Authorization': 'bearer ' +  localStorage.getItem('access_token')
    },
    success: function(res) {
      if (res.code == '00000') {
        console.log("状态标记成功")
        if(text=='资料已补正'){
          // 申请人 隐藏 资料已补正
          $('.info-corrected').hide()
        }
      }
    }
  })
