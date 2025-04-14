// javascript 
let cursor = document.querySelector("#cursor")
let blurCursor = document.querySelector("#cursor-blur")
document.addEventListener("mousemove", (dets) => {
    cursor.style.left = dets.x + 12.5 + "px"
    cursor.style.top = dets.y + 12.5 + "px"
    blurCursor.style.left = dets.x - 150 + "px"
    blurCursor.style.top = dets.y - 150 + "px"
})

document.querySelectorAll("#nav h4").forEach(function(e){
    e.addEventListener("mouseenter",()=>{
        cursor.style.transition = "all ease .1s"
        cursor.style.scale = 3
        cursor.style.border = "1px solid white"
        cursor.style.backgroundColor = "transparent"
    })
    e.addEventListener("mouseleave",()=>{
        cursor.style.transition = "all ease 0s"
        cursor.style.scale = 1
        cursor.style.border = "0px solid #95C11E"
        cursor.style.backgroundColor = "#95C11E"
    })
})



gsap.to("#nav", {
    backgroundColor: "black",
    height: "60px",
    duration: 0.6,
    scrollTrigger: { 
        trigger: "#nav",   
        scroller: "body",
        start: "top -10",
        end: "top -11%",
        scrub: 1

    }
})

gsap.to("#main", {
    backgroundColor: "black",
    duration: 1,
    scrollTrigger: {
        trigger: "#body",
        start: "top -20%",
        end: "top -80%",
        scrub: 2
    }
})

gsap.from("#about img, #aboutus", {
    y:50,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: "#about",
        scroller:"body",
        start: "top 60%",
        end: "top 50%",
        scrub: 2
    }
})
gsap.from("#notes img", {
    y:50,
    x:50,
    opacity: 0,
    duration: 2,
    scrollTrigger: {
        trigger: "#notes",
        scroller:"body",
        start: "top 60%",
        end: "top 50%",
        scrub: 2
    }
})
gsap.from(".card", {
    scale: .7,
    opacity: 0,
    duration: .1,
    stagger: .1,
    scrollTrigger: {
        trigger: ".card",
        scroller:"body",
        start: "top 70%",
        end: "top 55%",
        scrub: 2
    }
})
gsap.from("#page4 h1", {
    y:50,
    duration: .1,
    scrollTrigger: {
        trigger: "#page4 h1",
        scroller:"body",
        start: "top 90%",
        end: "top 80%",
        scrub: 2
    }
})