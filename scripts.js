/* ---------------- LOAD CONTENT FROM JSON ---------------- */

let contentData = {};

async function loadContent() {
  console.log('loadContent() STARTED');
  try {
    console.log('Fetching content.json...');
    const response = await fetch('content.json');
    console.log('Response received:', response.status);
    contentData = await response.json();
    console.log('Content loaded successfully:', contentData);
    console.log('Services:', contentData.services);
    console.log('Service items:', contentData.services.items);
    console.log('Calling populateContent...');
    populateContent();
    console.log('populateContent completed');
  } catch (error) {
    console.error('ERROR in loadContent():', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
}

function populateContent() {
  console.log('populateContent() called!');
  // Populate Hero Section
  if (contentData.hero) {
    const heroTitle = document.getElementById(contentData.hero.titleId);
    const heroDesc = document.getElementById(contentData.hero.descriptionId);
    const heroBtnPrimary = document.getElementById(contentData.hero.primaryBtnId);
    const heroBtnSecondary = document.getElementById(contentData.hero.secondaryBtnId);
    
    if (heroTitle) heroTitle.textContent = contentData.hero.title;
    if (heroDesc) heroDesc.textContent = contentData.hero.description;
    if (heroBtnPrimary) heroBtnPrimary.textContent = contentData.hero.primaryBtnText;
    if (heroBtnSecondary) heroBtnSecondary.textContent = contentData.hero.secondaryBtnText;
  }

  // Populate Intro Section
  if (contentData.intro) {
    const introTitle = document.getElementById(contentData.intro.titleId);
    const introDesc = document.getElementById(contentData.intro.descriptionId);
    const introBtn = document.getElementById(contentData.intro.btnId);
    
    if (introTitle) introTitle.innerHTML = contentData.intro.title.replace(/&/g, '<br>');
    if (introDesc) introDesc.textContent = contentData.intro.description;
    if (introBtn) introBtn.textContent = contentData.intro.btnText;
  }

  // Populate About Section
  if (contentData.about) {
    const aboutTitle = document.getElementById(contentData.about.titleId);
    const aboutDesc = document.getElementById(contentData.about.descriptionId);
    const aboutImg = document.getElementById(contentData.about.imageId);
    const pageTitle = document.getElementById(contentData.about.pageTitleId);
    const pageDesc = document.getElementById(contentData.about.pageDescriptionId);
    const pageImg = document.getElementById(contentData.about.pageImageId);
    const missionTitle = document.getElementById(contentData.about.missionTitleId);
    const missionText = document.getElementById(contentData.about.missionTextId);
    const whyTitle = document.getElementById(contentData.about.whyTitleId);
    
    if (aboutTitle) aboutTitle.textContent = contentData.about.title;
    if (aboutDesc) aboutDesc.textContent = contentData.about.description;
    if (aboutImg) aboutImg.src = contentData.about.imageUrl;
    if (pageTitle) pageTitle.textContent = contentData.about.pageTitle;
    if (pageDesc) pageDesc.textContent = contentData.about.pageDescription;
    if (pageImg) pageImg.src = contentData.about.pageImageUrl;
    if (missionTitle) missionTitle.textContent = contentData.about.missionTitle;
    if (missionText) missionText.textContent = contentData.about.missionText;
    if (whyTitle) whyTitle.textContent = contentData.about.whyTitle;
    
    // Loop through Why Points
    if (contentData.about.whyPoints) {
      contentData.about.whyPoints.forEach(point => {
        const pointElement = document.getElementById(point.id);
        if (pointElement) pointElement.textContent = point.text;
      });
    }
  }

  // Populate Services Section
  if (contentData.services) {
    const servicesTitle = document.getElementById(contentData.services.titleId);
    const servicesDesc = document.getElementById(contentData.services.descriptionId);
    const serviceRow = document.getElementById('service-row');
    
    console.log('Service row element:', serviceRow);
    console.log('Service items to loop:', contentData.services.items);
    
    if (servicesTitle) servicesTitle.textContent = contentData.services.title;
    if (servicesDesc) servicesDesc.textContent = contentData.services.description;

    // Generate Service Items from JSON
    if (serviceRow && contentData.services.items) {
      console.log('Condition met: serviceRow exists and items exist');
      console.log('Number of items to add:', contentData.services.items.length);
      console.log('serviceRow HTML before clear:', serviceRow.innerHTML);
      serviceRow.innerHTML = ''; // Clear existing items
      console.log('serviceRow HTML after clear:', serviceRow.innerHTML);
      
      contentData.services.items.forEach((item, index) => {
        console.log('Processing service item', index + 1, ':', item.title);
        const serviceHTML = `<div class="service-item"><img src="${item.imageUrl}" alt="${item.title}" /><h3>${item.title}</h3><p>${item.description}</p></div>`;
        serviceRow.insertAdjacentHTML('beforeend', serviceHTML);
        console.log('Item', index + 1, 'inserted. Current children count:', serviceRow.children.length);
      });
      console.log('All service items processed. Total children in serviceRow:', serviceRow.children.length);
      console.log('Final HTML length:', serviceRow.innerHTML.length);
      console.log('Final HTML:', serviceRow.innerHTML.substring(0, 200));
    } else {
      console.log('Condition FAILED');
      console.log('  serviceRow:', serviceRow, '(exists:', !!serviceRow, ')');
      console.log('  contentData.services.items:', contentData.services.items, '(exists:', !!contentData.services.items, ')');
    }
  }

  // Populate Careers Section
  if (contentData.careers) {
    const careersTitle = document.getElementById(contentData.careers.titleId);
    const careersDesc = document.getElementById(contentData.careers.descriptionId);
    const openingsList = document.getElementById(contentData.careers.openingsContainerId);
    
    if (careersTitle) careersTitle.textContent = contentData.careers.title;
    if (careersDesc) careersDesc.textContent = contentData.careers.description;
    
    // Generate Career Items from JSON
    if (openingsList && contentData.careers.openings) {
      openingsList.innerHTML = ''; // Clear default items
      contentData.careers.openings.forEach((opening, index) => {
        const openingHTML = `<div class="opening" data-opening="${opening.id}"><div class="opening-title">${opening.title}</div><div class="opening-desc">${opening.description}</div><a class="opening-apply" href="mailto:${opening.applyEmail}?subject=${encodeURIComponent(opening.applySubject)}" target="_blank">Apply Now</a></div>`;
        openingsList.insertAdjacentHTML('beforeend', openingHTML);
      });
    }
  }

  // Populate FAQ Section
  if (contentData.faq) {
    const faqTitle = document.getElementById(contentData.faq.titleId);
    const faqList = document.getElementById(contentData.faq.listContainerId);
    
    if (faqTitle) faqTitle.textContent = contentData.faq.title;
    
    // Generate FAQ Items from JSON
    if (faqList && contentData.faq.items) {
      faqList.innerHTML = ''; // Clear default items
      contentData.faq.items.forEach((item) => {
        const faqHTML = `<div class="faq-item"><div class="faq-q">${item.question}</div><div class="faq-a">${item.answer}</div></div>`;
        faqList.insertAdjacentHTML('beforeend', faqHTML);
      });
    }
  }

  // Populate Contact Section
  if (contentData.contact) {
    const contactTitle = document.getElementById(contentData.contact.leftTitleId);
    const contactDesc = document.getElementById(contentData.contact.leftDescriptionId);
    const contactImg = document.getElementById(contentData.contact.leftImageId);
    
    if (contactTitle) contactTitle.textContent = contentData.contact.leftTitle;
    if (contactDesc) contactDesc.textContent = contentData.contact.leftDescription;
    if (contactImg) contactImg.src = contentData.contact.leftImageUrl;
    
    // Populate form fields
    if (contentData.contact.formFields) {
      contentData.contact.formFields.forEach((field) => {
        const formElement = document.getElementById(field.id);
        if (formElement) {
          formElement.placeholder = field.placeholder;
          if (field.type !== 'textarea') {
            formElement.type = field.type;
          }
        }
      });
    }
  }

  // Populate Footer Section
  if (contentData.footer) {
    const footerCols = document.querySelectorAll('.footer-col');
    
    if (footerCols.length >= 3) {
      // Column 1
      const col1 = footerCols[0];
      col1.innerHTML = `
        <h3>${contentData.footer.col1Title}</h3>
        <p>${contentData.footer.col1Desc}</p>
        <p>${contentData.footer.col1Email1}</p>
        <p>${contentData.footer.col1Email2}</p>
        <p class="copyright">${contentData.footer.col1Copyright}</p>
      `;

      // Column 2
      const col2 = footerCols[1];
      col2.innerHTML = `
        <h3>${contentData.footer.col2Title}</h3>
        <p>${contentData.footer.col2Location1}</p>
        <br>
        <p>${contentData.footer.col2Location2}</p>
      `;

      // Column 3
      const col3 = footerCols[2];
      col3.innerHTML = `
        <h3>${contentData.footer.col3Title}</h3>
        <p>${contentData.footer.col3Desc}</p>
        <input type="email" placeholder="Your email for contact" />
        <button class="footer-btn">${contentData.footer.col3BtnText}</button>
      `;
    }
  }
}

// Load content when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  loadContent();
});


/* ---------------- NAVBAR SCROLL EFFECT ---------------- */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


/* ---------------- FADE IN ANIMATION ---------------- */

const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

faders.forEach(el => observer.observe(el));
