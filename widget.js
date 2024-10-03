(function() {
  function createTestDiv() {
    // Create a new div element
    const testDiv = document.createElement('div');
    
    // Set its styles to be very obvious
    testDiv.style.width = '100%';
    testDiv.style.height = '100px';
    testDiv.style.backgroundColor = 'red';
    testDiv.style.color = 'white';
    testDiv.style.textAlign = 'center';
    testDiv.style.fontSize = '24px';
    testDiv.style.fontWeight = 'bold';
    testDiv.style.position = 'fixed';
    testDiv.style.top = '0';
    testDiv.style.left = '0';
    testDiv.style.zIndex = '99999';

    // Set the text content
    testDiv.innerText = 'Test Script Loaded Successfully!';

    // Append the div to the body
    document.body.appendChild(testDiv);

    console.log('Test script loaded and executed.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTestDiv);
  } else {
    // Document is already ready, so call the function directly
    createTestDiv();
  }
})();
