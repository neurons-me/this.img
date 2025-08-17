//imgFormatter.node.js
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

/**
 * This class provides functionality to process images in a Node.js environment using the sharp library.
 * It handles resizing, color space conversion, format transformation, and flattening of image data.
 */
class ImgFormatterNode {
    /**
     * Constructs an instance of ImgFormatterNode.
     * @param {string} imagePath - The file system path to the image.
     * @param {number} width - The desired width to which the image should be resized.
     * @param {number} height - The desired height to which the image should be resized.
     * @param {number} channels - The number of color channels; typically 3 (RGB), but can be set to 1 for grayscale.
     * @param {string} returnFileType - The file format to convert the image into (e.g., 'jpeg', 'png').
     */
    constructor(imagePath, width, height, channels, returnFileType) {
        this.imagePath = imagePath;
        this.width = width;
        this.height = height;
        this.channels = channels;
        this.returnFileType = returnFileType;
    }

    /**
     * Checks if the specified image path is accessible.
     * @param {string} imagePath - The path to the image file.
     * @returns {Promise<boolean>} True if the file is accessible, false otherwise.
     */
    async isAccessible(imagePath) {
        try {
            await fs.access(imagePath, fs.constants.R_OK);
            return true;
        } catch {
            console.error(`File access error: ${imagePath}`);
            throw new Error(`File is not accessible: ${imagePath}`);
        }
    }

    /**
     * Processes the image using sharp to resize, potentially change color space, convert to a specified format, and flatten.
     * @returns {Promise<{success: boolean, buffer: Buffer, flattened: Array, metadata: Object}>}
     * A promise that resolves with the processing result. On success, it includes the image buffer, flattened array, and metadata;
     * on failure, it returns an error message.
     */
    async process() {
        try {
            const resolvedPath = path.resolve(this.imagePath);
            if (!await this.isAccessible(resolvedPath)) {
                throw new Error(`File is not accessible: ${resolvedPath}`);
            }

            let image = sharp(resolvedPath).resize(this.width, this.height);
            if (this.channels === 1) {
                image = image.grayscale(); // Convert to grayscale if 1 channel is requested
            }

            const buffer = await image.toFormat(this.returnFileType).toBuffer();
            // Flatten the buffer to a 1D array suitable for ML models
            const metadata = {
                imagePath: this.imagePath,
                width: this.width,
                height: this.height,
                channels: this.channels,
                format: this.returnFileType,
                size: buffer.length
            };

            return { success: true, buffer: buffer, metadata: metadata };
        } catch (error) {
            console.error(`Processing error: ${error.message}`);
            throw error; // Rethrow the error to be caught by thisImg
        }
    }
}

export default ImgFormatterNode;
