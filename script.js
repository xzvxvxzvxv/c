// 设置目标日期：2025年2月15日
const targetDate = new Date('2025-02-15T00:00:00');

function updateCountdown() {
    const now = new Date();
    const timeDiff = targetDate - now;

    // 计算天、小时、分钟、秒
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // 更新显示
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// 立即更新一次
updateCountdown();

// 每秒更新一次
setInterval(updateCountdown, 1000);

// 签到功能
const calendarEl = document.getElementById('calendar');
const checkinBtn = document.getElementById('checkin-btn');
const checkinStatus = document.getElementById('checkin-status');
let checkinData = JSON.parse(localStorage.getItem('checkinData')) || {};

// 生成日历
function generateCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 清空日历
    calendarEl.innerHTML = '';

    // 添加星期标题
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        dayEl.classList.add('calendar-day', 'weekday');
        calendarEl.appendChild(dayEl);
    });

    // 添加日期
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarEl.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        dayEl.classList.add('calendar-day');
        
        if (checkinData[dateStr]) {
            dayEl.classList.add('checked');
        }

        if (day === today.getDate() && month === today.getMonth()) {
            dayEl.classList.add('today');
        }

        calendarEl.appendChild(dayEl);
    }
}

// 处理签到
function handleCheckin() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    if (!checkinData[dateStr]) {
        checkinData[dateStr] = true;
        localStorage.setItem('checkinData', JSON.stringify(checkinData));
        generateCalendar();
        checkinStatus.textContent = '签到成功！';
        checkinBtn.disabled = true;
    }
}

// 检查今日是否已签到
function checkTodayStatus() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    if (checkinData[dateStr]) {
        checkinStatus.textContent = '今日已签到';
        checkinBtn.disabled = true;
    } else {
        checkinStatus.textContent = '今日未签到';
        checkinBtn.disabled = false;
    }
}

// 励志语录数据
let quotes = [
    "成功是跌倒九次，爬起来十次。 - 日本谚语",
    "千里之行，始于足下。 - 中国谚语",
    "生活不是等待暴风雨过去，而是学会在雨中跳舞。 - 印度谚语",
    "如果你想要成功，不要去追求成功；尽管做你自己热爱的事情并且相信它，成功自然会到来。 - 英国谚语",
    "不要为失败找借口，要为成功找方法。 - 美国谚语",
    "耐心是智慧的伙伴。 - 法国谚语",
    "伟大的作品不是靠力量，而是靠坚持来完成的。 - 英国谚语",
    "行动是治愈恐惧的良药。 - 德国谚语",
    "机会总是留给有准备的人。 - 中国谚语",
    "与其诅咒黑暗，不如点亮蜡烛。 - 俄罗斯谚语"
];

// 每日新增10条语录
function addDailyQuotes() {
    const newQuotes = [
        "成功的关键在于坚持自己的目标。 - 西班牙谚语",
        "每一个伟大的成就都始于一个勇敢的决定。 - 意大利谚语",
        "知识就是力量。 - 英国谚语",
        "时间是最好的老师。 - 希腊谚语",
        "失败是成功之母。 - 中国谚语",
        "行动胜于空谈。 - 德国谚语",
        "耐心是智慧的伙伴。 - 法国谚语",
        "机会总是留给有准备的人。 - 中国谚语",
        "与其诅咒黑暗，不如点亮蜡烛。 - 俄罗斯谚语",
        "伟大的作品不是靠力量，而是靠坚持来完成的。 - 英国谚语"
    ];
    
    // 确保不超过30条
    if (quotes.length < 30) {
        quotes = [...quotes, ...newQuotes].slice(0, 30);
    }
}

// 轮播语录
let currentQuoteIndex = 0;
function showNextQuote() {
    const carousel = document.getElementById('quotes-carousel');
    const quoteItems = document.querySelectorAll('.quote-item');
    
    // 隐藏当前语录
    quoteItems[currentQuoteIndex].classList.remove('active');
    
    // 更新索引
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    
    // 显示下一个语录
    quoteItems[currentQuoteIndex].classList.add('active');
}

// 初始化语录轮播
function initQuotesCarousel() {
    const carousel = document.getElementById('quotes-carousel');
    carousel.innerHTML = '';
    
    quotes.forEach((quote, index) => {
        const quoteEl = document.createElement('div');
        quoteEl.className = 'quote-item';
        quoteEl.textContent = quote;
        if (index === 0) {
            quoteEl.classList.add('active');
        }
        carousel.appendChild(quoteEl);
    });
    
    // 每5秒切换一次
    setInterval(showNextQuote, 5000);
}

// 初始化
generateCalendar();
checkTodayStatus();
checkinBtn.addEventListener('click', handleCheckin);

// 每日新增语录并初始化轮播
addDailyQuotes();
initQuotesCarousel();
