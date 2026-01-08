
function toPdf(){
  var element = document.getElementById('output');
  html2pdf().from(element).save();
}

/**
 * 处理上传文件
 * @param event
 */
function handleFile(event){
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e){
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // 假设你想解析第一个工作表
    const firstSheet = workbook.Sheets[workbook.SheetNames[1]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    // 使用表格展示解析后的数据，并处理合并单元格
    completeColumn(jsonData);

    // 获取合并单元格信息
    const merges = firstSheet['!merges'];
    // 转换数据为 Layui 表格格式，注意第一行是表头
    const tableData = transformToLayuiFormat(jsonData, merges, firstSheet);
    console.log(tableData,'tableData');
    // 使用 Layui 渲染表格
    renderLayuiTable(tableData);
    // displayTable(jsonData, merges);

  };

  reader.readAsArrayBuffer(file);
}

/**
 * 处理数据，补全列
 * @param data
 */
const completeColumn = (data) => {
  let maxLength = 0;
  // 找出最多的一列

  data.forEach((item) => {
    maxLength = Math.max(maxLength, item.length);
  });

  // 不足的列，补全null
  data.forEach((item) => {
    while (item.length < maxLength) {
      item.push(null);
    }
  });
};

function transformToLayuiFormat(data, merges, sheet) {
  if (data.length === 0) return { cols: [], data: [] };

  // 第一行作为表头信息
  const headers = data[0];
  const cols = headers.map((header, index) => ({
    field: `col${index}`,
    title: header || `列${index + 1}`
  }));

  // 从第二行开始作为表格数据
  const formattedData = data.slice(1).map((row, rowIndex) => {
    const rowData = {};
    row.forEach((cell, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIndex + 1, c: colIndex });
      const cellValue = sheet[cellRef] && sheet[cellRef].t === 'n' && sheet[cellRef].w && /^\d{1,4}\/\d{1,2}\/\d{2}$/.test(sheet[cellRef].w)
        ? formatDate(sheet[cellRef].v)
        : cell;

      const merge = findMerge(merges, rowIndex + 1, colIndex); // rowIndex + 1 因为跳过了表头行
      if (!merge || (merge.s.r === rowIndex + 1 && merge.s.c === colIndex)) {
        rowData[`col${colIndex}`] = cellValue || '';
      } else {
        rowData[`col${colIndex}`] = '';
      }
    });
    return rowData;
  });

  return { cols: [cols], data: formattedData };
}

function renderLayuiTable(tableData) {
  layui.use('table', function() {
    const table = layui.table;
    table.render({
      elem: '#excelTable',
      cols: tableData.cols,
      data: tableData.data,
      page: true, // 启用分页,
      cellMinWidth: 200,
    });
  });
}

/**
 * 查找合并单元格
 * @param merges
 * @param rowIndex
 * @param colIndex
 * @return {*|null}
 */
function findMerge(merges, rowIndex, colIndex){
  if (!merges) return null;
  for (let i = 0; i < merges.length; i++) {
    const merge = merges[i];
    if (rowIndex >= merge.s.r && rowIndex <= merge.e.r &&
      colIndex >= merge.s.c && colIndex <= merge.e.c) {
      return merge;
    }
  }
  return null;
}

function formatDate(excelDate) {
  const date = XLSX.SSF.parse_date_code(excelDate);
  if (!date) return '';

  const year = date.y;
  const month = ('0' + date.m).slice(-2);
  const day = ('0' + date.d).slice(-2);
  const hours = ('0' + date.H).slice(-2);
  const minutes = ('0' + date.M).slice(-2);
  const seconds = ('0' + date.S).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 判断当前单元格是否被其他合并单元格覆盖
 * @param merges
 * @param rowIndex
 * @param colIndex
 * @return {boolean}
 */
function isCoveredByMerge(merges, rowIndex, colIndex){
  if (!merges) return false;
  for (let i = 0; i < merges.length; i++) {
    const merge = merges[i];
    if (rowIndex > merge.s.r && rowIndex <= merge.e.r &&
      colIndex >= merge.s.c && colIndex <= merge.e.c) {
      return true;
    }
  }
  return false;
}
