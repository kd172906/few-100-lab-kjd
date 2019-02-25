import './styles.css';

const BillAmount = document.getElementById("billAmount") as HTMLInputElement;
const tipButton = document.getElementById('setTip');
const tipConfirm = document.getElementById('tipConfirm');
var billAmtTxt = document.getElementById("list-bill-amt");
var tipPctTxt = document.getElementById("list-tip-pct");
var tipAmtTxt = document.getElementById("list-tip-amt");
var totalTxt = document.getElementById("list-total");
let d = document.getElementById('setTip');


function CalculateTip(t: any, b: any) {
    let tip = t / 100;
    return (b * tip);
}


d.querySelectorAll('button').forEach(b => b.addEventListener('click', function () {
    let bill = Number(BillAmount.value);
    let tipTotal = CalculateTip(this.value, bill);
    let totalBill = tipTotal + bill;
    tipConfirm.innerText = "You are tipping " + this.value + "%";
    billAmtTxt.textContent = "Bill Amount: $" + bill;
    tipPctTxt.textContent = "Tip Percentage: " + this.value + "%";
    tipAmtTxt.textContent = "Amount of tip: $" + Math.round(Number(tipTotal) * 100) / 100;
    totalTxt.textContent = "Total to be Paid: $" + Math.round(Number(totalBill) * 100) / 100;
}))

