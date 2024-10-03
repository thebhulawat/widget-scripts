(function() {
  console.log('Widget script starting...');
  
  try {
    let profileIconMmid = null;

    async function fetchProfileMmid() {
      console.log('Fetching profile MMID...');
      injectMmidAttributes();

      const allElements = document.querySelectorAll('*');
      const elementsArray = [];

      allElements.forEach((element) => {
        elementsArray.push({
          tag: element.tagName,
          attributes: {
            'aria-label': element.getAttribute('aria-label'),
            id: element.getAttribute('id'),
            class: element.getAttribute('class'),
          },
          mmid: element.getAttribute('mmid'),
        });
      });

      try {
        const response = await fetch('https://b9ea-49-205-35-51.ngrok-free.app/get-mmid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ elements: elementsArray }),
        });

        const data = await response.json();
        profileIconMmid = data.mmid;
        console.log('Profile icon MMID received:', profileIconMmid);
        return profileIconMmid;
      } catch (error) {
        console.error('Failed to fetch MMID:', error);
        throw error;
      }
    }

    function clickProfileIcon() {
      console.log('Attempting to click profile icon...');
      if (!profileIconMmid) {
        console.error('Profile MMID not available');
        return;
      }

      const profileIcon = document.querySelector(`button[mmid="${profileIconMmid}"]`);
      if (profileIcon) {
        profileIcon.click();
        console.log('Profile icon clicked');
      } else {
        console.error('Profile icon not found');
      }
    }

    function injectMmidAttributes() {
      console.log('Injecting MMID attributes...');
      const allElements = document.querySelectorAll('*');
      let id = 0;
      allElements.forEach((element) => {
        const mmid = `${++id}`;
        element.setAttribute('mmid', mmid);
        element.setAttribute('aria-keyshortcuts', mmid);
      });
      console.log(`Added MMID to ${id} elements`);
    }

    function createButtons() {
      console.log('Creating buttons...');
      
      // Remove existing buttons if they exist
      const existingButtons = document.querySelectorAll('[data-widget-button]');
      existingButtons.forEach(button => button.remove());

      // Create Fetch MMID button
      const fetchMmidButton = document.createElement('button');
      fetchMmidButton.innerText = 'Fetch Profile MMID';
      fetchMmidButton.setAttribute('data-widget-button', 'fetch');
      Object.assign(fetchMmidButton.style, {
        position: 'fixed',
        bottom: '50px',
        right: '10px',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        zIndex: '9999',
        cursor: 'pointer',
        fontSize: '16px'
      });

      // Create Click Profile button
      const clickButton = document.createElement('button');
      clickButton.innerText = 'Click Profile Icon';
      clickButton.setAttribute('data-widget-button', 'click');
      Object.assign(clickButton.style, {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '10px',
        backgroundColor: '#008CBA',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        zIndex: '9999',
        cursor: 'pointer',
        fontSize: '16px'
      });

      // Attach event listeners
      fetchMmidButton.addEventListener('click', async () => {
        try {
          await fetchProfileMmid();
          alert('MMID fetched: ' + profileIconMmid);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          alert('Failed to fetch MMID: ' + errorMessage);
        }
      });

      clickButton.addEventListener('click', () => {
        if (!profileIconMmid) {
          alert('Please fetch the MMID first');
          return;
        }
        clickProfileIcon();
      });

      // Append buttons to body
      document.body.appendChild(fetchMmidButton);
      document.body.appendChild(clickButton);
      
      console.log('Buttons created and event listeners attached');
    }

    // Initialize
    createButtons();
    console.log('Widget script completed successfully');
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Widget script failed:', errorMessage);
  }
})();
