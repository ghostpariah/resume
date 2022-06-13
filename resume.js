

let animationRan = false;
let initialRun = true;

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    console.log(`top = ${rect.top} viewport height is ${window.innerHeight}`)
    if(element.id == "work-experience"){
        //console.log(`${window.innerHeight} ${rect.top}`);
        return (
            
            rect.top <= ((window.innerHeight || document.documentElement.clientHeight))
            // rect.left >= 0 &&
            // rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight)-(rect.bottom-10)) &&
            // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    return (
        // rect.top >= 0 &&
        rect.top <= ((window.innerHeight || document.documentElement.clientHeight))
        // rect.left >= 0 &&
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function fadeInSection(){
    const sections = document.getElementsByTagName('article');
    for(let i=0;i<sections.length;i++){
        //attach event listener to set opacity to 1 after animation is done
        sections[i].addEventListener('animationend', (e)=>{
             e.target.style.opacity = 1;
         });

         //console.log("section id:"+sections[i].id+" "+isInViewport(sections[i]))
        if(isInViewport(sections[i])){
            sections[i].classList.add('fade-in')
            if(sections[i].id == "skills" && !animationRan){
                    let delay = (initialRun)? 1000: 0;
                    setTimeout(() => {
                        fillSkillLevel();
                    }, delay);
                    
                
                
               
            }
            animateCircle(sections[i]);
            slideInJob(sections[i]);
        }
       
    }
    
    
}
function fillSkillLevel(){
    initialRun = false;
    const skillList = document.getElementsByClassName('skill-item');
    for(let i=0;i<skillList.length;i++){
        skillList[i].childNodes[3].childNodes[1].childNodes[0].textContent=""
        let text = document.createTextNode(skillList[i].childNodes[3].childNodes[1].childNodes[0].getAttribute('data-level'))
        skillList[i].childNodes[3].childNodes[1].childNodes[0].appendChild(text)
        
        if(isInViewport(skillList[i])){
            
            skillList[i].childNodes[3].childNodes[1].style.animation = `level${skillList[i].getAttribute('data-level')} 2s linear forwards`
            
        }
       if(i==skillList.length){
        animationRan = true;
       }
    }
}
//delegate for animation control
function animatePage(){
    fadeInSection();
   
    
}
//function to animate circle
function animateCircle(section){
    let circles = section.getElementsByClassName('circle');
    let arr = Array.from(circles)
    console.log(arr.length)
    let count = 0;
    arr.forEach((circle)=>{
        console.log(isInViewport(circle))
        if(isInViewport(circle)){
            count++
            circle.classList.add('pulse');
            console.log(`${circle} ${count}`)
        }
    })
   
}
function slideInJob(section){
    let jobs = section.getElementsByClassName('slide');
    let arr = Array.from(jobs)
    console.log(`arr length  = ${arr.length}`)
    arr.forEach((job)=>{
        console.log(`isInVieport =${isInViewport(job)}`)
        if(isInViewport(job)){
            console.log(job);
            job.classList.add('fade-in');
            
        }
    });
}

 function loadPage(){
    animatePage();
    
 }
 function handleScroll(){
    animatePage();
 }