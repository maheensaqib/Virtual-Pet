const basket = document.querySelector('.basket');
const cat = document.getElementById('cat');
const playButton = document.querySelector('#btn');
const box = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const text1 = document.querySelector('.text1');
const submitButton = document.querySelector('#btn2');
const name = document.querySelector('#catname');
const helmet = document.querySelector('.helmet');
const catContainer = document.getElementById('catcontainer');
let followMouse = false;
let isFollowing = false;

basket.addEventListener('click', () => {
    // cat and helmet appears from behind spaceship and jumps
    cat.style.opacity = '1';
    cat.style.zIndex = '3';
    helmet.style.opacity = '1';

    cat.classList.add('jump-once');
    helmet.classList.add('jump-once');

    basket.style.transform = 'translatey(-120vh)';
    // box disappears
    setTimeout(() => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(2rem)';
        box2.style.transform = 'translateY(2rem)';
    }, 500);
    // box appears again with new text
    setTimeout(() => {
        box.style.visibility = 'visible';
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
        box2.style.visibility = 'visible';
        box2.style.opacity = '1';
        box2.style.transform = 'translateY(0)';
        text1.innerHTML = "This is your new virtual Pet Now you can name her and explore the space with her <3 ";
    }, 1000);
});

// button and box disappears on button click
playButton.addEventListener('click', () => {
    // Smooth fade out and slide
    playButton.style.opacity = '0';
    playButton.style.transform = 'translateY(2rem)';
    box.style.opacity = '0';
    box.style.transform = 'translateY(2rem)';

    // Wait for transition to finish
    setTimeout(() => {
        playButton.style.display = 'none';
        box.style.visibility = 'hidden';
    }, 500);

    // Show cat and basket
    basket.style.opacity = '1';
    cat.style.opacity = '1';
    helmet.style.opacity = '1';

    // Bring message back after a short delay
    setTimeout(() => {
        box.style.visibility = 'visible';
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
        text1.innerHTML = "Click on the rocket to reveal your Virtual Pet";
    }, 1000);

});

// name appears on top of cat when submit button is clicked
document.querySelector("#form1").addEventListener("submit", (e) => {
    e.preventDefault();
    const namevalue = document.querySelector(".text2").value;
    localStorage.setItem("name", namevalue);
    name.innerHTML = namevalue;
    // name becomes visible
    setTimeout(() => {
        name.style.visibility = 'visible';
        name.style.opacity = '1';
        name.style.transform = 'translateY(0)';
    }, 500);
    // text and input box disappears
    setTimeout(() => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(2rem)';
        box2.style.opacity = '0';
        box2.style.transform = 'translateY(2rem)';
    }, 500);

    // Enable mouse-follow after name is submitted
    setTimeout(() => {
        followMouse = true;
        isFollowing = true;
    }, 3000);
});


cat.addEventListener('click', () => {
    isFollowing = !isFollowing;
});

let mouseX = 0;
let mouseY = 0;

let catX = 0;
let catY = 0;

// get value of mouse or touch
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
});

function animateFollow() {
    if (followMouse && isFollowing) {
        // Smoothly move towards mouse
        catX += (mouseX - catX) * 0.1;
        catY += (mouseY - catY) * 0.1;

        // Update cat container position
        const dx = mouseX - catX;
        const dy = mouseY - catY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        catContainer.style.left = `${catX - 60}px`;
        catContainer.style.top = `${catY - 80}px`;
        catContainer.style.transform = `rotate(${angle}deg)`;


        // Update name position
        name.style.left = `${catX - 10}px`;
        name.style.top = `${catY - 130}px`;

    }

    requestAnimationFrame(animateFollow);
}
animateFollow();

