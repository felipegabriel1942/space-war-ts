export class ImageUtils {
    static createImage(imageSrc: string): HTMLImageElement {
        const image = new Image();
        image.src = imageSrc;
        return image;
      } 
}