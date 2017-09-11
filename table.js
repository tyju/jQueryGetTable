var m_table1 = {};
var m_table2 = {};
var m_table_name = "#table";

$(function(){
  $.when(
    GetTable("./table1.json"),
    GetTable("./table2.json")
  )
  .done(function(data_1, data_2) {
      m_table1 = data_1[0];
      m_table2 = data_2[0];
      MargeTable(m_table1, m_table2);
      Output(m_table1);
  });
  $(".tsort").click(function(){
    col = this.cellIndex;
    SortTable($(m_table_name + " tr"), col);
  });
});

// 出力関係
function Output(data){
  SetTable(data, m_table_name);
}

/**
  *テーブル関係
 **/
// 削除
function DelTable(table_name){
  var table = $(table_name + " tr");
  while($(table_name + " tr").length > 1) {
    $(table_name + " tr:last").remove();
  }
}
// 追加
function SetTable(data, table_name){
  var table = $(table_name);
  DelTable(table_name); // 初期化
  var th = GetTableHeader($(table_name + " tr"));
  $.each(data, function(i, e) {
    var my_tr = $('<tr></tr>').appendTo(table);
    $.each(th, function(j, e2) {
      $("<td>" + e[e2] + "</td>").appendTo(my_tr);
    });
  });
  $("body").append(table);
}
// 結合
function MargeTable(data1, data2){
  $.each(data1, function(i, e1) {
    $.each(data2, function(j, e2) {
      if(e1.id == e2.id){
        e1.kana = e2.kana;
      }
    });
  });
}
// ソート
function SortTable(table, col_id){
  var header = GetTableHeader(table);
  var data = GetTableData(table);
  data.sort(function(a, b) { return b[header[col_id]] < a[header[col_id]] ? 1 : -1; });
  Output(data);
}
// ヘッダの情報を取得
function GetTableHeader(table){
  var ret = [];
  var th = table.first().children();
  $.each(th, function(i) {
    var td = th.eq(i).text();
    ret.push(td);
  });
  return ret;
}
// 列データの取得(thを除く)
function GetRowData(table, col_id){
  var ret = [];
  $.each(table, function(i) {
    var cell = table.eq(i).children().eq(col_id);
    if(cell.is("td")){
      ret.push(cell.text());
    }
  });
  console.log(ret);
  return ret;
}
// データを二次元配列として取得(thを除く)
function GetTableData(table){
  var ret = [];
  var header = GetTableHeader(table);
  $.each(table, function(i) {
    var cells = table.eq(i).children();
    if(cells.eq(1).is("td")){
      ret[i-1] = {};
      $.each(cells, function(j) {
        var cell = cells.eq(j);
        ret[i-1][header[j]] = cell.text();
      });
    }
  });
  return ret;
}

/**
  *データ取得
 **/
function GetTable(url){
  var table = {};
  return $.ajax({
    //url: "./table1.json",
    url: url,
    type: "GET",
    dataType: "json"
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.info("error");
    console.log("XMLHttpRequest : " + jqXHR.status);
    console.log("textStatus : " + textStatus);
    console.log("errorThrown : " + errorThrown);
  })
  .always(function() {
    console.info("finish");
  });
}
