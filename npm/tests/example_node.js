import thisImg from '../index.js'; 

// Example of processing an image using a preset
const imagePath = './neurons-logo.png';
// Use a high-resolution grayscale preset
thisImg(imagePath)
  .then(result => {
    console.log('Processed Image:', result);
  })
  .catch(error => {
    console.error('Error processing image:', error);
  });