let currentTask = null;
let selectEndTime = null;
let layout = 'taskStatus'
// 我的任务数据切换
if(getParamValue("my_task") == 'true'){
  layout = 'myTask';
}
let apiMap = {
  'taskStatus': '读取数据',
  'taskType': '读取任务类型分组列表',
  'resource': '读取任务指派人分组列表',
  'myTask': '读取我的任务列表'
}

/**
 * 刷新视图数据（提供给父页面调用）
 */
// 刷新视图数据
function refreshViewData(params){
  console.log(params,'refreshViewData')
  if(params.view === 'table') return;
  layout = params.layout
  setParamValue("plan_start_time", params.startTime);
  setParamValue("plan_end_time", params.endTime);
  setParamValue('orderByField', params.sort);
  setParamValue('search_value', params.searchValue);
  render('#cmp21f46c')
}

/**
 * 更新数据
 */
function updateData(params){
  if(!currentTask) return;
  const newData = {
    ...currentTask,
    ...params
  }
  const data = {
    task_code: newData['任务编码'],
    assigner_usercode: newData['指派人编码'],
    assigner_username: newData['指派人姓名'],
    task_state: newData['任务状态'],
    task_priority: newData['任务优先级'],
    plan_end_time: newData['计划完成日期'],

  }
  for (let key in data) {
    DomByMarking(key).textbox('setValue', data[key])
  }
  // return;
  $('#cmp177770button').click();

  render('#cmp21f46c')
}

/**
 * 入口方法
 * @param {String} id 容器id
 */
function render(id){
  var data = cosmo.data({
    name: apiMap[layout]
  });
  console.log(data,'data');
  $(id).html(`<div id="boardView" class=""><div id="boardView-mask"></div></div>`);
  const root = $('#boardView');
  data.forEach(item => {
    const children = JSON.parse(item['任务列表'] || "[]");
    let panel = `<div class="boardView-item" data-status="${item['分组名称']}">
              <div class="boardView-item-label">
                <div class="boardView-item-label-left">${item['分组名称']}<span>${children.length > 0 ? `${children.length}` : ''}</span></div>
              </div>
              <div class="boardView-item-taskList">${taskList(children)}</div>
          `;

    if((item['分组名称'] == '未开始' && layout == 'taskStatus') || (layout != 'taskStatus' && layout != 'myTask')){
      panel += `<div class="addTask" data-action="add-task" style="${children.length > 0 ? '' : 'margin-top: 0' }">+</div>`;
    }

    panel += `</div>`;
    root.append(panel);
  });

  addNiceScroll($("#boardView"))
  // 事件绑定
  eventBind();
}

/**
 * 渲染任务卡片
 * @param data
 * @return {string}
 */
function taskList(data){
  let html = '';
  data.forEach((item, index) => {
    html += `<div class="task" data-id="${item['任务编码']}" data-info='${JSON.stringify(item)}' data-publish="${item['任务是否发布'] ? 1 : 0}">
    <div class="task-priority" data-priority="${item['任务优先级']}" data-tooltip="${item['任务优先级']}"></div>
    
    <div class="task-info">
        <div class="task-info-title" title="${item['任务名称']}">${item['任务名称']}</div>`

    if(item['指派人姓名']){
      html +=  `<div class="task-info-people" data-tooltip="${item['指派人姓名']}">${item['指派人姓名'] ? item['指派人姓名'].slice(0, 1) : ''}</div>`
    }

    html += `</div><div class="task-tips">`

    if(item['任务状态'] == '已终止' || (layout == 'myTask' && item['任务状态'] == '已完成')){

    }else{
      html += `<div class="task-operation" data-action="card-operation">···</div>`
    }


    html += `<div class="task-line1">`
    if(item['任务状态'] && layout != 'taskStatus'){
      html += `<div class="task-status" data-status="${item['任务状态']}">${item['任务状态']}</div>`
    }

    if(item['计划工时数']){
      let realWorkTime = item['实际工时数'] || 0
      html += `<div class="task-line1-time">工时情况：
            <span class="num">${realWorkTime}</span> / <span>${item['计划工时数']}</span><span class="unit"> 小时</span>
        </div>`
    }

    html += '</div>'

    html += `<div class="task-line2">`
    if(item['计划完成日期'] && item['计划完成日期'] != 'null'){
      let warnClass = ''
      const endTime = item['计划完成日期'].slice(5)

      let now = new Date();
      now.setHours(0, 0, 0, 0); // 设置当前时间为00:00:00
      let nowTime = now.getTime(); // 获取时间戳

      if(nowTime > new Date(item['计划完成日期'] + ' 00:00:00')){
        warnClass = 'overdue'
      }

      if(item['计划开始日期']){
        const startTime = item['计划开始日期'].slice(5)
        html += `<div class="task-time ${warnClass}">${startTime} - ${endTime}</div>`
      }else{
        html += `<div class="task-time ${warnClass}">${endTime}</div>`
      }
    }

    if(item['子任务数']){
      html += `<div class="task-children" data-tooltip="查看子任务" data-action="showChildren" data-index="${index}">
                    ${item['子任务数']> 0 ? `${item['已完成的子任务数']}/${item['子任务数']}` : ''}
               </div>`
    }

    html += `<div class="task-jd" data-jd="${item['任务进度']}" data-tooltip="已完成：${item['任务进度']}%"><span>${item['任务进度']}%</span></div>`

    html += '</div>'

    html +=  `</div></div>`;
  });
  return html
}

/**
 * 创建子任务弹窗
 * @param data
 */
function createChildrenModal(){
  DomByMarking('task_code').textbox('setValue', currentTask['任务编码'])
  var data = cosmo.data({
    name: '查询子任务数据源'
  })
  console.log(data,'查询子任务数据源');
  if(!data || data.length === 0) return ''
  let html = ` <div class="task-children-modal" id="taskChildrenModal">
      <div class="task-children-modal-header">
          子任务 <span>${currentTask['已完成的子任务数']} / ${currentTask['子任务数']}</span>
      </div>
      <div class="task-children-modal-list">
  `
  data.forEach(item => {
    html += `<div class="task-children-modal-list-item" data-taskCode="${item.task_code}">
            <div class="task-info-people">${item.assigner_username ? item.assigner_username.slice(0, 1) : ''}</div>
          
            <div class="task-children-modal-list-item-name">${item.task_name}</div>
            `
    if(item.plan_end_time){
      if(item.plan_start_time){
        html += `<div class="task-children-modal-list-item-time">${item.plan_start_time} - ${item.plan_end_time}</div>`
      }else{
        html += `<div class="task-children-modal-list-item-time">${item.plan_end_time}</div>`
      }
    }

    html += ` <div class="task-children-modal-list-item-state" data-state="${item.task_state}">${item.task_state}</div></div>`
  })

  html += `</div></div>`
  // 如果窗口已存在，则移除
  if($('#taskChildrenModal').length > 0){
    $('#taskChildrenModal').remove()
  }
  $('#boardView').append(html)

  $('.task-children-modal-list-item').off('click').on('click', function (){
    var taskCode = $(this).attr('data-taskCode')
    DomByMarking('task_code').textbox('setValue', taskCode)
    $('#cmp59d88ebutton').click();
  })
}

/**
 * 创建操作面板
 */
function createOperationPanel(){
  let html = `<div class="task-operation-panel" id="taskOperationPanel">`

  if(layout == 'myTask'){
    // 设置任务状态
    html += `<div class="task-operation-panel-item" data-action="setProgress">任务进度</div>`
  }

  if(currentTask['任务是否发布'] == 1 && currentTask['任务状态'] != '已终止'){
    // 设置任务状态
    html += `<div class="task-operation-panel-item" data-action="setStatus">设置任务状态</div>`
  }

  if(layout != 'myTask'){
    if(currentTask['任务是否发布'] != 1){
      html += `<div class="task-operation-panel-item" data-action="publish">发布任务</div>`
    }

    // 设置执行人
    html += `<div class="task-operation-panel-item" data-action="setExecutor">设置执行人</div>`

    // 设置截止时间
    html += `<div class="task-operation-panel-item" data-action="setDeadline">设置截止时间</div>`

    // 设置优先级
    html += `<div class="task-operation-panel-item" data-action="setPriority"">设置优先级</div>`

    if(currentTask['任务是否发布'] == 1 && currentTask['任务是否确认'] == 0){
      // 确认工时
      html += `<div class="task-operation-panel-item" data-action="confirm">确认工时</div>`
    }
  }


  html += `</div>`
  // 如果窗口已存在，则移除
  if($('#taskOperationPanel').length > 0){
    $('#taskOperationPanel').remove()
  }
  $('#boardView').append(html)

  bindOperationPanelEvent()
}

/**
 * 创建设置执行人面板
 */
function createSetExecutorPanel(me){
  var peopleList = cosmo.data({
    name: '查询项目成员列表'
  })
  let html = `<div class="setExecutorPanel subMenu" id="setExecutorPanel">`
  peopleList.forEach(item => {
    var className = ''
    if(item.e_username == currentTask['指派人姓名']){
      className = 'subMenu-item-active'
    }
    html += `<div class="setExecutorPanel-item ${className}" data-info='${JSON.stringify(item)}'><div class="task-info-people">${item.e_username ? item.e_username.slice(0, 1) : ''}</div>${item.e_username}</div>`
  })

  html += '</div>'
  // 如果窗口已存在，则移除
  if($('#setExecutorPanel').length > 0){
    $('#setExecutorPanel').remove()
  }
  $('#boardView').append(html)
  setModalPosition('#setExecutorPanel', me, 'right')

  $('.setExecutorPanel-item').off('click').on('click', function (){
    var info = $(this).attr('data-info');
    info = JSON.parse(info);
    updateData({
      '指派人编码': info['e_usercode'],
      '指派人姓名': info['e_username']
    })
  })
}

/**
 * 设置截止时间日历面板点击回调
 */
function handleSetDeadline(date){
  console.log(date);
  selectEndTime = date;
}

/**
 * 创建设置截止时间面板
 */
function createSetDeadlinePanel(me){
  let time = currentTask['计划完成日期'];
  let startTime = currentTask['计划开始日期'];
  let iframeUrl = 'http://erptest.cs.cosmosource.com:27778/fwp/brower.html?objpath=%2Fproject%2Ftenant%2FERP%2Fimsme%2Fprojectplan%2Fhomepage%2FboardViewSub%2Fcalendar.fwp'
  iframeUrl += '&ParamPair=current==' + time + '@@startTime==' + startTime
  let html = `<div class="setDeadlinePanel subMenu" id="setDeadlinePanel">
    <iframe id="calendar" src="${iframeUrl}"></iframe>
    <div class="setDeadlinePanel-bottom">
        <div data-action="setDeadlinePanelCancel">取消</div>
        <div data-action="setDeadlinePanelConfirm">确定</div>
    </div>
  </div>`

  // 如果窗口已存在，则移除
  if($('#setDeadlinePanel').length > 0){
    $('#setDeadlinePanel').remove()
  }
  $('#boardView').append(html)
  setModalPosition('#setDeadlinePanel', me, 'right');

  // 取消
  $('.setDeadlinePanel [data-action=setDeadlinePanelCancel]').off('click').on('click', function (){
    $('#setDeadlinePanel').hide();
  })

  // 确定
  $('#setDeadlinePanel [data-action=setDeadlinePanelConfirm]').off('click').on('click', function (){
    updateData({
      '计划完成日期': selectEndTime
    })
    $('#setDeadlinePanel').hide();
    $('.task-dialog').hide();
    $('#boardView-mask').hide();
  })

}

/**
 * 创建设置优先级面板
 */
function createSetPriorityPanel(me){
  let people = ['非常紧急', '紧急', '普通', '低']
  let html = `<div class="setPriorityPane subMenu" id="setPriorityPane">`
  people.forEach(item => {
    var className = ''
    if(item == currentTask['任务优先级']){
      className = 'subMenu-item-active'
    }
    html += `<div class="setPriorityPane-item ${className}" data-name="${item}">${item}</div>`
  })

  html += '</div>'
  // 如果窗口已存在，则移除
  if($('#setPriorityPane').length > 0){
    $('#setPriorityPane').remove()
  }
  $('#boardView').append(html)
  setModalPosition('#setPriorityPane', me, 'right')

  $('.setPriorityPane-item').off('click').on('click',function (){
    updateData({
      '任务优先级': $(this).text()
    })
  })
}

/**
 * 创建设置任务状态面板
 */
function createSetStatusPanel(me){
  let people = ['未开始', '进行中', '已完成']
  if(layout != 'myTask'){
    people = [...people,  '已暂停' , '已终止']
  }
  let html = `<div class="setStatusPane subMenu" id="setStatusPane">`
  people.forEach(item => {
    var className = ''
    if(item == currentTask['任务状态']){
      className = 'subMenu-item-active'
    }
    html += `<div class="setStatusPane-item ${className}" data-text="${item}">${item}</div>`
  })

  html += '</div>'
  // 如果窗口已存在，则移除
  if ($('#setStatusPane').length > 0) {
    $('#setStatusPane').remove()
  }
  $('#boardView').append(html)
  setModalPosition('#setStatusPane', me, 'right')
  $('.setStatusPane-item').off('click').on('click',function (){
    var status = $(this).text();
    if(status === '已完成'){
      // 更新任务进度为100%
      $('#cmp0e1608button').click();
    }
    updateData({
      '任务状态': $(this).text()
    })
  })
}

/**
 * 事件绑定
 */
function eventBind(){
  $('.boardView-item-taskList .task').off('click').on('click', function (){
    currentTask = JSON.parse($(this).attr('data-info'))
    DomByMarking('task_code').textbox('setValue', currentTask['任务编码'])
    if(currentTask['任务状态'] === '已终止' || layout == 'myTask'){
      $('#cmp5d17cebutton').click();
    }else{
      $('#cmp59d88ebutton').click();
    }
    console.log('点击卡片');
  })

  // 显示子任务看板
  $('[data-action=showChildren]').off('click').on('click', function (event){
    event.stopPropagation();
    currentTask = JSON.parse($(this).parents('.task').attr('data-info'))
    createChildrenModal()
    setModalPosition('#taskChildrenModal', this)
  })

  // 添加任务
  $('[data-action=add-task]').off('click').on('click', function (){
    $('#cmp0631f5button').click();
    console.log('添加任务');
  })

  // 点击卡片操作按钮
  $('[data-action=card-operation]').off('click').on('click', function (e){
    e.stopPropagation();
    currentTask = JSON.parse($(this).parents('.task').attr('data-info'))
    $(this).css('display', 'block');
    createOperationPanel();
    setModalPosition('#taskOperationPanel', this, 'right')
  })

  /**
   * 点击遮罩层，隐藏弹窗
   */
  $('#boardView-mask').on('click', function (e){
    $('.task-dialog').hide();
    $('[data-action=card-operation]').removeAttr('style');
    $('#boardView-mask').hide();
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
  })
}

/**
 * 设置二级菜单点击选中样式
 * @param me
 */
function handleSelectStyle(me){
  // 先隐藏之前的二级菜单
  $('.subMenu').hide();
  // 取消同级的选中样式
  $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
  // 添加选中样式
  $(me).addClass('task-operation-panel-item-active')
}

/**
 * 任务必填项校验
 */
function checkTask(){
  if(!currentTask['任务名称']){
    // 提示信息
    brower.eshow('未设置任务名称', null, 'error')
    return false
  }
  if(!currentTask['指派人姓名']){
    brower.eshow('未选择指派人', null, 'error')
    return false
  }

  if(!currentTask['计划开始日期']){
    brower.eshow('未选择计划开始日期', null, 'error')
    return false
  }
  if(!currentTask['计划完成日期']){
    brower.eshow('未选择计划完成日期', null, 'error')
    return false
  }
  return true
}

/**
 * 绑定操作面板事件
 */
function bindOperationPanelEvent(){
  // 我的任务-汇报进度
  $('.task-operation-panel-item[data-action=setProgress]').off('click').on('click', function (){
    handleSelectStyle(this);
    DomByMarking('assigner_usercode').textbox('setValue', currentTask['指派人编码'])
    setParamValue('task_name', currentTask['任务名称'])
    setParamValue('task_prograss', currentTask['任务进度'])
    DomByMarking('task_code').textbox('setValue', currentTask['任务编码'])
    $('#cmpe1ea41button').click();
    console.log('汇报进度')
  })

  // 发布任务
  $('.task-operation-panel-item[data-action=publish]').off('click').on('click', function (){
    handleSelectStyle(this);
    if(!checkTask()) return

    DomByMarking('task_code').textbox('setValue', currentTask['任务编码'])
    $('#cmp678966button').click()

    console.log('发布任务')
  })

  // 工时确认
  $('.task-operation-panel-item[data-action=confirm]').off('click').on('click', function (){
    handleSelectStyle(this);
    DomByMarking('task_code').textbox('setValue', currentTask['任务编码'])
    if(currentTask['任务状态']== '已完成'){
      // 确认工时
      $('#cmpb82397button').click();
    }
    // 设置工时确认状态
    $('#cmp3f7050button').click();
    console.log('确认工时')
  })

  $('.task-operation-panel-item[data-action=setExecutor]').off('click').on('click', function (){
    console.log('设置执行人')
    handleSelectStyle(this);
    createSetExecutorPanel(this)
  })

  $('.task-operation-panel-item[data-action=setDeadline]').off('click').on('click', function (){
    handleSelectStyle(this);
    createSetDeadlinePanel(this)
    console.log('设置截止时间')
  })

  $('.task-operation-panel-item[data-action=setPriority]').off('click').on('click', function (){
    handleSelectStyle(this);
    createSetPriorityPanel(this);
    console.log('设置优先级')
  })

  $('.task-operation-panel-item[data-action=setStatus]').off('click').on('click', function (){
    handleSelectStyle(this);
    createSetStatusPanel(this);
    console.log('设置任务状态')
  })
}

/**
 * 设置弹窗出现位置
 * @param modal 弹窗id
 * @param trigger 触发元素
 */
function setModalPosition(modal, trigger, position){
  const $modal = $(modal);
  const $trigger = $(trigger);
  const $boardView = $('#boardView');

  // 获取触发元素和容器的位置与尺寸
  const triggerRect = $trigger[0].getBoundingClientRect();
  const boardRect = $boardView[0].getBoundingClientRect();
  const modalHeight = $modal.outerHeight();
  const modalWidth = $modal.outerWidth();

  // 初步设置模态框相对容器的初始位置
  let modalTop = triggerRect.bottom - boardRect.top; // 相对容器下方
  let modalLeft = triggerRect.left - boardRect.left; // 相对容器左侧

  // 判断模态框是否超出容器下边界
  const spaceBelow = boardRect.bottom - triggerRect.bottom;
  if (spaceBelow < modalHeight) {
    // 如果下方空间不足，向上调整
    // modalTop = triggerRect.top - boardRect.top - modalHeight;
    modalTop = modalTop - (modalHeight - spaceBelow)

    // if(position === 'right'){
    //   modalTop += triggerRect.width * 2;
    // }
  }

  // 确保模态框不会超出容器顶部
  if (modalTop < 0) {
    modalTop = 0;
  }

  // 是否超出右边界
  let isOverflowRight = false
  // 判断模态框是否超出容器左右边界
  if (modalLeft + modalWidth > boardRect.width) {
    // 超出容器右侧边界，就定位点击元素左侧
    modalLeft = triggerRect.left - modalWidth;
    isOverflowRight = true

    if(position != 'right'){
      if(modalLeft + triggerRect.width <= boardRect.width){
        modalLeft += triggerRect.width
      }
    }
  }
  if (modalLeft < 0) {
    // 超出容器左侧边界，与容器左侧对齐
    modalLeft = 0;
  }

  if(position === 'right'){
    if(!isOverflowRight && modalLeft + triggerRect.width <=  boardRect.width){
      modalLeft += triggerRect.width
    }

    if(modalLeft + modalWidth > boardRect.width){
      modalLeft -= (triggerRect.width + modalWidth)
    }
    modalTop -= triggerRect.height
  }

  // 设置模态框的相对位置
  $modal.css({
    position: 'absolute',
    top: modalTop + 'px',
    left: modalLeft + 'px',
    display: 'block', // 显示模态框
  }).show();

  $modal.addClass('task-dialog')

  $('#boardView-mask').show()
}

// 公共tooltip方法
$(document).on('mouseenter', '[data-tooltip]', function(event) {
  // 在body 中创建一个隐藏的 tooltip 元素
  if (!$('#custom_tooltip').length) {
    $('body').append('<div id="custom_tooltip" style="display: none;"></div>');
  }
  var tooltipText = $(this).attr('data-tooltip');
  var tooltip = $('#custom_tooltip');

  tooltip.text(tooltipText).css({
    display: 'block',
    top: event.pageY + 5,
    left: event.pageX + 4
  });

  // 获取 tooltip 的宽度和高度
  var tooltipWidth = tooltip.outerWidth();
  var tooltipHeight = tooltip.outerHeight();

  // 计算新的 left 和 top 位置，避免超出视口
  var newLeft = event.pageX + 10;
  var newTop = event.pageY + 15;

  // 检查 tooltip 是否会超出屏幕右边缘
  if (newLeft + tooltipWidth > $(window).width()) {
    newLeft = $(window).width() - tooltipWidth - 10;  // 将 tooltip 放到屏幕右边
  }

  // 检查 tooltip 是否会超出屏幕下边缘
  if (newTop + tooltipHeight > $(window).height()) {
    newTop = event.pageY - tooltipHeight - 15;  // 将 tooltip 放到元素上方
  }

  // 更新 tooltip 位置
  tooltip.css({
    left: newLeft,
    top: newTop
  });
});

$(document).on('mouseleave', '[data-tooltip]', function() {
  $('#custom_tooltip').css('display', 'none');
});
