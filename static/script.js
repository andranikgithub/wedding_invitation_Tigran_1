/* =========================================================
   ELEMENTS
========================================================= */

const sections =
    document.querySelectorAll(".section");

const progressDots =
    document.querySelectorAll(".progress-dot");


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const revealElements =
                    entry.target.querySelectorAll(".reveal");


                revealElements.forEach(
                    (element, index) => {

                        setTimeout(
                            () => {

                                element.classList.add("show");

                            },
                            index * 120
                        );

                    }
                );

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(
    (section) => {

        revealObserver.observe(section);

    }
);


/* =========================================================
   PROGRESS DOTS
========================================================= */

const progressObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const index =
                    Number(
                        entry.target.dataset.section
                    );


                progressDots.forEach(
                    (dot, dotIndex) => {

                        dot.classList.toggle(
                            "active",
                            dotIndex === index
                        );

                    }
                );

            });

        },

        {
            threshold: 0.6
        }

    );


sections.forEach(
    (section) => {

        progressObserver.observe(section);

    }
);


/* =========================================================
   COUNTDOWN
========================================================= */

/*
   Միջոցառումը՝
   15 Հոկտեմբեր 2026
   16:00
   Հայաստան UTC+4
*/

const eventDate =
    new Date(
        "2026-10-15T16:00:00+04:00"
    ).getTime();


function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


function updateCountdown() {

    const now =
        Date.now();


    let difference =
        eventDate - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    difference %=
        (1000 * 60 * 60 * 24);


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        );


    difference %=
        (1000 * 60 * 60);


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        );


    difference %=
        (1000 * 60);


    const seconds =
        Math.floor(
            difference /
            1000
        );


    document.getElementById("days")
        .textContent =
        formatNumber(days);


    document.getElementById("hours")
        .textContent =
        formatNumber(hours);


    document.getElementById("minutes")
        .textContent =
        formatNumber(minutes);


    document.getElementById("seconds")
        .textContent =
        formatNumber(seconds);

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   MUSIC
========================================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.getElementById("musicIcon");


/* =========================================================
   ԵՐԳԻ ՍԿԻԶԲԸ
   1:29 = 89 վայրկյան
========================================================= */

const startTime = 89;


/* =========================================================
   ԵՐԳԸ ԲԵՌՆՎԵԼՈՒՑ ՀԵՏՈ
   ԴՆԵԼ 1:29
========================================================= */

music.addEventListener(
    "loadedmetadata",
    () => {

        music.currentTime = startTime;

    }
);


/* =========================================================
   ԿՈՃԱԿԻ ՎԻՃԱԿ
========================================================= */

function setPlaying() {

    musicIcon.textContent = "◼";

}


function setPaused() {

    musicIcon.textContent = "♪";

}


/* =========================================================
   ԷՋԸ ԲԱՑՎԵԼՈՒՑ 1 ՎԱՅՐԿՅԱՆ ՀԵՏՈ
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            async () => {

                try {

                    /*
                       Սկսում ենք հենց 1:29-ից
                    */

                    music.currentTime =
                        startTime;


                    /*
                       Փորձում ենք միացնել երգը
                    */

                    await music.play();


                    /*
                       Եթե բրաուզերը թույլ տվեց,
                       կոճակը դառնում է Playing
                    */

                    setPlaying();


                    console.log(
                        "Երաժշտությունը ավտոմատ միացավ 1:29-ից"
                    );

                }

                catch (error) {

                    /*
                       Chrome-ը կարող է արգելել
                       autoplay-ը։
                    */

                    setPaused();


                    console.log(
                        "Autoplay-ը արգելափակվել է։"
                    );

                }

            },

            1000
        );

    }
);


/* =========================================================
   ԵՐԱԺՇՏՈՒԹՅԱՆ ԱՎԱՐՏ
========================================================= */

music.addEventListener(
    "ended",
    () => {

        setPaused();

    }
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        try {

            if (music.paused) {

                /*
                   Եթե երգը դեռ չի հասել 1:29-ին
                   կամ ավարտվել է՝ սկսում ենք 1:29-ից
                */

                if (
                    music.currentTime < startTime ||
                    music.ended
                ) {

                    music.currentTime =
                        startTime;

                }


                await music.play();


                setPlaying();

            }

            else {

                music.pause();


                setPaused();

            }

        }

        catch (error) {

            console.log(
                "Երաժշտության միացումը չստացվեց։",
                error
            );

        }

    }
);