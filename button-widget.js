document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded, attempting to create buttons');
  let profileIconMmid = null; // Variable to store the mmid of the profile icon

  // Function to inject mmid and aria-keyshortcuts into all DOM elements
  function injectMmidAttributes() {
    const allElements = document.querySelectorAll('*');
    let id = 0;

    // Iterate over all DOM elements and inject mmid
    allElements.forEach((element) => {
      const origAriaAttribute = element.getAttribute('aria-keyshortcuts');
      const mmid = `${++id}`;

      // Inject mmid and aria-keyshortcuts attributes
      element.setAttribute('mmid', mmid);
      element.setAttribute('aria-keyshortcuts', mmid);

      // Rename the existing aria-keyshortcuts attribute if it exists
      if (origAriaAttribute) {
        element.setAttribute('orig-aria-keyshortcuts', origAriaAttribute);
      }
    });

    console.log(`Added MMID to ${id} elements`);
  }

  // Function to send DOM elements to the server and fetch the profile icon's mmid
  async function fetchProfileMmid() {
    injectMmidAttributes(); // Ensure mmid is injected into the DOM before making the request

    const allElements = document.querySelectorAll('*');
    const elementsArray = [];

    // Collect the attributes of each DOM element
    allElements.forEach((element) => {
      elementsArray.push({
        tag: element.tagName,
        attributes: {
          'aria-label': element.getAttribute('aria-label') || null,
          id: element.id || null,
          class: element.className || null,
        },
        mmid: element.getAttribute('mmid'), // Send the mmid we injected earlier
      });
    });

    try {
      // Make the POST request to the server
      const response = await fetch('https://your-ngrok-url.ngrok.io/get-mmid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ elements: elementsArray }),
      });

      const data = await response.json();
      profileIconMmid = data.mmid; // Get the mmid for the profile icon from the server response
      console.log('Profile icon mmid received from server:', profileIconMmid);

      // Alert for the fetched mmid
      alert('Fetched profile icon mmid: ' + profileIconMmid);
    } catch (error) {
      console.error('Error fetching profile mmid:', error);
      alert('Failed to fetch profile icon mmid.');
    }
  }

  // Function to simulate a click on the profile icon using the mmid received from the server
  function clickProfileIcon() {
    if (!profileIconMmid) {
      alert('Profile icon mmid not available! Fetch the mmid first.');
      return;
    }

    // Use the mmid returned from the server to find the profile icon
    const profileIcon = document.querySelector(`button[mmid="${profileIconMmid}"]`);

    if (profileIcon) {
      profileIcon.click(); // Simulate a click
      console.log('Profile icon clicked!');
      alert('Profile icon clicked!');
    } else {
      console.log('Profile icon not found!');
      alert('Profile icon not found!');
    }
  }

  // Create the button to fetch the profile mmid from the server
  const fetchMmidButton = document.createElement('button');
  fetchMmidButton.innerText = 'Fetch Profile MMID';
  fetchMmidButton.style.position = 'fixed';
  fetchMmidButton.style.bottom = '50px';
  fetchMmidButton.style.right = '10px';
  fetchMmidButton.style.padding = '10px';
  fetchMmidButton.style.backgroundColor = '#4CAF50'; // Add background color
  fetchMmidButton.style.color = '#fff'; // Add text color
  fetchMmidButton.style.border = 'none'; // Remove border
  fetchMmidButton.style.zIndex = '9999'; // Ensure it appears on top
  fetchMmidButton.style.fontSize = '16px'; // Make button text readable

  fetchMmidButton.addEventListener('click', async () => {
    await fetchProfileMmid(); // Fetch the mmid from the server on button click
  });

  // Create the button to click the profile icon
  const clickButton = document.createElement('button');
  clickButton.innerText = 'Click Profile Icon';
  clickButton.style.position = 'fixed';
  clickButton.style.bottom = '10px';
  clickButton.style.right = '10px';
  clickButton.style.padding = '10px';
  clickButton.style.backgroundColor = '#008CBA'; // Add background color
  clickButton.style.color = '#fff'; // Add text color
  clickButton.style.border = 'none'; // Remove border
  clickButton.style.zIndex = '9999'; // Ensure it appears on top
  clickButton.style.fontSize = '16px'; // Make button text readable

  clickButton.addEventListener('click', clickProfileIcon); // Click profile icon on button click

  document.body.appendChild(fetchMmidButton); // Append the fetch mmid button
  document.body.appendChild(clickButton); // Append the click button
});
