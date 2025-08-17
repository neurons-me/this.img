/* 
this.img.browser.js
🆂🆄🅸🅶🅽
Loading the Image: Using a helper function loadImage, which returns an HTMLImageElement that can be used on a canvas.
 This function supports loading from both URLs and Blob objects.

Drawing the Image on Canvas: Setting up a canvas element, drawing the image onto it with the specified dimensions (resizing it in the process).

Extracting the Processed Image: Converting the canvas content to a Blob of the specified image format,
then converting that Blob to an ArrayBuffer for further use or manipulation.

Logging and Output: Providing success and error logs through predefined logging functions and returning 
the processed image data or error via promises.
*/

/**
 * Simulates image processing in the browser using canvas.
 * 
 * @param {string | Blob} imageFile - The URL or Blob of the image.
 * @param {number} [width=64] - Desired width of the output image.
 * @param {number} [height=64] - Desired height of the output image.
 * @param {number} [channels=3] - Number of color channels, ignored in this dummy implementation.
 * @param {string} [returnFileType='jpeg'] - Desired file type for the output image.
 * @returns {Promise<{buffer: ArrayBuffer, metadata: object}>} A promise that resolves with the processed image data.
 */
async function thisImg(imageFile, width = 64, height = 64, channels = 3, returnFileType = 'jpeg') {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const img = await loadImage(imageFile);
        ctx.drawImage(img, 0, 0, width, height);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, `image/${returnFileType}`));
        const buffer = await blob.arrayBuffer();

        const metadata = {
            width,
            height,
            format: returnFileType
        };

        // Log success and return the processed image data.
        return { buffer, metadata };
    } catch (error) {
        // Log error and reject the promise with the error.
        return Promise.reject(error);
    }
}

/**
 * Helper function to load an image from a URL or Blob.
 * 
 * @param {string | Blob} imageFile - The URL or Blob of the image.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image.
 */
function loadImage(imageFile) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        if (typeof imageFile === 'string') {
            img.src = imageFile;
        } else {
            const url = URL.createObjectURL(imageFile);
            img.src = url;
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
        }
    });
}

console.log("this.img.browser.js Loaded.");
export default thisImg;
