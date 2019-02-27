import './styles.css';

const BillAmount = document.getElementById("billAmount") as HTMLInputElement;
BillAmount.value = "0";
const tipConfirm = document.getElementById('tipConfirm');
var billAmtTxt = document.getElementById("list-bill-amt");
var tipPctTxt = document.getElementById("list-tip-pct");
var tipAmtTxt = document.getElementById("list-tip-amt");
var totalTxt = document.getElementById("list-total");
const defaultTip: HTMLButtonElement = document.querySelector('button[value="20"]');
let tip: HTMLButtonElement = defaultTip;
defaultTip.click();
let d = document.getElementById('setTip');
let borderColor = BillAmount.style.borderColor;
let success = true;
let bill: number = 0;
let tipTotal: number = 0;
let totalBill: number = 0;


export function CalculateTip(t: any, b: any) {
    let tip = t / 100;
    return (b * tip);
}

function resetSummary() {
    tipConfirm.innerText = "";
    billAmtTxt.textContent = "";
    tipPctTxt.textContent = "";
    tipAmtTxt.textContent = "";
    totalTxt.textContent = "";
}

function setError(msg: string, divVisibility: string) {
    document.getElementById('error').innerText = msg;
    document.getElementById('showError').style.visibility = divVisibility;
}

function CalculateFinalBill() {
    if (!BillAmount.value) {
        setError('Dinner wasn\'t free', 'visible')
        BillAmount.style.borderColor = "red";
        resetSummary();
        success = false;
    }
    else if (Number(BillAmount.value) < 0) {
        setError('You should still tip if you pay with coupons, you cheapskate!', 'visible')
        BillAmount.style.borderColor = "red";
        resetSummary();
        success = false;
    }
    else {
        setError("", 'hidden');
        BillAmount.style.borderColor = borderColor;
        bill = Number(BillAmount.value);
        tipTotal = CalculateTip(Number(tip.value), bill);
        totalBill = tipTotal + bill;
        tipConfirm.innerText = "You are tipping " + tip.value + "%";
        billAmtTxt.textContent = "$" + bill.toFixed(2);
        tipPctTxt.textContent = "$" + tip.value + "%";
        tipAmtTxt.textContent = "$" + tipTotal.toFixed(2);
        totalTxt.textContent = "$" + totalBill.toFixed(2);
        success = true;
    }
}

BillAmount.addEventListener('keyup', function () {
    CalculateFinalBill();
});

const buttons = d.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', function () {
    tip = this;
    CalculateFinalBill()
    if (success) {
        buttons.forEach(x => x.disabled = false);
        b.disabled = true;
    }
}));

