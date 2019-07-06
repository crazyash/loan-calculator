wDelta = 0;
kDelta = '';
var roughCount = 0;
/*FD Calculation*/
function calculateFD() {
	var P = document.getElementById('principleamount').value.replace(/,/g, "");
	var r = document.getElementById('interestrate').value;
	var tt = document.getElementById('tenureType').value;

	if (tt == 'm')
		var t = document.getElementById('tenure').value / 12;
	else
		var t = document.getElementById('tenure').value;

	console.log(t);
	var n = document.getElementById('frequency').value;
	console.log(n);
	var amount = P * Math.pow((1 + ((r / 100) / n)), n * t);
	amount = Math.round(amount);
	if (amount > 9999999999999999)
		amount = amount.toExponential();
	var interest = amount - P;
	if (interest > 9999999999999999)
		interest = interest.toExponential();
	document.getElementById('result').hidden = false;
	document.getElementById('result').innerHTML = "<table><tr><td>Maturity Amount</td><td>: Rs. " + amount.toLocaleString('en-IN') + "</td></tr><tr><td>Total Interest Earned</td><td>: Rs. " + interest.toLocaleString('en-IN') + "</td></tr></table>";
}

/*RD Calculation*/
function calculateRD() {
	var P = document.getElementById('installment').value.replace(/,/g, "");
	var r = document.getElementById('interestrate').value;
	var n = document.getElementById('frequency').value;
	var t = (document.getElementById('durationY').value * 12) + parseInt(document.getElementById('durationM').value);

	var amount = 0;
	for (var i = t; i >= 1; i--) {
		amount = amount + P * Math.pow(1 + ((r / 100) / n), n * i / 12);
	}

	amount = Math.round(amount);
	var interest = amount - (P * t);
	if (amount > 9999999999999999)
		amount = amount.toExponential();
	if (interest > 9999999999999999)
		interest = interest.toExponential();

	document.getElementById('rdresult').hidden = false;
	document.getElementById('rdresult').innerHTML = "<table><tr><td>Maturity Amount</td><td>: Rs. " + amount.toLocaleString('en-IN') + "</td></tr><tr><td>Total Interest Earned</td><td>: Rs. " + interest.toLocaleString('en-IN') + "</td></tr></table>";
}

/*SIP Calculation*/
function calculateSIP() {
	var P = document.getElementById('installment').value.replace(/,/g, "");
	var r = document.getElementById('interestrate').value;
	var n = 1;
	var t = (document.getElementById('durationY').value * 12) + parseInt(document.getElementById('durationM').value);

	var amount = 0;
	for (var i = t; i >= 1; i--) {
		amount = amount + P * Math.pow(1 + ((r / 100) / n), n * i / 12);
	}

	amount = Math.round(amount);
	var interest = amount - (P * t);
	if (amount > 9999999999999999)
		amount = amount.toExponential();
	if (interest > 9999999999999999)
		interest = interest.toExponential();

	document.getElementById('sipresult').hidden = false;
	document.getElementById('sipresult').innerHTML = "<table><tr><td>Maturity Amount</td><td>: Rs. " + amount.toLocaleString('en-IN') + "</td></tr><tr><td>Total Interest Earned</td><td>: Rs. " + interest.toLocaleString('en-IN') + "</td></tr></table>";
}

/*EMI Calculation*/
function calculateEMI() {
	var P = document.getElementById('loanAmount').value.replace(/,/g, "");
	var r = document.getElementById('interestrate').value / (12 * 100);
	var t = (document.getElementById('durationY').value * 12) + parseInt(document.getElementById('durationM').value);

	var amount = 0, total = 0;
	if (r > 0) {
		amount = (P * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
	}
	else if (r = 0) {
		amount = 0;
	}

	total = amount * t;
	amount = Math.ceil(amount);
	total = Math.ceil(total);
	var interest = total - P;

	if (amount > 9999999999999999)
		amount = amount.toExponential();
	if (interest > 9999999999999999)
		interest = interest.toExponential();
	if (total > 9999999999999999)
		total = total.toExponential();

	document.getElementById('emiresult').hidden = false;
	document.getElementById('emiresult').innerHTML = "<table><tr><td>EMI</td><td>: Rs. " + amount.toLocaleString('en-IN')
		+ "</td></tr><tr><td>Interest Payable</td><td>: Rs. " + interest.toLocaleString('en-IN')
		+ "</td></tr><tr><td>Total Payment<br/>(Principle+Interest)</td><td valign='top'>: Rs. " + total.toLocaleString('en-IN') + "</td></tr></table>";

}


function changeAmount(money, val) {
	var x = document.getElementById(money);
	console.log(x.value);
	var amount = parseInt(x.value.replace(/,/g, ""));

	if (!Number.isNaN(amount) && (amount >= 0) && (wDelta > 0))
		x.value = amount + val;
	if (!Number.isNaN(amount) && (amount >= 500) && (wDelta < 0))
		x.value = amount - val;
	if (Number.isNaN(amount) && (wDelta > 0)) x.value = 0;
	wDelta = 0;

	console.log(kDelta);
	if (!Number.isNaN(amount) && (amount >= 0) && (kDelta == 'ArrowUp'))
		x.value = amount + val;
	if (!Number.isNaN(amount) && (amount >= 500) && (kDelta == 'ArrowDown'))
		x.value = amount - val;
	if (Number.isNaN(amount) && (kDelta == 'ArrowUp')) x.value = 0;
	kDelta = '';

	toINR(money);
}

function roundoff(money) {
	var x = document.getElementById(money);
	var amount = parseInt(x.value.replace(/,/g, ""));
	var rem = amount % 500;
	var div = parseInt(amount / 500);
	console.log(rem);
	console.log(div);
	if (rem >= 250)
		x.value = 500 * (div + 1);
	else
		x.value = 500 * div;

	toINR(money);
}



function evalExpr(expr) {
	roughCount++;
	if (roughCount <= 10) {
		var res = eval(document.getElementById(expr).value);
		document.getElementById('expResult').hidden = false;
		document.getElementById('expResult').innerHTML = "<br>" + document.getElementById(expr).value + "=" + res + document.getElementById('expResult').innerHTML;
	}
}

window.addEventListener('mousewheel', function (e) {
	wDelta = e.wheelDelta;
	console.log(wDelta);
});

window.addEventListener('keyup', function (e) {
	kDelta = e.key;
});

function toINR(money) {
	var x = document.getElementById(money);
	var amount = parseInt(x.value.replace(/,/g, ""));
	if (!Number.isNaN(amount))
		x.value = amount.toLocaleString('en-IN');
}

function clearForm(id) {
	document.getElementById(id).hidden = "hidden";
	roughCount = 0;
	document.getElementById(id).innerHTML = '';
}


