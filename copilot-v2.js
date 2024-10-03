(function() {
  console.log('Script execution started');
  
  try {
    let profileIconMmid = null;

    // Inject mmid attributes
    function injectMmidAttributes() {
      console.log('Injecting mmid attributes...');
      const allElements = document.querySelectorAll('*');
      let id = 0;
      
      allElements.forEach((element) => {
        const mmid = `${++id}`;
        element.setAttribute('mmid', mmid);
        element.setAttribute('aria-keyshortcuts', mmid);
      });
      
      console.log(`Added MMID to ${id} elements`);
    }

    // Create UI buttons
    function createButtons() {
      console.log('Creating UI buttons...');
      
      const fetchMmidButton = document.createElement('button');
      fetchMmidButton.innerText = 'Fetch Profile MMID';
      fetchMmidButton.style.position = 'fixed';
      fetchMmidButton.style.bottom = '50px';
      fetchMmidButton.style.right = '10px';
      fetchMmidButton.style.padding = '10px';
      fetchMmidButton.style.backgroundColor = '#4CAF50';
      fetchMmidButton.style.color = '#fff';
      fetchMmidButton.style.border = 'none';
      fetchMmidButton.style.zIndex = '9999';
      
      const clickButton = document.createElement('button');
      clickButton.innerText = 'Click Profile Icon';
      clickButton.style.position = 'fixed';
      clickButton.style.bottom = '10px';
      clickButton.style.right = '10px';
      clickButton.style.padding = '10px';
      clickButton.style.backgroundColor = '#008CBA';
      clickButton.style.color = '#fff';
      clickButton.style.border = 'none';
      clickButton.style.zIndex = '9999';
      
      document.body.appendChild(fetchMmidButton);
      document.body.appendChild(clickButton);
      
      console.log('Buttons created successfully');
    }

    // Initialize
    injectMmidAttributes();
    createButtons();
    
    console.log('Script execution completed successfully');
  } catch (error) {
    console.error('Script execution failed:', error);
  }
})();
