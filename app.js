// ======================================
// آزمون خودارزیابی رفتارهای سمی
// نسخه نهایی
// ======================================


// ---------- عناصر صفحه ----------

const startPage = document.getElementById("startPage");
const examPage = document.getElementById("examPage");
const resultPage = document.getElementById("resultPage");

const startBtn = document.getElementById("startBtn");
const fullName = document.getElementById("fullName");

const userName = document.getElementById("userName");

const questionContainer = document.getElementById("questions");

const form = document.getElementById("testForm");

const resultName = document.getElementById("resultName");
const resultDate = document.getElementById("resultDate");

const totalScore = document.getElementById("totalScore");

const interpretation =
document.getElementById("interpretation");


const scores = [

document.getElementById("score1"),

document.getElementById("score2"),

document.getElementById("score3"),

document.getElementById("score4"),

document.getElementById("score5"),

document.getElementById("score6")

];



// ---------- فعال شدن دکمه ----------

fullName.addEventListener("input",()=>{

startBtn.disabled =
fullName.value.trim()==="";

});



// ---------- شروع آزمون ----------

startBtn.addEventListener("click",()=>{

const name = fullName.value.trim();

if(name===""){

alert("نام خود را وارد کنید.");

return;

}

userName.innerHTML =
"<b>آزمون‌دهنده:</b> "+name;

startPage.style.display="none";

examPage.style.display="block";

examPage.classList.add("fadeIn");

window.scrollTo({

top:0,

behavior:"smooth"

});

});



// ---------- تولید سوالات ----------

questions.forEach(q=>{

const question =
document.createElement("div");

question.className="question";

const title =
document.createElement("h3");

title.textContent=
q.id+"- "+q.text;

question.appendChild(title);


const options =
document.createElement("div");

options.className="options";


choices.forEach((choice,index)=>{

const label=
document.createElement("label");

const radio=
document.createElement("input");

radio.type="radio";

radio.name="q"+q.id;

radio.value=index+1;

radio.required=true;

label.appendChild(radio);

label.append(choice);

options.appendChild(label);

});

question.appendChild(options);

questionContainer.appendChild(question);

});

// ======================================
// محاسبه نمرات
// ======================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let total = 0;

    let subScale = [0, 0, 0, 0, 0, 0];

    // بررسی پاسخ همه سؤالات
    for (const q of questions) {

        const selected = document.querySelector(
            `input[name="q${q.id}"]:checked`
        );

        if (!selected) {

            alert("لطفاً به همه سؤالات پاسخ دهید.");

            return;

        }

        let value = parseInt(selected.value);

        // اصلاح سؤال معکوس
        if (q.reverse) {

            value = 6 - value;

        }

        total += value;

        subScale[q.scale - 1] += value;

    }


    // ======================
    // نمایش نمرات
    // ======================

    totalScore.textContent = total;

    for (let i = 0; i < 6; i++) {

        scores[i].textContent = subScale[i];

    }


    // ======================
    // نام و تاریخ
    // ======================

    const now = new Date();

    const dateString = now.toLocaleDateString("fa-IR");

    const timeString = now.toLocaleTimeString("fa-IR");

    resultName.textContent = fullName.value;

    resultDate.textContent =
        dateString + "   ساعت " + timeString;


    // ======================
    // تفسیر نتیجه
    // ======================

    if (total <= 47) {

        interpretation.innerHTML =

        "<b>رفتارهای سمی بسیار کم</b><br><br>" +

        "نتیجه نشان می‌دهد که در بیشتر موقعیت‌ها " +

        "احتمالاً مسئولیت‌پذیری، احترام به دیگران " +

        "و همدلی را حفظ می‌کنید. " +

        "البته هیچ فردی کاملاً بدون رفتار ناسالم نیست.";

    }

    else if (total <= 71) {

        interpretation.innerHTML =

        "<b>رفتارهای سمی خفیف</b><br><br>" +

        "گاهی برخی الگوهای رفتاری شما ممکن است " +

        "باعث ایجاد تنش در روابط شود، اما این الگوها " +

        "احتمالاً فراگیر و پایدار نیستند.";

    }

    else if (total <= 95) {

        interpretation.innerHTML =

        "<b>رفتارهای سمی متوسط</b><br><br>" +

        "برخی رفتارهای ارتباطی شما می‌تواند " +

        "به طور قابل توجهی بر کیفیت روابط اثر بگذارد. " +

        "خودآگاهی و تمرین مهارت‌های ارتباطی مفید خواهد بود.";

    }

    else {

        interpretation.innerHTML =

        "<b>رفتارهای سمی بالا</b><br><br>" +

        "نتیجه نشان می‌دهد که برخی الگوهای ناسالم " +

        "احتمالاً به صورت مکرر در روابط شما دیده می‌شوند. " +

        "این آزمون تشخیص روان‌شناختی نیست، اما می‌تواند " +

        "زمینه‌ای برای خودشناسی و تغییر باشد.";

    }

                          // ======================
    // آماده‌سازی داده‌ها
    // ======================

    const data = {

        name: fullName.value.trim(),

        total: total,

        scale1: subScale[0],

        scale2: subScale[1],

        scale3: subScale[2],

        scale4: subScale[3],

        scale5: subScale[4],

        scale6: subScale[5],

        date: dateString,

        time: timeString

    };


    // ======================
    // تکمیل فرم مخفی
    // ======================

    document.getElementById("f_name").value = data.name;

    document.getElementById("f_total").value = data.total;

    document.getElementById("f_scale1").value = data.scale1;

    document.getElementById("f_scale2").value = data.scale2;

    document.getElementById("f_scale3").value = data.scale3;

    document.getElementById("f_scale4").value = data.scale4;

    document.getElementById("f_scale5").value = data.scale5;

    document.getElementById("f_scale6").value = data.scale6;

    document.getElementById("f_date").value = data.date;

    document.getElementById("f_time").value = data.time;



    // ======================
    // ارسال به Google Sheets
    // ======================

    setTimeout(function(){

        document.getElementById("saveForm").submit();

    },300);



    // ======================
    // نمایش صفحه نتیجه
    // ======================

    examPage.style.display = "none";

    resultPage.style.display = "block";

    resultPage.classList.add("fadeIn");


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

                          // ======================
    // جلوگیری از ارسال مجدد
    // ======================

    const submitButton = form.querySelector("button[type='submit']");

    submitButton.disabled = true;

    submitButton.textContent = "نتیجه محاسبه شد";

});



// ======================================
// جلوگیری از ارسال فرم با Enter
// ======================================

document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        if(document.activeElement.tagName!=="TEXTAREA"){

            e.preventDefault();

        }

    }

});



// ======================================
// پایان برنامه
// ======================================
