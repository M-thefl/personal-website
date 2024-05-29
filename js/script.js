window.onscroll = function () { scroll_fun() };
$(".crd").hide(); 

$(".test").click(function () {
    $(".crd").slideToggle();
});
settick(".tic:eq(0)");
if (localStorage.getItem("color")) {
    console.log(localStorage.getItem("color"))
    let n = JSON.parse(localStorage.getItem("color"))
    $(":root").css("--maincolor", n[0]["color"]);
    settick(n[0]["tic"]);
}
function scroll_fun() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("top-bar").style.width = scrolled + "%";
}
function settick(check) {
    $(".tic").hide();
    $(check).show();
}
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["web application security student🔐","python", "js","  ${{<%[%'}}%     "];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 400; // Delay 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}
function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}
document.addEventListener("DOMContentLoaded", function () { 
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const payload = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Your message has been sent successfully!');
            document.getElementById('contact-form').reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        alert('There was an error sending your message. Please try again later.');
    }
});
