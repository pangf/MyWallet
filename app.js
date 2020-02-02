// get current month
let month = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthArr = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'Novenber',
	'December'
];
$('.budget__title--month').html(monthArr[month] + ' ' + currentYear);

//budgetController
var budgetController = (function() {
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;

    };
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;

    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    };
    return {
        addItem: function(type,des,val){

            var newItem,ID;
            var objLength=data.allItems[type].length;
            console.log("length"+objLength);
            
            if (objLength>0){
                ID= data.allItems[type][objLength-1].id+1;
                console.log("id"+ID);
            }else{
                ID=0;
            }
            if(type==="exp"){
                newItem=new Expense(ID,des,val);
                console.log(newItem);

            }else{
                newItem= new Income(ID,des,val);
                console.log(newItem);
            }
          data.allItems[type].push(newItem);
          console.log(data.allItems[type].length);
          
          return newItem;
          

            

        }
    }
    

})();




//UI controller
var UIController = (function() {
	//easy for enhance
	var DomStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return {
		getInput: function() {
			//return object makesure function can be used outside of the scorpe
			return {
				type: $(DomStrings.inputType).val(),
				value: $(DomStrings.inputValue).val(),
				description: $(DomStrings.inputDescription).val()
			};
		},
		getDomStrings: function() {
			// makesure function can be used outside of the scorpe
			return DomStrings;
		}
	};
})();

//global app controller
var controller = (function(bugetCtrl, UICtrl) {
	var setupEventListeners = function() {
		var Dom = UICtrl.getDomStrings();
		// jquery with callback
		$(Dom.inputBtn).click(ctrlAddItem);
		$(document).keypress(function(e) {
			//type enter button
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		//get input data
        var input,newItem;
		input = UIController.getInput();
		console.log(input);
		//add item to bugetcontroller
		newItem = budgetController.addItem(input.type, input.description, input.value);
        console.log(newItem);
		//add item to interface
		//caculate budget
		//display budget on homepage
		
	};

	return {
		init: function() {
			setupEventListeners();
			console.log('app statrt');
		}
	};
})(budgetController, UIController);

controller.init();
