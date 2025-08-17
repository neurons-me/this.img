// In this.img/tests/test_node_env.js
import thisImg from '../index.js'; 

const imagePath = './neurons-logo.png';
const options = {
  width: 34,
  height: 34,
  channels: 3,
  returnFileType: 'jpeg'
};

thisImg(imagePath, options)
  .then(processedData => {
    console.log(processedData);
  })
  .catch(error => {
    console.error(error);
  });
  

console.log("testing PRESETS.")

//Use a high-resolution grayscale preset
thisImg(imagePath, "small32")
.then(result => {
  console.log('Processed Image:', result);
})
.catch(error => {
  console.error('Error processing image:', error);
});