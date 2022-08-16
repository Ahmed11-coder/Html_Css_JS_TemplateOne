// Start Global Functions
// Handle Acitve State
function handleActive(ev) {
    // Remove Active Class From All Childrans
    ev.target.parentElement
        .querySelectorAll(".active")
        .forEach((el) => el.classList.remove("active"));
    // Add Active Class On Self
    ev.target.classList.add("active");
}
// End Global Functions

// Start Settings Box

const colorsLi = Array.from(document.querySelectorAll(".colors-list li"));
let colorsList = document.querySelector(".colors-list").style;
// Check If  There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
let defaultCheck;

if (mainColors && mainColors != "default") {
    // Remove Active Class From All Childrans
    document
        .querySelectorAll(".color-default .active")
        .forEach((el) => el.classList.remove("active"));
    // Add Active Class On Self
    document.querySelector(".color-default .customize").classList.add("active");

    colorsList.zIndex = 1;
    colorsList.opacity = 1;
    colorsLi.forEach((ele) => ele.classList.remove("active"));
    colorsLi
        .filter((ele) => ele.dataset.colors === mainColors)[0]
        .classList.add("active");
    document.documentElement.style.setProperty(
        "--main-color",
        mainColors.split(" ")[0]
    );
    document.documentElement.style.setProperty(
        "--second-color",
        mainColors.split(" ")[1]
    );
    document.querySelector(".about-us img").src = `Images/about${
        mainColors.split(" ")[2]
    }.svg`;
} else {
    colorsList.zIndex = -1;
    colorsList.opacity = 0.3;
    defaultCheck = true;
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .settings").onclick = function () {
    // Toggle Class Pe-spin For Rotation On Self
    this.classList.toggle("pe-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Random Background Option
let backgroundOption = true;

// Variable to Control to Interval
let backgroundInterval;

// Check If There's Local Storage Rnadom Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Romove Active Class From All
document
    .querySelectorAll(".random-background span")
    .forEach((ele) => ele.classList.remove("active"));

// Check If Random Background Local Storage Is Not Empty
if (
    backgroundLocalItem == "true" ||
    localStorage.getItem("background_option") === null
) {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
} else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
}

let colorOption = Array.from(document.querySelectorAll(`.color-default span`));
colorOption.forEach((ele) => {
    ele.addEventListener("click", (ev) => {
        // Remove Active Class From All Childrans
        ev.target.parentElement
            .querySelectorAll(".active")
            .forEach((el) => el.classList.remove("active"));
        // Add Active Class On Self
        ev.target.classList.add("active");

        // Make Effact
        if (ev.target.classList[0] === "customize") {
            defaultCheck = false;
            colorsList.zIndex = 1;
            colorsList.opacity = 1;
        } else {
            colorsList.setProperty("z-index", "-1");
            colorsList.setProperty("opacity", "0.3");
            localStorage.setItem("color_option", "default");
            defaultCheck = true;
        }
    });
});

// Switch Colors

// Loop On All List Items
colorsLi.forEach((li) => {
    // Click On Every List Items

    li.addEventListener("click", (e) => {
        // Set Color On Root
        handleActive(e);
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.colors.split(" ")[0]
        );
        document.documentElement.style.setProperty(
            "--second-color",
            e.target.dataset.colors.split(" ")[1]
        );
        document.querySelector(".about-us img").src = `Images/about${
            e.target.dataset.colors.split(" ")[2]
        }.svg`;
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.colors);
    });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

// Loop On All Span
randomBackEl.forEach((span) => {
    // Click On Every Spans

    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Images
let imgsArray = [
    "01.avif",
    "02.avif",
    "03.avif",
    "04.avif",
    "05.avif",
    "06.avif",
];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            let docStyle = document.documentElement.style;
            if (defaultCheck) {
                if (randomNumber === 0 || randomNumber === 5) {
                    docStyle.setProperty("--main-color", "#1e7efb");
                    docStyle.setProperty("--second-color", "#bbe1fa");
                    document.querySelector(".about-us img").src =
                        "Images/about1.svg";
                } else {
                    docStyle.setProperty("--main-color", "#4E9F3D");
                    docStyle.setProperty("--second-color", "#D8E9A8");
                    document.querySelector(".about-us img").src =
                        "Images/about2.svg";
                }
            } else {
                // Change Illustrations Color
            }
            // Change Background Image URL
            landingPage.style.backgroundImage = `url("Images/${imgsArray[randomNumber]}")`;
        }, 7000);
    }
}

randomizeImgs();

// Start Show Bullets Option

// Select All Bullets
const allBullets = Array.from(
    document.querySelectorAll(".nav-bullets .bullet")
);
// Select All Links
const allLinks = Array.from(document.querySelectorAll(".links a"));

function scrollTo(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

scrollTo(allBullets);
scrollTo(allLinks);

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (bulletsLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach((span) => {
    span.addEventListener("click", (ev) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none");
        }
        handleActive(ev);
    });
});
// End Show Bullets Option

function Dark_Light(mode) {
    let docStyle = document.documentElement.style;
    if (mode == "dark") {
        imgsArray = [
            "01dark.avif",
            "02dark.avif",
            "03dark.avif",
            "04dark.avif",
            "05dark.avif",
            "06dark.avif",
        ];
        document
            .querySelectorAll(
                "div > p:not(.about, .introduction p, .year p, form div p)"
            )
            .forEach((text) => (text.style.color = "#a5a5a5"));
        document.querySelectorAll(".skills-boxs .skill-box").forEach((box) => {
            box.style.cssText = "background-color: #fff1; border-color: #fff4";
            box.querySelector(".skill-progress").style.backgroundColor =
                "#2228";
        });
        document.querySelectorAll(".gallery .images-box img").forEach((img) => {
            img.style.boxShadow =
                "3px 3px 10px -1px #222a, -3px 3px 10px -1px #222a";
            img.src = `Images/gallery0${img.alt.split(" ")[1]}dark.avif`;
        });
        document
            .querySelectorAll(".feat-box i")
            .forEach(
                (i) =>
                    (i.style.boxShadow =
                        "10px 10px 30px -2px var(--main-color),-10px -10px 30px -2px #444")
            );
        document.querySelector(
            ".contact .background-photo"
        ).style.backgroundImage = `url("Images/map3dark.avif")`;
        document.querySelector(
            ".contact .overlay"
        ).style.backgroundColor = `rgba(0,0,0,0.2)`;
        docStyle.setProperty("--main-background-color", "19, 19, 19");
        docStyle.setProperty("--second-background-color", "#181818");
        docStyle.setProperty("--title-color", "#cecece");
        docStyle.setProperty("--border-color", "#222");
        docStyle.setProperty("--timeline-color", "#a5a5a5");
        docStyle.setProperty("--header-color", "#cecece");
    } else {
        document.querySelectorAll(".skills-boxs .skill-box").forEach((box) => {
            box.style.cssText =
                "background-color: #fdfdfd88; border-color: #fff";
            box.querySelector(".skill-progress").style.backgroundColor =
                "#fdfdfd88";
        });
        imgsArray = [
            "01.avif",
            "02.avif",
            "03.avif",
            "04.avif",
            "05.avif",
            "06.avif",
        ];
        document.querySelectorAll(".gallery .images-box img").forEach((img) => {
            img.style.boxShadow =
                "3px 3px 10px -1px #666a, -3px 3px 10px -1px #666a";
            img.src = `Images/gallery0${img.alt.split(" ")[1]}.avif`;
        });
        document
            .querySelectorAll(
                "div > p:not(.about, .introduction p, .year p, form div p)"
            )
            .forEach((text) => (text.style.color = ""));
        document
            .querySelectorAll(".feat-box i")
            .forEach(
                (i) =>
                    (i.style.boxShadow =
                        "10px 10px 30px -1px var(--main-color),-10px -10px 30px -1px #ddd")
            );
        document.querySelector(
            ".contact .background-photo"
        ).style.cssText = `background-image: url(Images/map3.avif");`;
        document.querySelector(
            ".contact .overlay"
        ).style.backgroundColor = `rgba(255,255,255,0.2)`;
        docStyle.setProperty("--main-background-color", "255, 255, 255");
        docStyle.setProperty("--second-background-color", "#f7f7f7");
        docStyle.setProperty("--title-color", "#000");
        docStyle.setProperty("--border-color", "#d4d4d4");
        docStyle.setProperty("--timeline-color", "var(--main-color)");
        docStyle.setProperty("--header-color", "#333");
    }
}

// Start Mode Option
let modes = Array.from(document.querySelectorAll(".mode-option span"));
let modesLocalItem = localStorage.getItem("mode_option");

if (modesLocalItem) {
    modes.forEach((mode) => {
        mode.classList.remove("active");
    });
    if (modesLocalItem === "Dark_Mode") {
        Dark_Light("dark");
        document
            .querySelector(".mode-option .dark-mode")
            .classList.add("active");
    } else {
        Dark_Light("light");
        document
            .querySelector(".mode-option .light-mode")
            .classList.add("active");
    }
}

modes.forEach((mode) => {
    mode.addEventListener("click", (ev) => {
        if (ev.target.dataset.mode === "dark") {
            Dark_Light("dark");
            localStorage.setItem("mode_option", "Dark_Mode");
        } else {
            Dark_Light("light");
            localStorage.setItem("mode_option", "Light_Mode");
        }
        handleActive(ev);
    });
});
// End Mode Option
// Start Reset Button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();

    // More Mothods
    /* localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("mode_option");
  localStorage.removeItem("background_option"); */

    // Reload Window
    window.location.reload();
};
// End Reset Button

// End Settings Box

// Start Menu
document.querySelector(".menu").onclick = function () {
    document.querySelector(".links").classList.toggle("opened");
    document.querySelector(".menu").classList.toggle("close");
};
// End Menu

// Start Our Skills and Contact Us
// Select Skills and Contact Us Selector
let ourSkills = document.querySelector(".skills");
let contactUs = document.querySelector(".contact");
window.onscroll = function () {
    // Contact Us Offset Top
    let contactOffsetTop = contactUs.offsetTop;
    // Contact Us Outer Height
    let contactsOuterHeight = contactUs.offsetHeight;
    // Skills Offset Top
    let skillOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    let allSkills = document.querySelectorAll(
        ".skill-box .skill-progress span"
    );
    let contactBackground = document.querySelector(
        ".contact .background-photo"
    );

    allSkills.forEach(
        (skill) =>
            (skill.style.width =
                windowScrollTop >
                skillOffsetTop + skillsOuterHeight - windowHeight
                    ? skill.dataset.progress
                    : 0)
    );
    contactBackground.style.transform =
        windowScrollTop >
        contactOffsetTop - 200 + contactsOuterHeight - windowHeight
            ? "scale(1)"
            : "scale(3)";
};
// End Our Skills and Contact Us

// Start Popup Box and Our Gallery

// Create Popup With Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Append Overlay To A Body
        document.body.appendChild(overlay);
        // Create The Popup Box
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";

        if (img.alt) {
            // Create Heading
            let imgHeading = document.createElement("h3");
            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);
            // Append The Text To The Heading
            imgHeading.appendChild(imgText);
            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create The Iamge
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");
        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");
        // Append To Close Button
        closeButton.appendChild(closeButtonText);
        // Add Class To Close Button
        closeButton.className = "close-button";
        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        // Remove The Current Popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Start Popup Box and Our Gallery

// Start Timeline Setion

let yearSpan = document.querySelectorAll(".timeline-content .content .year");

yearSpan.forEach((span) => {
    span.addEventListener("click", (e) => e.target.classList.toggle("clicked"));
});

// End Timeline Setion
