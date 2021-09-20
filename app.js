const bdayInput = document.querySelector("#bday");
const checkBtn = document.querySelector("#check");

const waitDiv = document.querySelector("#waiting");
const resultDiv = document.querySelector("#result");

const yesImg = document.querySelector("#img-yay");
const yesDiv = document.querySelector("#div-yay");

const noImg = document.querySelector("#img-nah");
const noDiv = document.querySelector("#div-nah");

const daySpan = document.querySelector("#span-days");
const warnRef = document.querySelector("#warn");

//---------------------------------------------------//

function checkPalindrome(birthdate) {

    let rev = birthdate.split('').reverse('').join('');
    return rev === birthdate;
}

function dateToStr(d) {

    let dd = "";
    if (d.getDate() < 10) {
        dd = "0" + String(d.getDate());
    } else {
        dd = String(d.getDate());
    }
    if (d.getMonth() < 9) {
        dd = dd + "0" + String(d.getMonth() + 1);
    } else {
        dd = dd + String(d.getMonth() + 1);
    }
    dd += String(d.getFullYear());
    return dd;
}

function nextPalindrome(dd, mm, yy) {

    dd = Number(dd);
    mm = Number(mm);
    yy = Number(yy);
    let d = new Date(yy, mm - 1, dd);
    while (!checkPalindrome(dateToStr(d))) {

        d.setDate(d.getDate() + 1);
    }
    return d;
}


function setDisplay(refs, val) {

    refs.forEach(ref => {
        ref.style.display = val;
    });
}


function clickEventHandler() {

    setDisplay([resultDiv], "none");
    let str = bdayInput.value;

    if (str == "") {
        setDisplay([warnRef], "block");
    } else {

        setDisplay([warnRef], "none");
        setDisplay([waitDiv], "block");

        setTimeout(function () {
            setDisplay([waitDiv], "none");
            str = str.split("-");

            let yy = str[0];
            let mm = str[1];
            let dd = str[2];

            let res = checkPalindrome(dd + mm + yy);
            if (!res) {
                res = checkPalindrome(mm + dd + yy);
            }
            if (!res) {
                res = checkPalindrome(yy + mm + dd);
            }

            if (res) {
                setDisplay([resultDiv, noDiv, noImg], "none");
                setDisplay([resultDiv, yesDiv, yesImg], "block");

            } else {

                setDisplay([resultDiv, yesDiv, yesImg], "none");

                let newDate = nextPalindrome(dd, mm, yy);
                let thisDate = new Date(yy, mm - 1, dd);
                let diff = newDate.getTime() - thisDate.getTime();

                let diff_days = diff / (1000 * 3600 * 24);

                setDisplay([resultDiv, noDiv, noImg], "block");
                daySpan.innerText = diff_days;
            }
        }, 4000);

    }
}

checkBtn.addEventListener("click", clickEventHandler);