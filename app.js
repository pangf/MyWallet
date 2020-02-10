// get current month
function getCurrentTime() {
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
}



// BUDGET CONTROLLER
var budgetController = (function () {
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.caculatePercentage = function (totalIncome) {

		if (totalIncome > 0) {
			this.percentages = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}

	};
	Expense.prototype.getPercentage = function () {
		return this.percentages;

	};


	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var caculateTotal = function (type) {
		var sum = 0;
		data.allItems[type].forEach(function (current) {
			sum = sum + current.value;
			console.log(sum);
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentages: -1
	};

	return {
		addItem: function (type, des, val) {
			var newItem, ID;

			//[1 2 3 4 5], next ID = 6
			//[1 2 4 6 8], next ID = 9
			// ID = last ID + 1

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}


			// Create new item based on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		deleteItem: function (type, id) {
			let ids, index;
			ids = data.allItems[type].map(function (current) {
				return current.id;

			});
			index = ids.indexOf(id);
			if (index !== -1) {
				data.allItems[type].splice(index, 1);

			}

		},
		caculateBudget: function () {
			//total incomes and expense
			caculateTotal('exp');
			caculateTotal('inc');
			//budget :income-expenses
			data.budget = data.totals.inc - data.totals.exp;
			//caculate % spend/incomes
			if (data.totals.inc > 0) {
				data.percentages = Math.round(data.totals.exp / data.totals.inc * 100);
			} else {
				data.percentages = -1;
			}
		},
		caculatePercentages: function () {
			data.allItems.exp.forEach(function (current) {
				current.caculatePercentage(data.totals.inc);

			});

		},
		getPercentage: function () {

			let allPercentages = data.allItems.exp.map(function (current) {
				return current.getPercentage();
			});
			return allPercentages;
		},
		getBudget: function () {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentages: data.percentages
			};
		},
		testing: function () {
			console.log(data);
		}
	};
})();

// UI CONTROLLER
var UIController = (function () {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',

	};


	var formatNumber = function (num, type) {
		/*
		  -/+ :type
		  exactly decimal points
		  1000=>+1,000

		*/
		var numSplit, numInt, numDec, type;
		num = Math.abs(num);
		//  exactly decimal points
		num = num.toFixed(2);

		//divide 200.11=>200 11
		numSplit = num.split(".");

		numInt = numSplit[0];
		//add , if num>=100
		if (numInt.length > 3) {
			numInt = numInt.substring(0, numInt.length - 3) + ',' + numInt.substring(numInt.length - 3, numInt.length);

		}

		numDec = numSplit[1];

		return (type === "inc" ? "+" : "-") + " " + numInt + "." + numDec;


	};
	var nodeListForEach = function (list, callback) {
		for (var i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	};

	return {
		getInput: function () {
			return {
				type: $(DOMstrings.inputType).val(),
				value: parseFloat($(DOMstrings.inputValue).val()),
				description: $(DOMstrings.inputDescription).val()
			};
		},

		addListItem: function (obj, type) {
			var html, newHtml, element;
			// Create HTML string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;

				html =
					'<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;

				html =
					'<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// Insert the HTML into the DOM
			$(element).append(newHtml);
		},

		deleteListItem: function (selectID) {
			//get element parent and delete child
			let element = document.getElementById(selectID);
			element.parentNode.removeChild(element);

		},

		clearFields: function () {
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			console.log(fields);

			fieldsArr = Array.prototype.slice.call(fields);
			console.log(fieldsArr);

			fieldsArr.forEach(function (current, index, array) {
				current.value = '';
			});
			//change focus
			fieldsArr[0].focus();
		},
		displayBudget: function (obj) {

			var type = obj.budget > 0 ? type = "inc" : type = "exp";
			$(DOMstrings.budgetLabel).html(formatNumber(obj.budget, type));
			$(DOMstrings.incomeLabel).html(formatNumber(obj.totalInc, type));
			$(DOMstrings.expensesLabel).html(formatNumber(obj.totalExp, type));
			if (obj.percentages > 0) {
				$(DOMstrings.percentageLabel).html(obj.percentages + "%");
			} else {
				$(DOMstrings.percentageLabel).html('---');
			}
		},
		displayPercentage: function (percentages) {
			let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
			console.log(fields);
			//let fields=$(DOMstrings.expensesPercLabel);

			nodeListForEach(fields, function (current, index) {
				if (percentages[index] > 0) {
					$(current).html(percentages[index] + '%');
				} else {
					$(current).html('---');
				}

			});



		},
		changedType: function () {

			var fields=document.querySelectorAll(
				DOMstrings.inputType+','+
				DOMstrings.inputDescription+","+
				DOMstrings.inputValue
			);
			nodeListForEach(fields,function(current){
				current.classList.toggle("blue-focus");
				console.log("test");
			});
			$(DOMstrings.inputBtn).toggleClass("blue");
		},

		getDOMstrings: function () {
			return DOMstrings;
		}
	};
})();




// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});

		$(".container").click(function ctrlDeleteItem(e) {

			let splitId, type, itemId, ID;
			itemId = e.target.closest(".item").id;
			if (itemId) {
				//inc-1 into type:inc; ID:1;
				splitId = itemId.split("-");
				type = splitId[0];
				// ID is a string, convert into int 
				ID = parseInt(splitId[1]);
				//delete item form data structure
				budgetCtrl.deleteItem(type, ID);
				//delete item on UI
				UICtrl.deleteListItem(itemId);
				//update show totals
				updateBudget();
				//calculate and update percentage
				updatePercentage();
			}
		});
		//$(DOM.inputType).change(UICtrl.changedType);

		 document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
	};
	//
	var updateBudget = function () {
		// Calculate and update budget
		budgetCtrl.caculateBudget();
		//return budget
		var budget = budgetCtrl.getBudget();
		//	display percentages and budget
		UICtrl.displayBudget(budget);
	};

	var updatePercentage = function () {

		//calculate percentage
		budgetCtrl.caculatePercentages();
		//read percentage form budgetControllor
		let percent = budgetCtrl.getPercentage();
		console.log(percent);
		//display on UI
		UICtrl.displayPercentage(percent);
	};



	var ctrlAddItem = function () {
		var input, newItem;

		// 1. Get the field input data
		input = UICtrl.getInput();
		//description not null,value is a n=b=number and value>0
		if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the fields

			UICtrl.clearFields();
			//5. caculate Budget
			updateBudget();
			//6. caculate and update percentage
			updatePercentage();
		}
	};
	return {
		init: function () {
			console.log('Application has started.');
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentages: 0
			});

			setupEventListeners();
			getCurrentTime();

		}
	};
})(budgetController, UIController);

controller.init();