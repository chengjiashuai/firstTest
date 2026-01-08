/**
 * 入口方法
 */
function renderMyTodoList(id) {
  var taskList = [];
  var pageNum = 0;
  var pageSize = 3;
// 待我处理：todo； 我已处理：finished； 我创建的：create；
  var taskType = 'todo';
  var cmpId = id;
  var initDom =
    '<div class="my-todo-list">' +
    '<div id="myTodoTab" class="tab-nav"></div>' +
    '<div id="myTodoListContainer"></div>' +
    '</div>'

  $('#' + cmpId).html(initDom);
  renderTab(cmpId);
  getTodoList('todo');
  addActiveClass('todo');
  addNiceScroll($('#' + cmpId));

  // 监听刷新
  window.addEventListener('message', function(event) {
    if (event.data.refresh) {
      pageNum = 0;
      getTodoList(taskType);
    }
  });

  // 渲染tab页签
  function renderTab(cmpId) {
    var tabDom = '<div class="tab-nav-item" data-type="todo">' +
      '<span>待我处理</span>' +
      '<div class="num_mark" style="display: none"></div>' +
      '</div>' +
      '<div class="tab-nav-item" data-type="finished">我已处理</div>' +
      '<div class="tab-nav-item" data-type="create">我创建的</div>'

    $('#myTodoTab').html(tabDom);

    // tab页签切换回调
    $(".tab-nav-item").off('click').on('click', function(event) {
      var type = $(this).attr('data-type');
      pageNum = 0;
      getTodoList(type);
      addActiveClass(type);
    });
  }

  // tab-添加待办任务数字统计
  function addNumMark(num) {
    if (taskType != 'todo') return;
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

  // 渲染任务列表
  function renderList() {
    var taskContainer = $('#myTodoListContainer')
    taskContainer.html('')
    var taskItemList = $('<div id="myTodoItemList" class="task-container"></div>');

    $.each(taskList, function(index, task) {
      var applydept = task.variables.applydept || '';
      var bpmtype = task.variables.bpmtype || '';
      var title = task.variables.theme || '';
      var taskDiv =
        '<div class="task-item">' +
        '<div class="task-top">' +
        '<div class="task-header">' +
        '<div class="task-header-title" title="' + title + '">' + title + '</div>' +
        '<div class="task-header-type" title="' + bpmtype + '">' + bpmtype + '</div>' +
        '</div>' +
        '<div class="task-details">' +
        '<div class="task-applicant" title="' + applydept + ' ' + task.processStarter + '"><span class="task-details-label">申请人: </span>' + applydept + ' ' + task.processStarter + '</div>' +
        renderApproveStatus(task) +
        '<div class="task-date" title="' + task.processStartTime + '">' + task.processStartTime + '</div>' +
        '</div>' + // Closing tag corrected here
        '</div>' + // Closing tag corrected here
        '<div class="task-bottom">' + renderBtn(task, index) + '</div>' +
        '</div>';
      taskItemList.append(taskDiv);
    });

    taskContainer.append(taskItemList)

    if (taskList.length > 0) {
      var imgUrl = getUrl('rss') + '/project/tenant/erp/imsme/sbms/support/image/next_page.png';
      taskContainer.append('<div class="switch-left" data-action="switch-left"><img src="' + imgUrl + '" /></div>');

      // 切换列表展示分页
      $("[data-action=switch-left]").off('click').on('click', function(event) {
        getTodoList(taskType);
      });
    }

    // 办理按钮事件绑定
    registerEvent()
  }

  // 获取待办列表数据
  function getTodoList(type) {
    taskType = type;
    var url = '';
    var params = "type=1&start=" + pageNum * pageSize + "&limit=" + pageSize + "&userId={sys_user_id}&createYear=&createTime=2024-08-01 00:00:00,{sys_current_time}";
    if (type == 'todo') {
      url = "../cosmo-bpm/bpmn/findAllTaskListForExternal?" + params;
    } else if (type == 'finished') {
      url = "../cosmo-bpm/bpmn/findHistoryByUserIdExternal?" + params;
    } else if (type == 'create') {
      url = "../cosmo-bpm/bpmn/findInstancesByUserId?" + params;
    }
    $.ajax({
      type: "get",
      url: url,
      success: function(res) {
        if (res.success) {
          if (taskType == 'todo') {
            addNumMark(res.total);
          }
          taskList = res.rows;
          if (pageNum == 0 && res.total == 0) {
            renderEmpty();
            return;
          }

          if ((pageNum + 1) * pageSize >= res.total) {
            $("[data-action=switch-left]").hide();
          }
          pageNum++;
          renderList(type);
        }
      }

    });
  }

  // 渲染空状态
  function renderEmpty() {
    var imgUrl = getUrl('rss') + '/project/tenant/erp/imsme/sbms/support/image/empty.png';
    $("#myTodoListContainer").html('<div class="empty"><img src=' + imgUrl + ' /></div>');
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

  // 我已处理任务-审核状态
  function renderApproveStatus(task) {
    if (taskType != 'finished') return '';
    return '<div class="task-approve"><span class="task-details-label">审核状态:</span> <b>' + task.operationType + '</b></div>';
  }

  // 渲染任务卡片操作按钮
  function renderBtn(row, index) {
    if (taskType == 'todo') {
      return '<button class="process-btn" data-action="handle" data-index=' + index + ' data-taskName="办理">去处理</button>';
    } else if (taskType == 'finished') {
      return '<button class="process-btn" data-action="view" data-index=' + index + ' data-taskName="查看">查看</button>';
    } else {
      var btnStr = '<div class="btn-list"><button class="process-btn" data-action="look" data-index=' + index + ' data-taskName="查看">查看</button>';
      // 补充说明按钮
      if (row.status == '待补充') {
        btnStr = btnStr + '<button class="process-btn" data-action="replenish" data-index=' + index + ' data-taskName="补充说明">补充说明</button>';
      }

      btnStr = btnStr + '</div>';
      return btnStr;
    }
  }

  // 任务卡片操作按钮点击事件
  function registerEvent() {
    // 办理按钮点击回调
    $('.process-btn').off('click').on('click', function(event) {
      var dataIndex = $(this).attr('data-index');
      var taskName = $(this).attr('data-taskName');
      var rowData = taskList[dataIndex];
      var type = '';
      if (taskType == 'todo') {
        type = '全任务列表';
      } else if (taskType == 'finished') {
        type = '已办任务列表';
      } else {
        if (['已结束', '已终止'].indexOf(rowData.status) > -1) {
          type = '已办结任务列表';
        } else {
          type = '已发起任务列表';
        }
      }


      completeTask('any', rowData, taskType, taskName, 'parent', 'id');
    });
  }
}

renderMyTodoList('cmp1bb1f5')
