const questionContainer = document.getElementById("questions");
const form = document.getElementById("testForm");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHcENx5RK2I-Sr1oIrJrvRG7fWYFbBvvAPmQKxz6QJwCn9QbwmM1SnSpL_x0zwghOI6w/exec";
const result = document.getElementById("result");

const totalScore = document.getElementById("totalScore");

const scores = [
    document.getElementById("score1"),
    document.getElementById("score2"),
    document.getElementById("score3"),
    document.getElementById("score4"),
    document.getElementById("score5"),
    document.getElementById("score6")
];


/* ---------- تولید سوالات ---------- */

questions.forEach(q => {

    const question = document.createElement("div");
    question.className = "question";

    const title = document.createElement("h3");
    title.textContent = `${q.id}. ${q.text}`;

    const options = document.createElement("div");
    options.className = "options";

    choices.forEach((choice, index) => {

        const label = document.createElement("label");

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "q" + q.id;
        radio.value = index + 1;
        radio.required = true;

        label.appendChild(radio);
        label.append(" " + choice);

        options.appendChild(label);

    });

    question.appendChild(title);
    question.appendChild(options);

    questionContainer.appendChild(question);

});



/* ---------- محاسبه ---------- */

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let total = 0;

    let subScale = [0, 0, 0, 0, 0, 0];


    for (const q of questions) {

        const selected = document.querySelector(
            `input[name="q${q.id}"]:checked`
        );

        if (!selected) {
            alert("لطفاً به تمام سوالات پاسخ دهید.");
            return;
        }

        let value = parseInt(selected.value);

        if (q.reverse) {
            value = 6 - value;
        }

        total += value;

        subScale[q.scale - 1] += value;

    }


    totalScore.textContent = total + " از 120";

    for (let i = 0; i < 6; i++) {

        scores[i].textContent = subScale[i] + " از 20";

    }

const interpretation = document.getElementById("interpretation");

if (total <= 47) {
    interpretation.innerHTML =
        "<b>رفتارهای سمی بسیار کم</b><br>پاسخ‌های شما نشان می‌دهد که در بیشتر موقعیت‌ها مسئولیت‌پذیری، همدلی و احترام به دیگران را حفظ می‌کنید. البته هیچ‌کس همیشه بدون رفتار ناسالم نیست و خودآگاهی و بازخورد گرفتن همچنان اهمیت دارد.";
}
else if (total <= 71) {
    interpretation.innerHTML =
        "<b>رفتارهای سمی خفیف</b><br>برخی الگوهای رفتاری ممکن است گاهی باعث تنش در روابط شوند، اما به نظر می‌رسد این رفتارها فراگیر و پایدار نیستند. توجه به موقعیت‌هایی که این الگوها در آن فعال می‌شوند می‌تواند به بهبود روابط کمک کند.";
}
else if (total <= 95) {
    interpretation.innerHTML =
        "<b>رفتارهای سمی متوسط</b><br>نتیجه نشان می‌دهد که برخی الگوهای ارتباطی شما ممکن است به‌طور قابل توجهی بر کیفیت روابط اثر بگذارند. شناسایی موقعیت‌های تکرارشونده و تمرین مهارت‌هایی مانند همدلی، پذیرش مسئولیت و مدیریت هیجان می‌تواند مفید باشد.";
}
else {
    interpretation.innerHTML =
        "<b>رفتارهای سمی بالا</b><br>پاسخ‌ها نشان می‌دهد که برخی الگوهای ناسالم ممکن است به‌صورت مکرر در روابط شما ظاهر شوند. این نتیجه به‌تنهایی یک تشخیص روان‌شناختی نیست، اما می‌تواند نشانه‌ای باشد که بررسی عمیق‌تر و کار روی مهارت‌های ارتباطی و تنظیم هیجان برای شما سودمند خواهد بود.";
}

const now = new Date();

const data = {

    name: document.getElementById("fullName").value,

    date: now.toLocaleDateString("fa-IR"),

    time: now.toLocaleTimeString("fa-IR"),

    total: total,

    scale1: subScale[0],

    scale2: subScale[1],

    scale3: subScale[2],

    scale4: subScale[3],

    scale5: subScale[4],

    scale6: subScale[5]

};


const params = new URLSearchParams();

params.append("name", data.name);
params.append("total", data.total);
params.append("scale1", data.scale1);
params.append("scale2", data.scale2);
params.append("scale3", data.scale3);
params.append("scale4", data.scale4);
params.append("scale5", data.scale5);
params.append("scale6", data.scale6);

fetch(SCRIPT_URL, {
    method: "POST",
    body: params
})
.then(response => response.text())
.then(response => {
    console.log("Saved:", response);
})
.catch(error => {
    console.error("Error:", error);
});



    form.style.display = "none";

    result.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
