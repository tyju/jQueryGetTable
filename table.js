var m_table = {};
var m_table_name = "#table";

$(function(){
  $.when(
    GetTable("./table1.json"),
    GetTable("./table2.json")
  )
  .done(function(data_1, data_2) {
      var tbl1 = data_1[0];
      var tbl2 = data_2[0];
      MargeTable(tbl1, tbl2);
      m_table = tbl1;
      Output(m_table);
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
        $.each(e2, function(k, col) {
          // データの重複チェック
          if(k in e1 == true && k != "id"){
            console.warn("duplicate data: " + k);
          }
          e1[k] = col;
        });
      }
    });
  });
}
// ソート
function SortTable(table, col_id){
  var header = GetTableHeader(table);
  //var data = GetTableData(table);
  var data = m_table;
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
