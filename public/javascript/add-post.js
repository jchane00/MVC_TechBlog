const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_text = document.querySelector('input[name="post-text"]').value.trim();
 

    if (make && model && year && price && mileage && condition && vin && link) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ make, model, year, price, mileage, condition, vin, link }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add car.');
      }
    }
  };
  
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  