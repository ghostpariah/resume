

let animationRan = false;
let initialRun = true;


/********
 * 
 * @param {*} element 
 * @returns boolean determining if the passed element is on screen
 * 
 *******/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    
    if(element.id == "work-experience"){        
        return rect.top <= ((window.innerHeight || document.documentElement.clientHeight))
    }
    
    return rect.top <= ((window.innerHeight || document.documentElement.clientHeight))    
}


/**
 * 
 * function to control page animations
 * 
 */
function animatePage(){
    
    const arrSections = Array.from(document.getElementsByTagName('article'))

    arrSections.forEach((section)=>{
        
        if(isInViewport(section)){
            section.classList.add('fade-in')
            if(section.id == "skills" && !animationRan){
                let delay = (initialRun)? 1000: 0;
                setTimeout(() => {
                    fillSkillLevel();
                }, delay);
            }
            animateCircle(section);            
            slideInJob(section);
            
            
        }
    })
}

/**
 * function to animate skill progress bars
 */
function fillSkillLevel(){
    initialRun = false;    
    const arrSkills = Array.from(document.getElementsByClassName('skill-item'))
    let count = 0

    arrSkills.forEach((skill)=>{
        count++
        skill.childNodes[3].childNodes[1].childNodes[0].textContent=""
        let text = document.createTextNode(skill.childNodes[3].childNodes[1].childNodes[0].getAttribute('data-level'))
        skill.childNodes[3].childNodes[1].childNodes[0].appendChild(text)
        if(isInViewport(skill)){            
            skill.childNodes[3].childNodes[1].style.animation = `level${skill.getAttribute('data-level')} 2s linear forwards` 
        }
        if(count===arrSkills.length){
            animationRan = true;
        }
    })
    
}

/**
 * 
 * function that adds the class name 'pulse' to animated section circle design element
 * @param {*} section 
 */
function animateCircle(section){
    let circles = section.getElementsByClassName('circle')
    let arrCircles = Array.from(circles)
    
    arrCircles.forEach((circle)=>{
        
        if(isInViewport(circle)){            
            circle.classList.add('pulse')            
        }
    })
   
}

/**
 * 
 * @param {*} section 
 * function to animate sections by adding a class name fade-in 
 * that slides them from off-screen into the viewport and changes opacity to 1
 */
function slideInJob(section){
    let jobs = section.getElementsByClassName('slide');
    let arr = Array.from(jobs)
    
    arr.forEach((job)=>{        
        if(isInViewport(job)){            
            job.classList.add('fade-in');            
        }
    });
}

 