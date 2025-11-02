
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  }
  
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      
      if (body.classList.contains('light-mode')) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          localStorage.setItem('theme', 'light');
      } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          localStorage.setItem('theme', 'dark');
      }
  });

    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Fullstack Developer',
        'UI/UX Designer',
        'React Specialist',
        'Web Developer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(type, 1000);
    });
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuToggle.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      } else {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
      }
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (!mobileMenu.classList.contains('hidden')) {
                  mobileMenu.classList.add('hidden');
                  menuToggle.querySelector('i').classList.remove('fa-times');
                  menuToggle.querySelector('i').classList.add('fa-bars');
              }
              
              // Update active link
              document.querySelectorAll('.nav-link').forEach(link => {
                  link.classList.remove('active');
              });
              this.classList.add('active');
          }
      });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll('section').forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              document.querySelectorAll('.nav-link').forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
      
      // Show/hide back to top button
      const backToTopButton = document.getElementById('back-to-top');
      if (scrollPosition > 300) {
          backToTopButton.classList.remove('hidden');
      } else {
          backToTopButton.classList.add('hidden');
      }
      
      // Trigger scroll animations
      triggerScrollAnimations();
  });
  
  // Back to top button
  document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // Skill bar animation on scroll
  let skillsAnimated = false;
  function animateSkillBars() {
      if (skillsAnimated) return;
      
      const skillsSection = document.getElementById('skills');
      const skillsSectionTop = skillsSection.offsetTop;
      const windowHeight = window.innerHeight;
      
      if (window.scrollY > skillsSectionTop - windowHeight + 200) {
          const skillBars = document.querySelectorAll('.skill-progress');
          skillBars.forEach(bar => {
              const width = bar.getAttribute('data-width');
              setTimeout(() => {
                  bar.style.width = width + '%';
              }, 100);
          });
          skillsAnimated = true;
      }
  }
  
  // Scroll animations trigger
  function triggerScrollAnimations() {
      animateSkillBars();
      
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
      elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight - 100) {
              element.style.animationPlayState = 'running';
          }
      });
  }
  
  // Initial check for animations
  window.addEventListener('load', () => {
      triggerScrollAnimations();
  });
  
  // Pause animations initially
  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      el.style.animationPlayState = 'paused';
  });

//   form validation


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    subject: form.querySelector("#subject"),
    message: form.querySelector("#message"),
  };

  const errors = {
    name: form.querySelector("#nameError"),
    email: form.querySelector("#emailError"),
    subject: form.querySelector("#subjectError"),
    message: form.querySelector("#messageError"),
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Clear error
  function clearError(field) {
    fields[field].classList.remove("border", "border-red-500", "focus:ring-red-500");
    errors[field].classList.add("hidden");
  }

  // Show error
  function showError(field, message) {
    fields[field].classList.add("border", "border-red-500", "focus:ring-red-500");
    errors[field].textContent = message;
    errors[field].classList.remove("hidden");
  }

  // Validate all fields
  function validate() {
    let isValid = true;

    // Name
    if (fields.name.value.trim().length < 3) {
      showError("name", "Name must be at least 3 characters.");
      isValid = false;
    } else clearError("name");

    // Email
    if (!emailPattern.test(fields.email.value.trim())) {
      showError("email", "Enter a valid email address.");
      isValid = false;
    } else clearError("email");

    // Subject
    if (fields.subject.value.trim().length < 3) {
      showError("subject", "Subject must be at least 3 characters.");
      isValid = false;
    } else clearError("subject");

    // Message
    if (fields.message.value.trim().length < 10) {
      showError("message", "Message must be at least 10 characters long.");
      isValid = false;
    } else clearError("message");

    return isValid;
  }

  // Real-time validation
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => clearError(key));
  });

  // Submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isValid = validate();

    // Remove existing success message
    const existingSuccess = form.querySelector("#successMsg");
    if (existingSuccess) existingSuccess.remove();

    if (isValid) {
      // Reset form
      form.reset();

      // Show success message
      const success = document.createElement("div");
      success.id = "successMsg";
      success.className =
        "mt-4 p-3 rounded-lg bg-green-600 text-white text-center animate-fade-in";
      success.textContent = "✅ Your message has been sent successfully!";
      form.appendChild(success);

      setTimeout(() => {
        success.classList.add("opacity-0", "transition-opacity", "duration-500");
        setTimeout(() => success.remove(), 500);
      }, 3000);
    }
  });
});

// // email sending
// function sendEmail(){
//     const templateParams={
//         name : document.getElementById("#name").value,
//         email :document.getElementById("#email").value,
//         subject :document.getElementById("#subject").value,
//         message :document.getElementById("#message").value,
//     };
//     emailjs.send("service_6oun63i","template_l8b2qvw",templateParams).then(()=>{
//         alert("Email sent successfully!!!").catch(()=> alert("email not sent!!!"));
//     })
    
// }

