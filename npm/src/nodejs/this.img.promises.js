// this.img.promises.js
//stupid promises

export const thisImageSuccess = (result) => {
    console.log('This.Img:');
  };
  
  export const thisImageError = (error) => {
    console.error("Error processing image", error);
  };
  // You can define more specific promise handlers as needed
  