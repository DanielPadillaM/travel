const nav = document.querySelector(".nav");
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".main-menu");
const pages = document.querySelectorAll(".page-section");
const links = document.querySelectorAll(".main-menu__link")

window.addEventListener('scroll',()=>{
    nav.classList.toggle("active",window.scrollY > 0);
});

toggle.addEventListener('click',()=>{
    toggle.classList.toggle('active');
    menu.classList.toggle("active");
});

//intersection observer
const callback = (entries)=>{
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return
        }
        else{
            links.forEach(link=>{
                if(link.dataset.text == entry.target.id){
                    link.classList.add('active');
                }
                else{
                    link.classList.remove('active')
                }
                
            })
        }
    });
}
const options= {
    threshold:0.15
};
const observer= new IntersectionObserver(callback,options);
pages.forEach(page=>{
    observer.observe(page);
})

//video

const btn = document.getElementById('tourBtn');
const video = document.getElementById('tourVideo');
const btnIcon = document.getElementById('tourIcon');
const playPause=()=>{
    if(video.paused){
        video.play()
    btnIcon.classList.remove('fa-play');
    btnIcon.classList.add('fa-pause');
    }
    else{
        video.pause()
        btnIcon.classList.remove('fa-pause');
        btnIcon.classList.add('fa-play');
    }
}
const videoEnd=()=>{
    btnIcon.classList.remove('fa-pause');
    btnIcon.classList.add('fa-play');
}


btn.addEventListener("click",playPause);

video.addEventListener("ended",videoEnd);

//arrow-gadget
const arrowGadget= document.getElementById('arrowGadget');
window.addEventListener("scroll",()=>{
    if(window.scrollY >= 200){
        arrowGadget.classList.add("show");
    }
    else{
        arrowGadget.classList.remove("show");
    }
});

//dark-mode
const darkBtn= document.getElementById("dark-modeBtn");
const darkIcon= document.getElementById("dark-modeIcon");
const BODY = document.querySelector("body");
darkBtn.addEventListener("click",()=>{
    darkIcon.classList.toggle("fa-moon");
    darkIcon.classList.toggle("fa-sun");
    BODY.classList.toggle("dark-theme");
})

//animations
const sliders = document.querySelectorAll(".slide-in");

//slide
const slideOptions={
    rootMargin:'0px 0px -100px 0px'
};
const slideOnScroll = new IntersectionObserver(function(entries,slideOnScroll){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }
        else{
            entry.target.classList.add('appear');
            slideOnScroll.unobserve(entry.target)
        }
    })
},slideOptions);

sliders.forEach(slider=>{
    slideOnScroll.observe(slider);
})