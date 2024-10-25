
var Selected_Party = "";
var Selected_Party_Short = "";
var Select_Block = 0;

n =  new Date();
y = n.getFullYear();
m = n.getMonth()+1;
if(m < 10){m = "0"+m;}
d = n.getDate();
if(d < 10){d = "0"+d;}
$(".Today_Date").html(d + "-" + m + "-" + y);
$(".Input_Today_Date").val(y+"-"+m+"-"+d);


function DistictValue(){
	$("#OrderCount").html(0);
	$("#PcsCount").html(0);
	$("#AmountCount").html(0);
var uniqueItems = [];
var AllItems = [];
$("#Statistics tbody").html("")
  $('#Job_Rows td[class="Job_Size"]')
    .filter(function(index, element){
      if($.inArray($(element).text().toLowerCase(), uniqueItems) === -1) {
	  if($(element).closest("tr").is(":visible")){
        uniqueItems.push($(element).text().toLowerCase());
		}
      }else{
        $(element).parent();
      }
    });
	$('#Job_Rows td[class="Job_Size"]').each(function(){
	if($(this).is(":visible")){
        AllItems.push($(this).text().toLowerCase());
		}
      });
	var srn = "0";
	var GTotalPcs = 0;
	var OrdTotal = 0;
	var GtotalAmount = 0;
	uniqueItems.forEach(function(){
	var Ratefeedback = "";
	var TotalPcs = 0;
	var Amount = 0;
	var UniqueSize = uniqueItems.length;
	var AllItemscount = AllItems.length;
	
	function checkAge(sizes){
	return sizes == uniqueItems[srn];
	}

    myFunction()
	function myFunction() {
	var Rate = 0;
	Amount = 0;
	$("#Job_Rows tr").each(function(){
	var checksize = $(this).find(".Job_Size").text().toLowerCase();
	if($(this).is(":visible")){
	if(checksize == uniqueItems[srn]){
	var jobpcs = parseInt($(this).find(".Job_Quantity").html());	
	TotalPcs += jobpcs;
	if($(this).find(".Job_Rate").text() != Rate && Rate != "0"){
	Ratefeedback = "text-danger";
	}
	Rate = $(this).find(".Job_Rate").text();
	//Amount += Rate*jobpcs;
	Amount = Rate*TotalPcs;
	}}
	});
	$("#Statistics tbody").append("<tr><td class='ssrn'></td><td>"+uniqueItems[srn]+"</td><td class='TOrders'>"+AllItems.filter(checkAge).length+"</td><td class='pcs'>"+TotalPcs+"</td><td class='"+Ratefeedback+"'>"+Rate+"</td><td>"+Amount+"</td></tr>");

	}
	
		GtotalAmount += Amount;
		GTotalPcs += TotalPcs;
	OrdTotal += AllItems.filter(checkAge).length;
	$("#OrderCount").html(OrdTotal);
	$("#PcsCount").html(GTotalPcs);
	$("#AmountCount").html(GtotalAmount);
	srn++;
	});
	
	var tbody = $('#StatisticsTable');
	tbody.find('tr').sort(function(a, b) {
	var tda = parseInt($(a).find('.pcs').text());
	var tdb = parseInt($(b).find('.pcs').text());
	return tda > tdb ? -1
	: tda < tdb ? 1  
	: 0;
	}).appendTo(tbody);
	GetSrNo()
}

$("#Items_list").focus(function(){
//Items_list(Party);
});

$("#nav-Job-tab").attr("href","#nav-Job");
$("#nav-Payment-tab").attr("href","#nav-Payment");

var classtr = "'tr'";

var deleteScript = "$(this).closest('tr').detach().appendTo('#Recycle_Jobs'); deleteJob();";
var Function_Key = '<button class="DeleteRow btn btn-sm btn-danger" onclick="'+deleteScript+'">Delete</button>';

$("#Job_Items").focus(function(){
Items_list(Party);
var Job_Description = $("#Job_Description").val().split(" ");
var Lenth = Job_Description.length;
if($.isNumeric(Job_Description[Lenth-1])){
$("#Job_Items").val("");
$("#Job_Items").val(Job_Description[Lenth-2]);
$("#Job_Quantity").val("");
$("#Job_Quantity").val(Job_Description[Lenth-1]);
$("#Job_Rate").val("");
var srn = 0;
var Job_Name = "";
while(srn < Lenth-2){
Job_Name += Job_Description[srn]+" ";
srn++;
}
Job_Name = $.trim(Job_Name);
$("#Job_Description").val(Job_Name);

var value = $("#Job_Items").val().toLowerCase();
if(value != ""){
    $("#Items_list option").each(function(){
	var ItemDetail = $(this).html().split(" ");
	if(ItemDetail[0].toLowerCase() == Job_Description[Lenth-2].toLowerCase()){
	$(this).prop("selected","selected");
	$("#Job_Rate").val(ItemDetail[2]);
	}
	});
if($("#Items_list option").length == 0){
Items_list(Party);
}
}

$("#Add_Job").focus();
if($("#Job_Rate").val() == ""){$("#Job_Rate").focus()}
if($("#Job_Quantity").val() == ""){$("#Job_Quantity").focus()}
if($("#Job_Items").val() == ""){$("#Job_Items").focus()}
}
GetAmount()
});


function Add_Job(){
var Selected_Estimate = $("#Selected_Estimate").val();
var Job_No = parseInt($("#Job_No").html());
var Job_Description = $("#Job_Description").val();
var Job_Size_Valid = $("#Job_Items").val();
var Job_Size = $("#Job_Items").val();
var Job_Quantity = $("#Job_Quantity").val();
var Job_Rate = $("#Job_Rate").val();
var Job_Date = $("#Job_Date").val().split('-');
Job_Date = Job_Date[2]+"-"+Job_Date[1]+"-"+Job_Date[0];
var Job_Amount = Job_Rate*Job_Quantity;

Job_Description = $.trim(Job_Description);
var CheckList = [];
$("#Main_Table tr .Job_Description").each(function(){
CheckList.push($.trim($(this).text()));
});

if ($.inArray(Job_Description, CheckList) >= 0) {
    $("#Job_Alert").html('Data exists.');
	$("#Job_Description").val($.trim($("#Job_Description").val())+" ");
	$("#Job_Description").focus();
}else{
    $("#Job_Alert").html("");
if(Selected_Party != "All_Job" && Job_Rate != "" && Selected_Estimate != "" && Job_Description != "" && Job_Size_Valid != "Items_0" && Job_Size != "Universal" && Job_Size != "" && Job_Quantity != ""){
var conf = confirm(Job_Description+" "+Job_Size+" "+Job_Quantity);
if(conf){
$("#Job_Rows").prepend('<tr id="Job_'+Job_No+'" class="Job_Row P_'+Selected_Party_Short+' E_'+Selected_Estimate+'"><td class="Job_Id">'+Job_No+'</td><td class="For_Partys">'+Selected_Party_Short+'</td><td class="For_Estimate text-danger">'+Selected_Estimate+'</td><td class="Job_Date">'+Job_Date+'</td><td class="Job_Description">'+Job_Description+'</td><td class="Job_Size">'+Job_Size+'</td><td  class="Job_Quantity">'+Job_Quantity+'</td><td class="Job_Rate"> <span>'+Job_Rate+'</span></td><td class="Job_Amount"> <span>'+Job_Amount+'</span></td><td class="For_Attach"><input type="button" value="Attach" class="btn btn-sm btn-light text-secondary"></td><td class="Function_Key">'+Function_Key+'</td></tr>');
$("#Job_No").html(Job_No+1);
Estimate_Selected();
Sort_Row();
$("#Job_Description,#Job_Quantity,#Job_Items").val("");
}
$("#Job_Description").focus();
}else{
alert("Input Not Found!");
$("#Add_Job").focus();
if($("#Job_Rate").val() == ""){$("#Job_Rate").focus()}
if($("#Job_Quantity").val() == ""){$("#Job_Quantity").focus()}
if($("#Job_Items").val() == ""){$("#Job_Items").focus()}
}
}
}

function GetRate(){
var id = $("#Items_list").val();
var Rate = $("#"+id+" .Items_Rate").html();
$("#Job_Rate").val(Rate);
var Description = $("#"+id+" .Items_Description").html();
$("#Job_Items").val(Description);
}

function Add_Payment(){
var Selected_Estimate = $("#Selected_Estimate").val();
var Pay_No = parseInt($("#Pay_No").html());
var Pay_Description = $("#Pay_Description").val();
var Pay_Date = $("#Pay_Date").val().split('-');
Pay_Date = Pay_Date[2]+"-"+Pay_Date[1]+"-"+Pay_Date[0];
var Pay_Amount = $("#Pay_Amount").val();
if(Selected_Party != "All_Job" && Selected_Estimate != "" && Pay_Description != "" && Pay_Date != "" && Pay_Amount != ""){
var conf = confirm(Pay_Description+" "+Pay_Amount);
if(conf){
$("#Pay_Rows").prepend('<tr id="Pay_'+Pay_No+'" class="Pay_Row P_'+Selected_Party_Short+' E_'+Selected_Estimate+'"><td class="Pay_Id">'+Pay_No+'</td><td class="For_Partys" style="display: none;">'+Selected_Party_Short+'</td><td class="For_Estimate text-danger" style="display: none;">'+Selected_Estimate+'</td><td class="Pay_Date">'+Pay_Date+'</td><td class="Pay_Description">'+Pay_Description+'</td><td class=""></td><td  class=""></td><td class=""><span></span></td><td class="Pay_Amount"> <span>'+$("#PayType").html()+Pay_Amount+'</span></td><td class=""></td><td class="For_Attach"><input type="button" value="Attach" class="btn btn-sm btn-light text-secondary"></td><td class="Function_Key">'+Function_Key+'</td></tr>');
$("#Pay_No").html(Pay_No+1);
Sort_Row();
$("#Pay_Description").val("");
}
}else{
alert("Input Not Found!");
$("#Pay_Description").focus();
}
Fetch_Row(Selected_Party_Short);
}

function Add_Estimate(){
var Estimate_Sr_No = $("#Estimate_Sr_No").html();
var Estimate_Date = $("#Estimate_Date").val().split('-');
Estimate_Date = Estimate_Date[2]+"-"+Estimate_Date[1]+"-"+Estimate_Date[0];
if(Selected_Party_Short != "O"){
var E_No = $("#Selected_Estimate").val();
$("#Selected_Estimate").html("");
$("#Estimate").prepend('<tr id="E_'+Estimate_Sr_No+'" class="Estimate_Row '+Party+'"><td class="Estimate_No text-danger">'+Estimate_Sr_No+'</td><td class="Estimate_Party">'+Selected_Party_Short+'</td><td class="Estimate_Date">'+Estimate_Date+'</td><td class="EAmount"></td><td class="EBalance"></td><td class="Function_Key"><input type="button" class="btn btn-sm btn-primary" value="Open"></td></tr>');
$("#Main_Table .Attach").removeClass("E_"+E_No).addClass("E_"+Estimate_Sr_No);
$("#Main_Table .E_"+Estimate_Sr_No+" .For_Estimate").html(Estimate_Sr_No);
Estimate_list();
$('#Selected_Estimate option[value="'+Estimate_Sr_No+'"]').prop("selected", true);
Estimate_Selected();	
$("#Main_Table  .Attach").removeClass("Attach");
alert("Added "+Estimate_Sr_No+"."+Estimate_Date);
Estimate_Get_Id();
}else{
alert("Party Not Selected!");
}
}

function AtachToEstimate(){
var Attach_Sr_No = $("#Attach_Sr_No").val();
var Estimate_Date = $("#Estimate_Date").val().split('-');
Estimate_Date = Estimate_Date[2]+"-"+Estimate_Date[1]+"-"+Estimate_Date[0];
if(Selected_Party_Short != "O"){
var E_No = $("#Selected_Estimate").val();
alert(E_No)
$("#Selected_Estimate").html("");
$("#Main_Table .Attach").removeClass("E_"+E_No).addClass("E_"+Attach_Sr_No);
$("#Main_Table .E_"+Attach_Sr_No+" .For_Estimate").html(Attach_Sr_No);
Estimate_list();
$('#Selected_Estimate option[value="'+Attach_Sr_No+'"]').prop("selected", true);
Estimate_Selected();	
$("#Main_Table  .Attach").removeClass("Attach");
alert("Added "+Attach_Sr_No+"."+Estimate_Date);
$('#E_'+Attach_Sr_No+" .Function_Key input").trigger('click');
}else{
alert("Party Not Selected!");
}
}

function Estimate_list(){
$("#Estimate tr").hide();
Party = $("#Selected_Party").val();
var Partyforitem = Party;
if(Selected_Party_Short == "O"){
Partyforitem = "Estimate_Row";
}
$("#Estimate #E_0, #Estimate ."+Partyforitem).show();
$("#Selected_Estimate").html("");
var For_E_Party = "Estimate_Row";
if(Selected_Party_Short != "O"){
For_E_Party = Party;
}

$("#E_0").detach().prependTo("#Estimate");

$('#E_0, #Estimate .'+For_E_Party).each(function(){
var id = $(this).prop("id");
var Estimate_Sr_No = $("#"+id+" .Estimate_No").html();
var Estimate_Sname = $("#"+id+" .Estimate_Party").html();
var Estimate_Date = $("#"+id+" .Estimate_Date").html();
var Estimate_EAmount = $("#"+id+" .EBalance").html();
if(Estimate_EAmount != "0" || Estimate_Sr_No == "0"){
$("#Selected_Estimate").append('<option value="'+Estimate_Sr_No+'" >'+Estimate_Sr_No+' - '+Estimate_Sname+' - '+Estimate_Date+' - '+Estimate_EAmount+'</option>');
}
});
}


Estimate_Get_Id();
function Estimate_Get_Id(){
var id = $("#Estimate tr").length;
$(".Estimate_Sr_No").html(id);
}

function Estimate_Selected(){
	var Selected_Estimate = $("#Selected_Estimate").val();
	var Estimate_Sr_No = $("#E_"+Selected_Estimate+" .Estimate_No").html();
	var Estimate_Date = $("#E_"+Selected_Estimate+" .Estimate_Date").html();
	var Estimate_Party_Temp = $("#E_"+Selected_Estimate+" .Estimate_Party").html();
	
	if(Estimate_Party_Temp !== "Pending"){
	$('#Selected_Party option[value="P_'+Estimate_Party_Temp+'"]').prop("selected", true);
	Party_Selected()
	}
	$('#Selected_Estimate option[value="'+Estimate_Sr_No+'"]').prop("selected", true);
	if(Estimate_Sr_No == "0"){
	$(".Party_Detail, .Estimate_Detail").removeClass("d-flex").addClass("d-none");
	$("#Print_Button").hide();
	if(Select_Block == 0){
	Select_Block = 1;
	}else{
	Select_Block = 0;
	}
	if(Party == "All_Job"){
	$(".Party_Detail, #Add_New_Job").removeClass("d-flex").addClass("d-none");
	$(".For_Attach").hide();
	$(".For_Partys").show();
	$("#Attach_To").addClass("d-none");
	Selected_Party = "Maruthi Arts";
	}else{
	$(".Party_Detail, #Add_New_Job").addClass("d-flex").removeClass("d-none");
	$(".For_Partys").hide();
	$("#Attach_To").removeClass("d-none");
	}
	}else{
	$(".For_Partys").hide();
	$(".Party_Detail, .Estimate_Detail").addClass("d-flex").removeClass("d-none");
	$("#Print_Table .Estimate_Date_View").html(Estimate_Date);
	$("#Print_Table #Estimate_Selected").html(Estimate_Sr_No);
	Attach_Cancel();
	$("#Print_Button").show();
	}
	Fetch_Row(Selected_Party_Short);
	}

function Add_Items(){
var Items_Description = $("#Items_Description").val();
var Items_Rate = $("#Items_Rate").val();
var idn = $('#Items tr').length;
  $("#Items tr").each(function (){
  $(this).prop("id","Items_"+idn);
  idn--;
});

var id = $("#Items tr").length+1;
alert("Added "+id+" "+Items_Description+".");
$("#Items").append('<tr id="Items_'+id+'" class="Items_Row '+Party+'"><td class="Items_Description">'+Items_Description+'</td><td class="Items_Rate">'+Items_Rate+'</td><td class="Function_Key">'+Function_Key+'</td></tr>');
}


Items_list('All_Job');
function Items_list(ForParty){
$("#Items tr").hide();
Party = $("#Selected_Party").val();
var Partyforitem = Party;
if(Party == "All_Job"){
Partyforitem = "Items_Row";
}
$("#Items .Universal, #Items ."+Partyforitem).show();
$(".Items_list").html("");
$("#Items .Universal, #Items ."+Partyforitem).each(function(){
var id = $(this).prop("id");
var Items_Description = $("#"+id+" .Items_Description").html();
var Items_Rate = $("#"+id+" .Items_Rate").html();
$(".Items_list").append('<option value="'+id+'" >'+Items_Description+' - '+Items_Rate+'</option>');
});
}


function Add_Partys(){
var Party_Short_Name = $("#Party_Short_Name").val();
var Party_Full_Name = $("#Party_Full_Name").val();
var id = $("#Partys tr").length+1;
alert("Added "+id+" "+Party_Full_Name+".");
$("#Partys").append('<tr id="P_'+Party_Short_Name+'" class="Partys_Row P_'+Party_Short_Name+'"><td class="Party_Short_Name">'+Party_Short_Name+'</td><td class="Party_Full_Name">'+Party_Full_Name+'</td><td class="Function_Key">'+Function_Key+'</td></tr>');
Partys_list();
}

Partys_list();
function Partys_list(){
$(".Partys_List").html("");
$("#Partys .Partys_Row").each(function(){
var id = $(this).prop("id");
var Party_Short_Name = $("#"+id+" .Party_Short_Name").html();
var Party_Full_Name = $("#"+id+" .Party_Full_Name").html();
$(".Partys_List").append('<option value="'+id+'" >'+Party_Short_Name+' - '+Party_Full_Name+'</option>');
});}

Party_Selected();
function Party_Selected(){
Party = $("#Selected_Party").val();
Selected_Party = $("#"+Party+" .Party_Full_Name").html();
Selected_Party_Short = $("#"+Party+" .Party_Short_Name").html();
$(".Selected_Party").html(Selected_Party);
var Selected_Estimate = $("#Selected_Estimate").val();

Estimate_list();
Estimate_Selected();
Fetch_Row(Selected_Party_Short);
Items_list(Party);
}



function Fetch_Row(Selected_Party_Short){
$("#Print_Table #Job_Rows tr").detach().appendTo("#Database #Jobs");  
$("#Print_Table #Pay_Rows tr").detach().appendTo("#Database #Pays");  
var Selected_Estimate = $("#Selected_Estimate").val();
if(Selected_Party_Short != "O"){
$("#Database #Jobs .P_"+Selected_Party_Short+".E_"+Selected_Estimate).detach().appendTo("#Print_Table #Job_Rows");  
}else{
$("#Database #Jobs .E_0").detach().appendTo("#Print_Table #Job_Rows");  
}
if(Selected_Party_Short != "O"){
$("#Database #Pays .P_"+Selected_Party_Short+".E_"+Selected_Estimate).detach().appendTo("#Print_Table #Pay_Rows");  
}else{
$("#Database #Pays .E_0").detach().appendTo("#Print_Table #Pay_Rows");  
}
//alert("#Database #Pays .P_"+Selected_Party_Short+".E_"+Selected_Estimate)
TotalCount();
Sort_Row();
}

TotalCount();
function TotalCount(){
var Selected_Estimate = $("#Selected_Estimate").val();
var TotalQty = 0;
var TotalAmount = 0;
$("#Print_Table #Job_Rows .Job_Row").each(function () {
if($(this).css('display') != 'none'){
var Qty = parseInt($(this).find(".Job_Quantity").html());
TotalQty += Qty;
var Amount = $(this).find(".Job_Amount span").html();
TotalAmount += 1*Amount;
}});
$("#Print_Table #G_Total_Q").html(TotalQty);
$("#Print_Table #G_Total_A span,#E_"+Selected_Estimate+" .EAmount").html(TotalAmount);

$("#Print_Table #Pay_Rows .Pay_Row").each(function () {
if($(this).css('display') != 'none'){
var PayAmount = $(this).find(".Pay_Amount span").html();
TotalAmount += 1*PayAmount;
}});
$("#Print_Table #Amount_TO_Be_Paid span,#E_"+Selected_Estimate+" .EBalance").html(parseInt(TotalAmount));
TotalAmount = 0;
$("#Estimate tr").each(function () {
if($(this).css('display') != 'none'){
var Amount = $(this).find(".EAmount").html();
TotalAmount += 1*Amount;
}});
$("#OverallAmont").html(parseInt(TotalAmount));
TotalAmount = 0;
$("#Estimate tr").each(function () {
if($(this).css('display') != 'none'){
var Amount = $(this).find(".EBalance").html();
TotalAmount += 1*Amount;
}});
$("#BalanceAmount").html(parseInt(TotalAmount));

$("#collectedAmount").html($("#OverallAmont").html()-$("#BalanceAmount").html());

DistictValue();
}

$("tr").show();

function Search_Row(Table,searchInput){
	var SearchIn = "";
	if(Table == "Job_Rows"){
    SearchIn = $("#Selected_Search").val();
	}
    var value = $("#"+searchInput).val().toLowerCase();
	value = $.trim(value);
	if(SearchIn != ""){
    $("#"+Table+" tr").filter(function() {
      $(this).toggle($(this).find("."+SearchIn).text().toLowerCase().indexOf(value) > -1)
    });
	}else{
    $("#"+Table+" tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
	}
	TotalCount();
}


  
  $(".Job_Row .EditRow").click(function(){
    var id = $(this).closest("tr").prop("id");
	var Description = $("#"+id+" .Job_Description").html();
	$("#"+id+" .Job_Description").html("<input type='text' value='"+Description+"' style='width:100%;'>");
	var Size = $("#"+id+" .Job_Size").html();
	$("#"+id+" .Job_Size").html("<input type='text' value='"+Size+"' style='width:100%;'>");
	var Qty = $("#"+id+" .Job_Quantity").html();
	$("#"+id+" .Job_Quantity").html("<input type='text' value='"+Qty+"' style='width:100%;'>");
	var Rate = $("#"+id+" .Job_Rate span").html();
	$("#"+id+" .Job_Rate span").html("<input type='text' value='"+Rate+"' style='width:75%;'>");
	var Date = $("#"+id+" .Job_Date").html().split("-");
	var JobDate = Date[2]+"-"+Date[1]+"-"+Date[0];
	$("#"+id+" .Job_Date").html("<input type='Date' value='"+JobDate+"' style='width:100%;'>");
	var Amount = (Qty*Rate);
    $("#"+id+" .CancelEdit, #"+id+" .UpdateRow").show();
    $("#"+id+" .EditRow, #"+id+" .DeleteRow").hide();
    $("#"+id+"").css("background-color","lightgray");
  });
  
   $(".Job_Row .UpdateRow").click(function(){
    var id = $(this).closest("tr").prop("id");
	var Description = $("#"+id+" .Job_Description input").val();
	$("#"+id+" .Job_Description").html(Description);
	var Size = $("#"+id+" .Job_Size input").val();
	$("#"+id+" .Job_Size").html(Size);
	var Qty = $("#"+id+" .Job_Quantity input").val();
	$("#"+id+" .Job_Quantity").html(Qty);
	var Rate = $("#"+id+" .Job_Rate span input").val();
	$("#"+id+" .Job_Rate span").html(Rate);
	var Date = $("#"+id+" .Job_Date input").val().split("-");
	var JobDate = Date[2]+"-"+Date[1]+"-"+Date[0];
	$("#"+id+" .Job_Date").html(JobDate);
	var Amount = (Qty*Rate);
	$("#"+id+" .Job_Amount span").html(Amount);
    $("#"+id+" .CancelEdit, #"+id+" .UpdateRow").hide();
    $("#"+id+" .EditRow, #"+id+" .DeleteRow").show();
    $("#"+id+"").css("background-color","");
	TotalCount();
	Sort_Row();
  });
  
  $(".CancelEdit").click(function(){
     
  });
  
  
    $(".Pay_Row .EditRow").click(function(){
    var id = $(this).closest("tr").prop("id");
	var Description = $("#"+id+" .Pay_Description").html();
	$("#"+id+" .Pay_Description").html("<input type='text' value='"+Description+"' style='width:100%;'>");
	var Date = $("#"+id+" .Pay_Date").html().split("-");
	var JobDate = Date[2]+"-"+Date[1]+"-"+Date[0];
	$("#"+id+" .Pay_Date").html("<input type='date' value='"+JobDate+"' style='width:100%;'>");
	var Amount = $("#"+id+" .Pay_Amount span").html();
	$("#"+id+" .Pay_Amount span").html("<input type='number' value='"+Amount+"' style='width:85%;'>");
    $("#"+id+" .CancelEdit, #"+id+" .UpdateRow").show();
    $("#"+id+" .EditRow, #"+id+" .DeleteRow").hide();
    $("#"+id+"").css("background-color","lightgray");
  });
  
   $(".Pay_Row  .UpdateRow").click(function(){
    var id = $(this).closest("tr").prop("id");
	var Description = $("#"+id+" .Pay_Description input").val();
	$("#"+id+" .Pay_Description").html(Description);
	var Date = $("#"+id+" .Pay_Date input").val().split("-");
	var JobDate = Date[2]+"-"+Date[1]+"-"+Date[0];
	$("#"+id+" .Pay_Date").html(JobDate);
	var Amount = $("#"+id+" .Pay_Amount input").val();
	$("#"+id+" .Pay_Amount span").html(Amount);
    $("#"+id+" .CancelEdit, #"+id+" .UpdateRow").hide();
    $("#"+id+" .EditRow, #"+id+" .DeleteRow").show();
    $("#"+id+"").css("background-color","");
	TotalCount();
	Sort_Row();
  });
  
$(".Job_Status input").click(function(){
if($(this).hasClass("text-secondary")){
$(this).removeClass("text-secondary").addClass("text-primary");
}else{
if($(this).hasClass("text-primary")){
$(this).removeClass("text-primary").addClass("text-success");
}else{
if($(this).hasClass("text-success")){
$(this).removeClass("text-success").addClass("text-secondary");
}
}
}
});  
  
  
$(".Job_Row .For_Attach input, .Pay_Row .For_Attach input").click(function(){
if($(this).hasClass("btn-primary")){
$(this).removeClass("btn-primary").addClass("btn-light text-secondary");
$(this).closest("tr").removeClass("Attach");
}else{
$(this).removeClass("btn-light text-secondary").addClass("btn-primary");
$(this).closest("tr").addClass("Attach");
}
});  

function Attach_To(){
$(".For_Attach").show();
$("#Attach_To").hide();
$("#Attach_Function, #create_estimate").removeClass("d-none");
}  

Attach_Cancel();
function Attach_Cancel(){
$(".For_Attach").hide();
$("#Attach_To").show();
$("#Attach_Function, #create_estimate").addClass("d-none");
$("#Main_Table .For_Attach > input").removeClass("btn-primary").addClass("btn-light text-secondary");
$("#Main_Table .E_0").removeClass("Attach");
}

function Attach_For(){
if($("#Attach_All").hasClass("btn-primary")){
$("#Job_Rows tr, #Pay_Rows tr").each(function(){
if($(this).is(":visible")){
$(this).find(".For_Attach > input").removeClass("btn-primary").addClass("btn-light text-secondary");
$(this).removeClass("Attach");
$("#Attach_All").removeClass("btn-primary").addClass("btn-light text-secondary");
}
});
}else{
$("#Job_Rows tr, #Pay_Rows tr").each(function(){
if($(this).is(":visible")){
$(this).find(".For_Attach input").removeClass("btn-light text-secondary").addClass("btn-primary");
$(this).addClass("Attach");
$("#Attach_All").removeClass("btn-light text-secondary").addClass("btn-primary");
}
});
}
}

  
Sort_Row();
function Sort_Row(){
var $tbody = $('#Job_Rows');
$tbody.find('tr').sort(function(a, b) {
  var tda = $(a).find('.Job_Date').text().split("-");
  var tdb = $(b).find('.Job_Date').text().split("-");
  return tda[0] > tdb[0] ? -1
    : tda[0] < tdb[0] ? 1  
    : 0;
}).appendTo($tbody);

$tbody.find('tr').sort(function(a, b) {
  var tda = $(a).find('.Job_Date').text().split("-");
  var tdb = $(b).find('.Job_Date').text().split("-");
  return tda[1] > tdb[1] ? -1
    : tda[1] < tdb[1] ? 1  
    : 0;
}).appendTo($tbody);

$tbody.find('tr').sort(function(a, b) {
  var tda = $(a).find('.Job_Date').text().split("-");
  var tdb = $(b).find('.Job_Date').text().split("-");
  return tda[2] > tdb[2] ? -1
    : tda[2] < tdb[2] ? 1  
    : 0;
}).appendTo($tbody);
}

function Print_Estimate(){
var From_To = $("#From_To").html();
var Selected_Estimate = $("#Selected_Estimate").val();
var Estimate_Sr_No = $("#E_"+Selected_Estimate+" .Estimate_No").html();
var Estimate_Date = $("#E_"+Selected_Estimate+" .Estimate_Date").html();
var Estimate_Party_Temp = $("#E_"+Selected_Estimate+" .Estimate_Party").html();
var Estimate_Party = $("#Partys .P_"+Estimate_Party_Temp+" .Party_Full_Name").html();
$(".Function").hide();
var css = "<style>.Function_Key, .No_Print{display:none;} table{font-size:20px;}</style>";
var list = $("#Job_Rows").children('tr');
$("#Job_Rows").html(list.get().reverse())
var PrintData = $("#Print_Table").html();
var titleforprint = Estimate_Party+' E-'+Estimate_Sr_No+' '+Estimate_Date;
var newWin = window.open('','Print-Window');
newWin.document.open();
newWin.document.write('<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>'+titleforprint+'</title><link rel="stylesheet" href="./Maruthi Arts Estimate_files/estimate.css">'+css+'</head><body onload="window.print();" style=""><div> '+From_To+PrintData+'</div></body></html>'); newWin.document.close();
var list = $("#Job_Rows").children('tr');
$("#Job_Rows").html(list.get().reverse())
setTimeout(function(){newWin.close();},100);
}

function GetSrNo(){
  //var idn = 1;
  var idn = $('#Print_Table #Job_Rows tr').length;
  $("#Print_Table #Job_Rows tr").each(function (){
  $(this).find(".Job_Id").html(idn);
  idn--;
  });
  idn = 1;
  $("#Print_Table #Pay_Rows tr").each(function (){
  $(this).find(".Pay_Id").html(idn);
  idn++;
  });
  idn = 1;
  $("#StatisticsTable tr").each(function (){
  $(this).find(".ssrn").html(idn);
  idn++;
  });
}



        $('#nav-Job-tab').trigger('click');
document.addEventListener("keydown", function(event){
	
    if (event.altKey && event.key === 's'){ $("#Job_Search").focus(); }
    if (event.altKey && event.key === 'p'){ $("#Selected_Party").focus(); }
    if (event.altKey && event.key === 'e'){ event.preventDefault(); $("#Selected_Estimate").focus(); }
    if (event.altKey && event.key === 'p'){ $("#Selected_Party").focus(); }
	if (event.ctrlKey && event.key === 'p'){ Print_Estimate("current"); }
	if (event.ctrlKey && event.key === 's') { Clear_Model() }

	if (event.altKey && event.key === 'a'){
	if (Selected_Party_Short != "" && Selected_Party_Short != "O"){
        $('#Add_New_Job').trigger('click');
        $('#nav-Job-tab').trigger('click');
		setTimeout(() => {
		$("#Job_Description").focus()
		},1000)
		}
    }
});

function Clear_Model(){
$(".modal-backdrop").remove();
$("body").removeClass("modal-open");
$(".modal").css("display","none");
}

function GetAmount(){
var Qty = $("#Job_Quantity").val();
var Rate = $("#Job_Rate").val();
if(Qty != "" && Rate != ""){
var Amount = Qty*Rate;
$("#Job_Amount").val(Amount);
}else{
$("#Job_Amount").val("0");
}}

$("tbody .Job_Description,tbody .Party_Full_Name,tbody .Job_Size,tbody .Job_Quantity,tbody .Job_Rate,tbody .Items_Rate,tbody .Job_Date").dblclick(function(){
var rowid = $(this).closest("tr").attr("id");
var tdfor = $(this).attr("class");
var data = $(this).find("input").val()
var selspan = $(this);
var tyof = "text";
if(tdfor == "Job_Quantity"){
tyof = "number";
}
if(tdfor == "Job_Rate"){
tyof = "number";
var selspan = $(this).find("span");
}
if(data == undefined){
if(tdfor != "Job_Amount" && tdfor != "Job_Id"){
data = selspan.html();
selspan.html('<input type="'+tyof+'" placeholder="'+tdfor+'" value="'+data+'" style="width:80%;border:none;border-bottom:1px dotted gray;">');
}
}else{
selspan.html(data);
var Qty = $("#"+rowid+" .Job_Quantity").html();
var Rate = $("#"+rowid+" .Job_Rate span").html();
var Amount = Qty*Rate;
$("#"+rowid+" .Job_Amount span").html(Amount);
}
});


$("#Estimate tr .Function_Key input").click(function(){
var OpenParty = "P_"+$(this).closest("tr").find(".Estimate_Party").html();
var id = "E_"+$(this).closest("tr").find(".Estimate_No").html();
var Estimate_Sr_No = $("#"+id+" .Estimate_No").html();
var Estimate_Date = $("#"+id+" .Estimate_Date").html();
var Estimate_EAmount = $("#"+id+" .EBalance").html();
if(Estimate_EAmount == "0" && Estimate_Sr_No != "0"){
$("#Selected_Estimate").append('<option value="'+Estimate_Sr_No+'" >'+Estimate_Sr_No+' - '+Estimate_Date+' - '+Estimate_EAmount+'</option>');
}

if(OpenParty !== "P_Pending"){
$('#Selected_Party option[value="'+OpenParty+'"]').prop("selected", true);
Party_Selected();
}
$('#Selected_Estimate option[value="'+Estimate_Sr_No+'"]').prop("selected", true);
Estimate_Selected();
});


function OverAllDistictValue(){
	
var uniqueItems = [];
var AllItems = [];
$("#Statistics tbody").html("")
  $('#Job_Rows td[class="Job_Size"],#Jobs td[class="Job_Size"]')
    .filter(function(index, element){
      if($.inArray($(element).text().toLowerCase(), uniqueItems) === -1) {
        uniqueItems.push($(element).text().toLowerCase());
      }else{
        $(element).parent();
      }
    });
	$('#Job_Rows td[class="Job_Size"],#Jobs td[class="Job_Size"]').each(function(){
        AllItems.push($(this).text().toLowerCase());
      });
	var srn = "0";
	var GTotalPcs = 0;
	var OrdTotal = 0;
	var GtotalAmount = 0;
	uniqueItems.forEach(function(){
	var Ratefeedback = "";
	var TotalPcs = 0;
	var Amount = 0;
	var UniqueSize = uniqueItems.length;
	var AllItemscount = AllItems.length;
	
	function checkAge(sizes){
	return sizes == uniqueItems[srn];
	}
    myFunction()
	function myFunction() {
	var Rate = 0;
	Amount = 0;
	$("#Job_Rows tr,#Jobs tr").each(function(){
	var checksize = $(this).find(".Job_Size").text().toLowerCase();
	if(checksize == uniqueItems[srn]){
	var jobpcs = parseInt($(this).find(".Job_Quantity").html());	
	TotalPcs += jobpcs;
	if($(this).find(".Job_Rate").text() != Rate && Rate != "0"){
	Ratefeedback = "text-danger";
	}
	Rate = $(this).find(".Job_Rate").text();
	//Amount += Rate*jobpcs;
	Amount = Rate*TotalPcs;
	}
	});
	$("#Statistics tbody").append("<tr><td class='ssrn'></td><td>"+uniqueItems[srn]+"</td><td class='TOrders'>"+AllItems.filter(checkAge).length+"</td><td class='pcs'>"+TotalPcs+"</td><td class='"+Ratefeedback+"'>"+Rate+"</td><td>"+Amount+"</td></tr>");

	}
		GtotalAmount += Amount;
		GTotalPcs += TotalPcs;
	OrdTotal += AllItems.filter(checkAge).length;
	$("#OrderCount").html(OrdTotal);
	$("#PcsCount").html(GTotalPcs);
	$("#AmountCount").html(GtotalAmount);
	srn++;
	}
	);
	
	var tbody = $('#StatisticsTable');
	tbody.find('tr').sort(function(a, b) {
	var tda = parseInt($(a).find('.pcs').text());
	var tdb = parseInt($(b).find('.pcs').text());
	return tda > tdb ? -1
	: tda < tdb ? 1
	: 0;
	}).appendTo(tbody);
	GetSrNo()
}

const dropZone = document.getElementById('View_Jobs');
const fileInput = document.getElementById('job_file');

dropZone.addEventListener('dragover', (event) => {
	event.preventDefault();
	dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
	dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
	event.preventDefault();
	dropZone.classList.remove('dragover');
console.log(event.dataTransfer.files[0])
	const file = event.dataTransfer.files[0];
	if (file) {
		fileInput.files = event.dataTransfer.files;
		updateDescription(file);
	}
});

function getFileName(event) {
	const file = event.target.files[0];
	if (file) {
		updateDescription(file);
	}
}

function updateDescription(file) {
	$("#Job_Description").val(file.name.split(".")[0]);
	$("#Job_Items").focus()
}


function deleteJob(){
TotalCount();
TotalCount();
var restoreScript = "$(this).closest('tr').detach().appendTo('#Jobs'); restoreJob()";
$("#Recycle_Jobs .Job_Row .Function_Key").html('<button class="restoreJob btn btn-sm btn-primary" onclick="'+restoreScript+'">Restore</button>');
Fetch_Row(Selected_Party_Short);
}

function restoreJob(){
TotalCount();
TotalCount();
$("#Jobs .Job_Row .Function_Key").html('<button class="deleteJob btn btn-sm btn-danger" onclick="'+deleteScript+'">Delete</button>');
Fetch_Row(Selected_Party_Short);
}
	$("#Database table tbody").hide()
function RecycleBin(){
	$("#Recycle_Jobs").toggle()
}

function clearData(){
	$("tr.Job_Row, #Estimate tr:not(#E_0)").detach()
	$("#Pay_No, #Job_No, #Estimate_Sr_No ").html(1)
}