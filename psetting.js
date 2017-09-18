var m_table_name = "#table";

$(function(){
  $("#name").click(function(){
    col = this.cellIndex;
    SortTable(m_table_name, "kana", /*is_asc=*/false);
  });
});
