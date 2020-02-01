// get current month
let month=new Date().getMonth();
let currentYear=new Date().getFullYear();
const monthArr=['January','February','March','April','May','June','July','August','September','October','Novenber','December']
$(".budget__title--month").html(monthArr[month]+' '+currentYear);

//budgetController
let budgetController=(function() {


})();

//UI con
let UIController=(function(){

})();

//global app controller
let controller=(function(bugetCtrl,UICtrl){

   let crlAddItem=function(){
       //get input data
        //add item to buget controller
        //add item to interface
        //caculate budget
        //display budget on homepage
        console.log("test!!!!!!1");
   }

// jquery with callback
    $(".add__btn").click(crlAddItem);
    
    $(document).keypress(function(e){
       //type enter button
        if (e.keyCode===13 || e.which===13){
            crlAddItem();
        }

    });
})(budgetController,UIController);