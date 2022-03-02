const Jimp = require('jimp')
async function textOverlay() {
   // Reading image
   const profile = await Jimp.read('./image/welcome/profile.jpg')
   const imageOne = await Jimp.read('./image/welcome/1.png')
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
   
   profile.resize(200, 200)
   
   imageOne.blit(profile, 1111.50, 389.11 )
   
   // Writing image after processing
   await image.writeAsync('./image/welcome.png');
}

textOverlay();
console.log("Image is processed succesfully");
