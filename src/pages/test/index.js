import React, { useRef, useState } from 'react';
import { Image as ImageJS } from 'image-js';
import Image from 'next/image';

export default function TestPage() {
  // Image ref
  const imageRef = useRef(null);

  const [imgUrl, setImgUrl] = useState(null);

  // Process Image
  const processImage = async (imgUrl) => {
    const image = await ImageJS.load(imgUrl.src);

    // Convert to grey
    const grey = image.grey({ algorithm:'lightness' });

    // Mask
    var mask = grey.mask({ algorithm: 'li' });

    // Roi Manager
    var manager = image.getRoiManager();

    // Manager from mask
    manager.fromMask(mask);

    // Rois
    var rois = manager.getRois({
      positive: true,
      negative: false,
      minSurface: 300
    });

    // Sort rois
    rois.sort((a, b) => b.surface - a.surface);

    // Pill mask
    var pillMask = rois[0].getMask({ scale: 1, kind: 'filled' });

    // Pill
    var pill = image.extract(pillMask);

    // Width
    const width = Math.max(image.width - (2 * 5), 0);

    // Height
    const height = Math.max(image.height - (2 * 5), 0);

    // Cropped Image
    const croppedImage = pill.crop({  x: 2,  y: 2, width, height });

    // Get Data URL
    const imageDataURL = croppedImage.toDataURL();

    // Gray Image Ref
    imageRef.current.src = imageDataURL;
  };


  // Return View
  return (
    <div>
      <div style={{ marginTop: '30px' }}>
        <span style={{ marginRight: '10px' }}>Select an image file:</span>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              setImgUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
      </div>
      {imgUrl && (
        <div className="images-container">
          <div className="image-card">
            <div style={{ margin: '10px' }}>↓↓↓ The original image ↓↓↓</div>
            <Image
              alt="Original input"
              src={imgUrl}
              width={400}
              height={600}
              onLoad={(e) => {
                processImage(e.target);
              }}
            />
          </div>
          <div className="image-card">
            <div style={{ margin: '10px' }}>↓↓↓ The gray scale image ↓↓↓</div>
            <Image alt="Original input" ref={imageRef} width={400} height={600} />
          </div>
        </div>
      )}
    </div>
  );
}
