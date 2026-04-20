/**
 * 入口方法
 * @param id 渲染dom容器id
 * @param renderType 需要渲染列表的类型，不传入则以tab页签形式展示
 */
function renderTaskList(id, renderType) {
  var taskList = [];
  var pageNum = 0;
  var pageSize = getParamValue("pageSize");
  // 待办：todoTask； 已办：handleTask； 在办：initiateTask； 办结：finishTask； 我创建的：createTask
  var taskType = renderType ? renderType : 'todoTask';
  var cmpId = id;
  var initDom =
    '<div class="my-todo-list">' +
    '<div id="myTodoTab" class="tab-nav"></div>' +
    '<div id="myTodoListContainer" class="task-container"></div>' +
    '</div>'

  $('#' + cmpId).html(initDom);
  getTodoList(renderType ? renderType : 'todoTask');
  if(!renderType){
    renderTab();
    addActiveClass();
  }else{
    $('#myTodoTab').hide();
  }
  addNiceScroll($('#myTodoListContainer'));

  // 监听刷新
  window.addEventListener('message', function(event) {
    if (event.data.refresh) {
      pageNum = 0;
      getTodoList(taskType);
    }
  });

  // 渲染tab页签
  function renderTab() {
    var tabDom = '<div class="tab-nav-item" data-type="todoTask">' +
      '<span>待我处理</span>' +
      '<div class="num_mark" style="display: none"></div>' +
      '</div>' +
      '<div class="tab-nav-item" data-type="handleTask">我已处理</div>' +
      '<div class="tab-nav-item" data-type="createTask">我创建的</div>'

    $('#myTodoTab').html(tabDom);

    // tab页签切换回调
    $(".tab-nav-item").off('click').on('click', function(event) {
      pageNum = 0;
      taskType = $(this).attr('data-type');
      getTodoList();
      addActiveClass();
    });
  }

  // tab-添加待办任务数字统计
  function addNumMark(num) {
    if (taskType != 'todoTask') return;
    if ($('#myTodoTab .num_mark').length == 0 && num != 0) {
      if (num > 99) num = '99+';
      $('#myTodoTab').append('<div class="num_mark">' + num + '</div>');
    }

    if (num == 0) {
      $('#myTodoTab .num_mark').hide();
    } else {
      if (num > 99) num = '99+';
      $('#myTodoTab .num_mark').show();
      $('#myTodoTab .num_mark').text(num);
    }
  }

  // 切换tab，添加选中状态
  function addActiveClass() {
    $('#myTodoTab .tab-nav-item').each(function() {
      if ($(this).attr('data-type') == taskType) {
        $(this).addClass('active-title');
      } else {
        $(this).removeClass('active-title');
      }
    });
  }

  // 渲染任务列表
  function renderList() {
    var taskContainer = $('#myTodoListContainer')
    taskContainer.html('')

    $.each(taskList, function(index, task) {
      var applydept = task.variables.applydept || '';
      var bpmtype = task.variables.bpmtype || '';
      var title = task.variables.theme || '';
      var applyuser = task.variables.applyuser || '';
      var taskDiv =
        '<div class="task-item" data-index=' + index + ' data-status='+ task.status +'>' +
        '<span class="task-item-time">' + task.processStartTime + '</span>' +
        title + '，' +
        bpmtype + '，' +
        renderApproveStatus(task) +
        applydept + ' ' + applyuser +
        '</div>'
      taskContainer.append(taskDiv);
    });

    // 办理按钮事件绑定
    registerEvent()
  }

  // 获取待办列表数据
  function getTodoList() {
    var url = '';
    var params = "type=1&start=" + pageNum * pageSize + "&limit=" + pageSize + "&userId={sys_user_id}&createYear=&createTime=2024-08-01 00:00:00,{sys_current_time}";
    if (taskType == 'todoTask') {
      // 待办
      url = "../cosmo-bpm/bpmn/findAllTaskListForExternal?" + params;
    } else if (taskType == 'handleTask') {
      // 已办
      url = "../cosmo-bpm/bpmn/findHistoryByUserIdExternal?" + params;
    } else if (taskType == 'initiateTask') {
      // 在办
      url = "../cosmo-bpm/bpmn/findInstancesByUserId?" + params + '&status=2';
    } else if (taskType == 'finishTask') {
      // 办结
      url = "../cosmo-bpm/bpmn/findInstancesByUserId?" + params + '&status=3';
    } else if (taskType == 'createTask') {
      // 我创建的
      url = "../cosmo-bpm/bpmn/findInstancesByUserId?" + params;
    }
    $.ajax({
      type: "get",
      url: url,
      success: function(res) {
        if (res.success) {
          if (taskType == 'todoTask' && !renderType) {
            addNumMark(res.total);
          }

          taskList = res.rows;
          if (pageNum == 0 && res.total == 0) {
            renderEmpty();
            return;
          }
          pageNum++;
          renderList();
        }
      }

    });
  }

  // 渲染空状态
  function renderEmpty() {
    var imgUrl = getUrl('rss') + '/project/tenant/erp/imsme/sbms/support/image/empty.png';
    $("#myTodoListContainer").html('<div class="empty"><img src=' + imgUrl + ' /></div>');
  }

  // 我已处理任务-审核状态
  function renderApproveStatus(task) {
    if (taskType != 'handleTask') return '';
    return task.operationType + ',';
  }

  // 任务卡片操作按钮点击事件
  function registerEvent() {
    $('#myTodoListContainer .task-item').off('click').on('click', function(event) {
      var dataIndex = $(this).attr('data-index');
      var dataStatus = $(this).attr('data-status');
      var rowData = taskList[dataIndex];
      var type = '';
      var name = '查看'

      if (taskType == 'todoTask') {
        type = '全任务列表';
        name = '办理';
      } else if (taskType == 'handleTask') {
        type = '已办任务列表';
      } else {
        if (['已结束', '已终止'].indexOf(rowData.status) > -1) {
          type = '已办结任务列表';
        } else {
          type = '已发起任务列表';
        }

        // 补充说明
        if(dataStatus == '待补充'){
          name = '补充说明'
        }

        // 重新提交
        if(dataStatus == '已终止'){
          name = '编辑'
        }
      }
      completeTask('any', rowData, type, name, 'parent', 'id');
    });
  }
}

renderTaskList('cmp1bb1f5')
