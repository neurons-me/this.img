import thisImg from '../index.js'; 
// Testing error handling with an invalid path (non-string input)

const imagePath = 3;
const options = {
  width: 100,
  height: 100,
  channels: 3,
  returnFileType: 'jpeg'
};

// Use the library, handle any errors that are re-thrown after internal logging
thisImg(imagePath, options.width, options.height, options.channels, options.returnFileType)
  .then(processedData => {
    console.log('Processed Image Data:', processedData);
  })
 