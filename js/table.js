define(['jqDataTables','dataTablesBootstrap'], function () {
        console.log(22222345645)
    });

// $(function() {
//         //计算表格高度
//         var h = $(".tabsPageContent").height() - $(".table-responsive").position().top - 66;
  
//         $('.form-inline,#table').jqTransform();

//         // $('#table').DataTable({
//         //     "searching":     false,
//         //     "sDom": 'rt<"row"<"col-sm-8 dataTables_inline"li><"col-sm-4"p><"clear">>',
//         //     "scrollY": h,
//         //     "scrollX": true,
//         //     "order": [[ 1, 'asc' ]],
//         //     "columnDefs": [{ "targets": 0, "orderable": false, "className": "text-center",  "  width": "20px" }],
//         //     "oLanguage" : {
//         //           "sLengthMenu": "显示 _MENU_ 项",
//         //           "sZeroRecords": "抱歉， 没有找到",
//         //           "sInfo": "共 _TOTAL_ 项",
//         //           "sInfoEmpty": "没有数据",
//         //           "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
//         //           "sZeroRecords": "没有检索到数据",
//         //            "sSearch": "名称:",
//         //           "oPaginate": {
//         //           "sFirst": "首页",
//         //           "sPrevious": "上一页",
//         //           "sNext": "下一页",
//         //           "sLast": "末页"
//         //           }
                       
//         //     },
//         //     "initComplete": function () {
//         //       $("#checkAll").on("click",function(){
//         //         var checked = "",flag = false;
//         //         if(this.checked){ checked = " jqTransformChecked"; flag = true; }
//         //         $("#table tbody input[type='checkbox']").each(function(){
//         //           $(this).attr("checked",flag);
//         //           $(this).prev(".jqTransformCheckbox").attr("class","jqTransformCheckbox" +   checked);
//         //         });
//         //       });
//         //     }
//         // });
//         $("a[target='pageModal']").on("click",function(){
//             var $this = $(this);
//             var title = $this.attr("title") || $this.text();
//             var rel = $this.attr("rel") || "_blank";
//             var url = $this.attr("href");
//             var options = "";
//             pageModal.openModal(url, rel, title, options);
//             return false;
//         });
//         $("a#del_table").on("click",function(){
//             var item = $("#table tbody input[type='checkbox']:checked");
//             if(item.size() > 0){
//               item.parents("tr").remove();
//               $("#checkAll").attr("checked",false)
//               $("#checkAll").prev().removeClass("jqTransformChecked");
//             }
//             else{ alert("请先选择需要删除的行"); }
//         });
//     });