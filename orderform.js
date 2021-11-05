var pizzaTypes = [
    "Cheese",
    "Pepperoni",
    "Veggie",
    "BBQ Chicken",
    "Buffalo Chicken"
];

var pizzaPrices = [
    8.00,
    9.00,
    10.00,
    12.00,
    12.00
];

var pastaTypes = [
    "Plain",
    "Alfredo",
    "Spaghetti",
    "Angel Hair",
    "Rigatoni"
];

var pastaPrices = [
    5.00,
    8.00,
    7.00,
    5.00,
    6.00
];

var appTypes = [
    "Breadsticks",
    "Salad",
    "French Fries",
    "Onion Rings",
    "Chicken Wings",
];

var appPrices = [
    6.00,
    4.00,
    5.00,
    5.50,
    6.50
];

var drinkTypes = [
    "Water",
    "Coke",
    "Diet Coke",
    "Pepsi",
    "Diet Pepsi"
];

var drinkPrices = [
    2.00,
    2.50,
    2.50,
    2.25,
    2.25
];

function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
 }
 
 function buildMenu(itemNames, itemPrices) {
    var menuSelection = document.pizzaForm.menuSelection;
    for(var i = 0; i < itemNames.length; i++) {
        var name = itemNames[i];
        var price = itemPrices[i];
        var opt = document.createElement("option");
        var text = document.createTextNode(name + 
            " (" + formatUSCurrency(price) + ")");
        opt.appendChild(text);
        opt.menuItemName = name;
        opt.menuItemPrice = price;
        menuSelection.appendChild(opt);
    }
}
function handleMenuSelection() {
    var menuSelection = document.pizzaForm.menuSelection;
    var selected = menuSelection.selectedOptions;
    if (selected.length >= 1) {
        var opt = selected[0];
        console.log("Menu item selected: " + opt.menuItemName);
        console.log("Price of item selected: " + opt.menuItemPrice);
    } else {
        console.log("Nothing is selected");
    }
}
function calcTotal() {
    var list = document.getElementById("itemList");
    var total = 0;
    var tip = 0;
    var tax = 0;
    for(item of list.children) {
        total += item.itemPrice;
        tip += item.itemPrice * 0.10;
        tax += item.itemPrice * 0.0635;
    }
    document.getElementById("orderTotal").textContent = formatUSCurrency(total + tip + tax);
    document.getElementById("orderTip").textContent = formatUSCurrency(tip);
    document.getElementById("orderTax").textContent = formatUSCurrency(tax);
}
function addOrderDetail() {
    var menuSelection = document.pizzaForm.menuSelection;
    var selected = menuSelection.selectedOptions;
    if (selected.length >= 1) {
        var opt = selected[0];
        console.log("Menu item selected: " + opt.menuItemName);
        console.log("Price of item selected: " + opt.menuItemPrice);
        var qty = parseInt(document.pizzaForm.itemQty.value);
        var newItem = document.createElement("li");
        var price = qty * opt.menuItemPrice;
        newItem.textContent = opt.menuItemName + "(" + qty + ")  = " + price;
        newItem.itemPrice = price;
        newItem.addEventListener("click", function(){newItem.remove(); calcTotal();});
        var list = document.getElementById("itemList");
        list.append(newItem);
        calcTotal();
    } else {
        console.log("Nothing is selected");
    }
}

function changeMenu() {
    var menuSelection = document.pizzaForm.menuSelection;
    while(menuSelection.firstElementChild) {
        menuSelection.removeChild(menuSelection.firstElementChild);
    }
    if (document.pizzaForm.pizzaMenu.checked) {
        buildMenu(pizzaTypes, pizzaPrices);
    } else if  (document.pizzaForm.pastaMenu.checked)  {
        buildMenu(pastaTypes, pastaPrices);
    } else if (document.pizzaForm.appMenu.checked) {
        buildMenu(appTypes, appPrices);
    } else {
        buildMenu(drinkTypes,drinkPrices);
    }
}

window.addEventListener("load", function() {
    var menuSelection = document.pizzaForm.menuSelection;
    menuSelection.addEventListener("change", handleMenuSelection);
    document.pizzaForm.pizzaMenu.addEventListener("change", changeMenu);
    document.pizzaForm.pastaMenu.addEventListener("change", changeMenu);
    document.pizzaForm.appMenu.addEventListener("change", changeMenu);
    document.pizzaForm.drinkMenu.addEventListener("change", changeMenu);
    buildMenu(pizzaTypes, pizzaPrices);
    document.pizzaForm.addOrder.addEventListener("click", addOrderDetail);

    document.pizzaForm.custName.addEventListener("change", function(e) {
        document.getElementById("summaryCustName").textContent = 
        document.pizzaForm.custName.value;
   });
   document.pizzaForm.custPhone.addEventListener("change", function(e) {
        document.getElementById("summaryCustPhone").textContent =
        document.pizzaForm.custPhone.value;
   });
   document.pizzaForm.pTime.addEventListener("change", function(e) {
       document.getElementById("summaryPickupTime").textContent =
       document.pizzaForm.pTime.value;
   });
});
