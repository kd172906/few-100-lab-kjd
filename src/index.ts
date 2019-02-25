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


function CalculateTip(t: any, b: any) {
    let tip = t / 100;
    return (b * tip);
}

function resetSummary() {
    tipConfirm.innerText = "";
    billAmtTxt.textContent = "Bill Amount: ";
    tipPctTxt.textContent = "Tip Percentage: ";
    tipAmtTxt.textContent = "Amount of tip: ";
    totalTxt.textContent = "Total to be Paid: ";
}

function setError(msg: string) {
    document.getElementById('error').innerText = msg;
}

function CalculateFinalBill() {
    if (!BillAmount.value) {
        setError('Can\'t be empty')
        BillAmount.style.borderColor = "red";
        resetSummary();
        success = false;
    }
    else if (Number(BillAmount.value) < 0) {
        setError('You should still tip if you pay with coupons, you cheapskate!')
        BillAmount.style.borderColor = "red";
        resetSummary();
        success = false;
    }
    else {
        setError("");
        BillAmount.style.borderColor = borderColor;
        let bill = Number(BillAmount.value);
        let tipTotal = CalculateTip(Number(tip.value), bill);
        let totalBill = tipTotal + bill;
        tipConfirm.innerText = "You are tipping " + tip.value + "%";
        billAmtTxt.textContent = "Bill Amount: $" + bill.toFixed(2);
        tipPctTxt.textContent = "Tip Percentage: " + tip.value + "%";
        tipAmtTxt.textContent = "Amount of tip: $" + tipTotal.toFixed(2);
        totalTxt.textContent = "Total to be Paid: $" + totalBill.toFixed(2);
        success = true;
    }
}

BillAmount.addEventListener('keyup', function () {
    CalculateFinalBill();
})

const buttons = d.querySelectorAll('button');
buttons.forEach(b => b.addEventListener('click', function () {
    tip = this;
    CalculateFinalBill()
    if (success) {
        buttons.forEach(x => x.disabled = false);
        b.disabled = true;
    }
}))

