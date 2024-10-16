export const getAverageBrightness = (imageSrc, callback) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = 'Anonymous'; 
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
  
      let r, g, b, avg;
      let colorSum = 0;
  
      for (let i = 0; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        avg = Math.floor((r + g + b) / 3); 
        colorSum += avg;
      }
  
      const brightness = Math.floor(colorSum / (img.width * img.height)); 
      callback(brightness);
    };
  };
  