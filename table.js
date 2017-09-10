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
});

// 出力関係
function Output(data){
  AddTable(data, m_table_name);
}

/**
  *テーブル関係
 **/
// 追加
function AddTable(data, table_name){
  var th = GetTableCol(table_name);
  var table = $(table_name);
  $.each(data, function(i, e) {
    var my_tr = $('<tr></tr>').appendTo(table);
    $.each(th, function(j, e2) {
      console.log(e2);
      $("<td>" + e[e2] + "</td>").appendTo(my_tr);
    });
  });
  $("body").append(table);
}
// 結合
function MargeTable(data1, data2){
  $.each(data1, function(i, e1) {
    console.log(e1.id);
    $.each(data2, function(j, e2) {
      if(e1.id == e2.id){
        e1.kana = e2.kana;
      }
    });
  });
}
// ヘッダの情報を取得
function GetTableCol(table_name){
  var ret = [];
  var th = $(table_name + " tr").first().children();
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
