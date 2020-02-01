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
    //easy for enhance
    let DomStrings={
        inputType:'add__type',
        inputDescription:'add__description',
        inputValue:'dd__value'
    };

    return {
        getInput:function(){
            //return object makesure function can be used outside of the scorpe
            return{
                 type : $(DomStrings.inputType).val(),
                 value :$(DomStrings.inputValue).val(),
                description : $(DomStrings.item__description).val()
            };

        
        },
        getDomStrings:function(){
            // makesure function can be used outside of the scorpe
            return DomStrings;

        
        },

    }
})();

//global app controller
let controller=(function(bugetCtrl,UICtrl){
    let Dom=UICtrl.getDomStrings;

   let ctrlAddItem=function(){
       //get input data
       let input=UIController.getInput();
       console.log(input);
        //add item to buget controller
        //add item to interface
        //caculate budget
        //display budget on homepage
        console.log("test!!!!!!1");
   }

// jquery with callback
    $(".add__btn").click(ctrlAddItem);

    $(document).keypress(function(e){
       //type enter button
        if (e.keyCode===13 || e.which===13){
            crlAddItem();
        }

    });
})(budgetController,UIController);