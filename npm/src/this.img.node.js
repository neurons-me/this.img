// src/this.img.node.js
import ImgFormatterNode from './nodejs/imgFormatter.node.js';
import PRESETS from './this.img.presets.js';

/**
 * Processes an image by resizing, optionally changing its color space, and converting it to the specified format.
 * This Node.js version uses the ImgFormatterNode to handle image processing.
 *
 * @param {string | Blob} imageFile - The image file path or Blob.
 * @param {object | string} options - The options object containing width, height, channels, and format, or a string key for a preset.
 * @returns {Promise<{buffer: Buffer, metadata: object}>} A promise that resolves with the processed image data.
 */
async function thisImg(imageFile, options = 'default64') {
    //console.log(`Received options: ${JSON.stringify(options)}`); // Debug log to see what options are received

    if (typeof options === 'string' && options in PRESETS) {
      //  console.log("Using preset:", options); // Log which preset is being used
        options = PRESETS[options];
    } else if (typeof options === 'object') {
        options = { ...PRESETS['default64'], ...options }; // Merge with default to fill missing values
    } else {
        options = PRESETS['default64']; // Use default if options are invalid
    }

    const { width, height, channels, format } = options;
    console.log(`Using settings - Width: ${width}, Height: ${height}, Channels: ${channels}, Format: ${format}`); // Log final settings being used

    try {
        const formatter = new ImgFormatterNode(imageFile, width, height, channels, format);
        const processedImage = await formatter.process();
        return processedImage;
    } catch (error) {
        return Promise.reject(error);
    }
}

console.log("this.img.node.js .Loaded.");
export default thisImg;
