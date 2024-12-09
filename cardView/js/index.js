const data = [
  {
  title: '未开始',
  id: 1,
  status: '0',
  children: [
    {
    title: '工作报告页面本周日日历的工作详情展示工作报告页面本周日日历的工作详情展示',
    desc: '任务描述1',
    startTime: '12月12日',
    endTime: '12月13日',
    people: '武振乾',
    status: '未开始',
    priority: '紧急',
    children: [{
      title: '任务1',
      status: '进行中',
      endTime: '',
      people: '宋娅娟'
    },
      {
        title: '任务2',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
      {
        title: '任务3',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
      {
        title: '任务4',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
      {
        title: '任务5',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
    ],
  },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '未进行',
      isPublish: false,
      priority: '非常紧急'
    },
    {
      title: '工作报告页面本周日日历的工作详情展示工作报告页面本周日日历的工作详情展示',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '武振乾',
      status: '未开始',
      priority: '紧急',
      children: [{
        title: '任务1',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
        {
          title: '任务2',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务3',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务4',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务5',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
      ],
    },
  ]
},
  {
    title: '进行中',
    status: '1',
    id: 0,
    children: [{
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '进行中',
      priority: '非常紧急',
      'jd': '80%'
    }, ]
  },
  {
    title: '已完成',
    status: '2',
    id: 2,
    children: [{
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '孙闯',
      status: '已完成',
      priority: '普通'
    }, ]
  },
  {
    title: '已暂停',
    status: '3',
    id: 3,
    children: [{
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '武振乾',
      status: '已暂停',
      priority: '较低'
    }, {
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '宋娅娟',
      status: '已暂停',
      priority: '较低',
      children: [{
        title: '任务1',
        status: '进行中',
        endTime: '',
        people: '宋娅娟'
      },
        {
          title: '任务2',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务3',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务4',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
        {
          title: '任务5',
          status: '进行中',
          endTime: '',
          people: '宋娅娟'
        },
      ]
    }, ]
  },
  {
    title: '已终止',
    status: '4',
    id: 4,
    children: [{
      title: '任务1',
      desc: '任务描述1',
      startTime: '12月12日',
      endTime: '12月13日',
      people: '程家帅',
      status: '已终止',
      priority: '较低'
    }, ]
  },
];

/**
 * 刷新视图数据（提供给父页面调用）
 */
// 刷新视图数据
function refreshViewData(params){
  console.log(params,'refreshViewData')
}

/**
 * 入口方法
 * @param {String} id 容器id
 * @param {Object} data 渲染的数据
 */
function render(id, data){
  $(id).html(`<div id="boardView" class=""><div id="boardView-mask"></div></div>`);
  const root = $('#boardView');
  data.forEach(item => {
    const panel = `<div class="boardView-item" data-status="${item.status}">
              <div class="boardView-item-label">
                <div class="boardView-item-label-left">${item.title} ${item.children.length > 0 ? `${item.children.length}` : ''}</div>
<!--                <div class="boardView-item-label-right">···</div>-->
              </div>
              <div class="boardView-item-taskList">${taskList(item.children)}</div>
              <div class="addTask" data-action="add-task" style="${item.children.length > 0 ? '' : 'margin-top: 0' }">+</div>
          </div>`;
    root.append(panel);
  });

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
    html += `<div class="task" data-id="${item.id}">
    <div class="task-priority" data-priority="${item.priority}" data-tooltip="${item.priority}"></div>
    
    <div class="task-info">
        <div class="task-info-title" title="${item.title}">${item.title}</div>`

    if(item.people){
      html +=  `<div class="task-info-people" data-tooltip="${item.people}">${item.people ? item.people.slice(0, 1) : ''}</div>`
    }

    html += `</div><div class="task-tips">`

    html += `<div class="task-operation" data-action="card-operation">···</div>`

    if(item.isPublish === false){
      html += `<div class="task-status task-publish">未发布</div>`
    }

    if(item.status){
      html += `<div class="task-status" data-status="${item.status}">${item.status}</div>`
    }

    if(item.startTime && item.endTime){
      html += `<div class="task-time">${item.startTime} - ${item.endTime}</div>`
    }

    if(item.jd){
      html += `<div class="task-jd" data-jd="${item.jd}">已完成：<span>${item.jd}</span></div>`
    }

    if(item.children){
      html += `<div class="task-children" data-tooltip="查看子任务" data-action="showChildren" data-index="${index}">
                    ${item.children && item.children.length > 0 ? `${0}/${item.children.length}` : ''}
               </div>`
    }

    html +=  `</div></div>`;
  });
  return html
}

/**
 * 创建子任务弹窗
 * @param data
 */
function createChildrenModal(data){
  if(!data || data.length === 0) return ''
  let html = ` <div class="task-children-modal" id="taskChildrenModal">
      <div class="task-children-modal-header">
          子任务 <span>0 / 4</span>
      </div>
      <div class="task-children-modal-list">
  `
  data.forEach(item => {
    html += `<div class="task-children-modal-list-item">
            <div>进行中</div>
            <div>任务名称，超出两行显示省略号</div>
            <div>昨天截止</div>
            <div>人员头像</div>
        </div>`
  })

  html += `</div></div>`
  // 如果窗口已存在，则移除
  if($('#taskChildrenModal').length > 0){
    $('#taskChildrenModal').remove()
  }
  $('#boardView').append(html)
}

/**
 * 创建操作面板
 */
function createOperationPanel(){
  let html = `<div class="task-operation-panel" id="taskOperationPanel">`

  // 确认工时
  html += `<div class="task-operation-panel-item" data-action="confirm">确认工时</div>`

  // 设置执行人
  html += `<div class="task-operation-panel-item" data-action="setExecutor">设置执行人</div>`

  // 设置截止时间
  html += `<div class="task-operation-panel-item" data-action="setDeadline">设置截止时间</div>`

  // 设置优先级
  html += `<div class="task-operation-panel-item" data-action="setPriority"">设置优先级</div>`

  // 设置任务状态
  html += `<div class="task-operation-panel-item" data-action="setStatus">设置任务状态</div>`

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
  let people = ['武振乾', '王伟', '王伟', '王伟']
  let html = `<div class="setExecutorPanel subMenu" id="setExecutorPanel">`
  people.forEach(item => {
    html += `<div class="setExecutorPanel-item">${item}</div>`
  })

  html += '</div>'
  // 如果窗口已存在，则移除
  if($('#setExecutorPanel').length > 0){
    $('#setExecutorPanel').remove()
  }
  $('#boardView').append(html)
  setModalPosition('#setExecutorPanel', me, 'right')
}

/**
 * 设置截止时间日历面板点击回调
 */
function handleSetDeadline(date){
  console.log(date);
}

/**
 * 创建设置截止时间面板
 */
function createSetDeadlinePanel(me){
  let time = '2019-07-01';
  let startTime = '2024-12-04';
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
    debugger
    $('#aaa #cmpce4f75calendar').calendar('moveTo', new Date(2012, 0, 1));
  })

}

/**
 * 事件绑定
 */
function eventBind(){
  $('.boardView-item-taskList .task').off('click').on('click', function (){
    console.log('点击卡片');
  })

  // 显示子任务看板
  $('[data-action=showChildren]').off('click').on('click', function (event){
    event.stopPropagation();
    const index = $(this).attr('data-index');
    createChildrenModal([
      { title: '任务1', status: '进行中', endTime: '', people: '宋娅娟'},
      { title: '任务2', status: '进行中', endTime: '', people: '宋娅娟'},
      { title: '任务3', status: '进行中', endTime: '', people: '宋娅娟'},
      { title: '任务4', status: '进行中', endTime: '', people: '宋娅娟'},
      { title: '任务5', status: '进行中', endTime: '', people: '宋娅娟'},
    ])

    let me = this
    // 将taskChildrenModal展示在当前点击元素的下方，如果下方位置不够，则将taskChildrenModal位置向上移动到可以显示为止即可
    setModalPosition('#taskChildrenModal', me)
  })

  // 添加任务
  $('[data-action=add-task]').off('click').on('click', function (){
    console.log('添加任务');
  })

  // 点击卡片操作按钮
  $('[data-action=card-operation]').off('click').on('click', function (e){
    e.stopPropagation();
    let me = this
    $(me).css('display', 'block');
    createOperationPanel();
    setModalPosition('#taskOperationPanel', me, 'right')
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
 * 绑定操作面板事件
 */
function bindOperationPanelEvent(){
  $('.task-operation-panel-item[data-action=confirm]').off('click').on('click', function (){
    // 先隐藏之前的二级菜单
    $('.subMenu').hide();
    // 取消同级的选中样式
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
    // 添加选中样式
    $(this).addClass('task-operation-panel-item-active')
    console.log('确认工时')
  })

  $('.task-operation-panel-item[data-action=setExecutor]').off('click').on('click', function (){
    console.log('设置执行人')
    // 先隐藏之前的二级菜单
    $('.subMenu').hide();
    // 取消同级的选中样式
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
    // 添加选中样式
    $(this).addClass('task-operation-panel-item-active')
    createSetExecutorPanel(this)
  })

  $('.task-operation-panel-item[data-action=setDeadline]').off('click').on('click', function (){
    // 先隐藏之前的二级菜单
    $('.subMenu').hide();
    // 取消同级的选中样式
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
    // 添加选中样式
    $(this).addClass('task-operation-panel-item-active')
    createSetDeadlinePanel(this)
    console.log('设置截止时间')
  })

  $('.task-operation-panel-item[data-action=setPriority]').off('click').on('click', function (){
    // 先隐藏之前的二级菜单
    $('.subMenu').hide();
    // 取消同级的选中样式
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
    // 添加选中样式
    $(this).addClass('task-operation-panel-item-active')
    console.log('设置优先级')
  })

  $('.task-operation-panel-item[data-action=setStatus]').off('click').on('click', function (){
    // 先隐藏之前的二级菜单
    $('.subMenu').hide();
    // 取消同级的选中样式
    $('.task-operation-panel-item').removeClass('task-operation-panel-item-active')
    // 添加选中样式
    $(this).addClass('task-operation-panel-item-active')
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
    debugger
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

render('#app', data);
