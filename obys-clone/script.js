function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


function animateLoader() {
    var tl = gsap.timeline();

    tl.from(".row h2, #last-row-h3, #quick-note", {
        opacity: 0,
        delay: .4,
        duration: .7,
        onStart: function () {
            var counter = document.querySelector('#counter-h')
            var grow = 0;

            var int = setInterval(() => {
                if (grow == 100) {
                    clearInterval(int)
                }
                counter.textContent = grow;
                grow++;
            }, 45);
        }
    })

    tl.from(".row h1", {
        y: 100,
        duration: .7,
        stagger: .3,
    })

    tl.to("#loader", {
        display: 'none',
    })

    tl.from("#page1", {
        y: 1200,
        duration: 1,
        opacity: 0,
    })

    tl.from("#nav",{
        opacity: 0,
        duration: .6,
    })

    tl.from(".p1-box h1",{
        y:150,
        duration: 1,
        stagger: .2
    })

    tl.from("#page2, .p1-box:first-child",{
        opacity: 0,
        duration: .5
    }, "-=1.2");

    tl.from("#cursor",{
        opacity: 0,
        duration: .3
    })
}
function animatecursor() {
    document.querySelector('#main')
        .addEventListener("mousemove", function (dets) {
            gsap.to('#cursor', {
                top: dets.y,
                left: dets.x,
            })
        })

    // document.querySelector('#video-container')
    //     .addEventListener("mousemove", function (dets) {
    //         gsap.from('#play-btn', {
    //             top: dets.y - "12%",
    //             left: dets.x + "70%",
    //         })
    //     })

    Shery.makeMagnet('#nav-part2 h3')
}
animatecursor();
animateLoader();
locomotiveAnimation();