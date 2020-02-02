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
let budgetController = (function() {
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let data = {
		allItems: {
			expense: [],
			income: []
		},
		totalItems: {
			expense: [],
			income: []
		}
	};
	return {
		addItem: function(type, des, val) {
			let newItem;
			let ID = 0;
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
				console.log(newItem);
			} else {
				newItem = new Income(ID, des, val);
				console.log(newItem);
            }
            data.allItems[type].push(item);
            return newItem;
		}
	};
})();

//UI controller
let UIController = (function() {
	//easy for enhance
	let DomStrings = {
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
let controller = (function(bugetCtrl, UICtrl) {
	let setupEventListeners = function() {
		let Dom = UICtrl.getDomStrings();
		// jquery with callback
		$(Dom.inputBtn).click(ctrlAddItem);
		$(document).keypress(function(e) {
			//type enter button
			if (e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
	};

	let ctrlAddItem = function() {
		//get input data
		let input = UIController.getInput();
		console.log(input);
		//add item to buget controller
		//add item to interface
		//caculate budget
		//display budget on homepage
		console.log('test!!!!!!1');
	};

	return {
		init: function() {
			setupEventListeners();
			console.log('test eventlistener!!');
		}
	};
})(budgetController, UIController);

controller.init();
