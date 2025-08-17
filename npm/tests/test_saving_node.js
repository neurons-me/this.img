// In this.img/tests/test_saving_node.js
import thisImg from '../index.js'; 
import fs from 'fs';

// Assuming this is in your test_node.js where you test the processing and saving
thisImg('./neurons-logo.png', 32, 32, 3, "png").then(processedImg => {
    console.log('Saving Processed image data RightPath:');
    // Make sure to access the buffer directly if that's what you intend to save
    if (processedImg.success && processedImg.buffer) {
      const extension = processedImg.metadata.format; // Or directly use returnFileType if available
      const filename = `./resized-image4.${extension}`;
      
      fs.writeFile(filename, processedImg.buffer, err => {
          if (err) {
              console.error(`Failed to save image in ${extension} format:`, err);
          } else {
              console.log(`Image successfully saved as ${filename}`);
          }
      });
    } else {
        console.log('No data to save, or processing failed:', processedImg.error);
    }
  }).catch(error => {
    console.log('Error in processing or saving image:', error);
  });
  