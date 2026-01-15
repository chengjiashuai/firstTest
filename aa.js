function renderStep() {

  var step_cur = getParamValue("step_cur")
  var dom = $('#cmp9ccf55')
  var stepList = [{
    label: '采购方式确定',
    value: '1'
  },
    {
      label: '采购文件确定',
      value: '2'
    },
    {
      label: '供应商报名',
      value: '3'
    },
    {
      label: '参评文件提交',
      value: '4'
    },
    {
      label: '评审确定',
      value: '5'
    },
    {
      label: '合同签订',
      value: '6'
    },
  ]
  dom.html('')
  dom.addClass('step-container')

  // 已完成步骤
  // var finishList = ['1', '2']
  var str = getParamValue("confirm_node");
  var arr = str.split(","); // 输出["a", "b", "c"]
  var finishList = arr;
  stepList.forEach(item => {
    dom.append(`<div class="step ${step_cur == item.value ? 'current' : ''} ${finishList.includes(item.value) ? 'finish' : ''}" data-value="${item.value}">${item.label}</div>`)
  })

  $('.step-container .step').off('click').on('click', function() {
    var value = $(this).attr('data-value');
    setParamValue("step_cur", value)
    $(this).addClass('current').siblings().removeClass('current');
    console.log('value:', value)
    DomByMarking('step_change').click();
  })


}
renderStep()


$('#cmpa622ca-body, #cmpfff099-body').off('click').on('click', function() {
  $('#cmpa622ca-body, #cmpfff099-body').removeClass('select-box')
  $(this).addClass('select-box')
})

setTimeout(function() {
  // 默认选中
  DomByMarking('step_change').click();
}, 10);

function change() {
  if (getParamValue("step_cur") == '1') {
    DomByMarking('确认按钮').linkbutton('setValue', "采购方式确定，开始下一步")
  } else if (getParamValue("step_cur") == '2') {
    DomByMarking('确认按钮').linkbutton('setValue', "此步完成，开始下一步")
  } else if (getParamValue("step_cur") == '3') {
    DomByMarking('确认按钮').linkbutton('setValue', "报名截止，开始下一步")
  } else if (getParamValue("step_cur") == '4') {
    DomByMarking('确认按钮').linkbutton('setValue', "文件提交截止，开始下一步")
  } else if (getParamValue("step_cur") == '5') {
    DomByMarking('确认按钮').linkbutton('setValue', "定标，开始下一步")
  } else if (getParamValue("step_cur") == '6') {
    DomByMarking('确认按钮').linkbutton('setValue', "招标/询价终止，重新采购")
  }
}


function load(thisRow, event) { //采购文件上传
  var index = $(thisRow).parents('tr').index()
  console.log(index)
  setParamValue("storage_type", "采购文件")
  DomByMarking('表格当前行index').textbox('setValue', index)
  $('#cmpd78273table').datagrid('endEdit', index)
  var data = $('#cmpd78273table').datagrid('getRows')
  var thisRowData = data[index]
  if (thisRowData.文件类型 != undefined && thisRowData.文件类型 != '') {
    setParamValue("file_type", thisRowData.文件类型)
    $('#cmpcfff18 .textbox-value').click()
  } else {
    // $('#cmp11195abutton').click() //阻止上传弹窗
    var tips = '请先填写文件类型！';
    window.brower.econfirm('', tips, function(r) {
      if (!r) return;

    });

  }

}

function reLoad(thisRow, event) { //重新上传
  //调用删除文件事件，现在还不好用？
  var index = $(event.target).parents('tr').index()
  console.log(index)
  // DomByMarking('表格当前行index').textbox('setValue', index)
  var data = $('#cmpd78273table').datagrid('getRows')
  var thisRowData = data[index]
  if (thisRowData.文件类型 != undefined && thisRowData.文件类型 != '') {
    // setParamValue("invoice_no", thisRowData.发票号)
    $('#cmpcfff18 .textbox-value').click()
  } else {
    $('#cmp11195abutton').click() //阻止上传弹窗
  }

}
// 删除采购文件
function del_purfile(file_id) {
  setParamValue("file_id", file_id)
  $('#cmpe073b0button').click()
}

function supplier_do(ids, is_do) {
  if (ids == undefined || ids == '') {
    var tips = '无法获取选中的数据，请确认已保存数据！';
    window.brower.econfirm('', tips, function(r) {
      if (!r) return;

    });
  } else {
    DomByMarking('ids').label('setText', ids)
    DomByMarking('is_do').label('setText', is_do)
    DomByMarking('终止、重启、删除').click()
  }

}
