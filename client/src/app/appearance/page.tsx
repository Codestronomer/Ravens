'use client'
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Avatar1 from '../../../public/avatars/avatar1.svg';
import Avatar2 from '../../../public/avatars/avatar2.svg';
import Avatar3 from '../../../public/avatars/avatar3.svg';
import Avatar4 from '../../../public/avatars/avatar4.svg';
import Avatar5 from '../../../public/avatars/avatar5.svg';
import Avatar6 from '../../../public/avatars/avatar6.svg';
import Avatar8 from '../../../public/avatars/avatar8.svg';
import Avatar9 from '../../../public/avatars/avatar9.svg';
import Avatar10 from '../../../public/avatars/avatar10.svg';
import Avatar11 from '../../../public/avatars/avatar11.svg';
import Avatar12 from '../../../public/avatars/avatar12.svg';
import Avatar13 from '../../../public/avatars/avatar13.svg';
import Avatar14 from '../../../public/avatars/avatar14.svg';
import ProfileImage from '../../../public/user-svgrepo-com.svg';
import styles from './appearance.module.css';
import ThemeToggle from '@/components/themeToggle';

const avatars = [
    Avatar1, Avatar2, Avatar3,
    Avatar4, Avatar5, Avatar6, 
    Avatar8, Avatar9, Avatar10, 
    Avatar11, Avatar12, Avatar13, Avatar14
  ];

type ImageDictionary = {
  [key: string]: StaticImageData;
};

const imageDictionary: ImageDictionary = {
  one: Avatar1,
  two: Avatar2,
  three: Avatar3,
  four: Avatar4,
  five: Avatar5,
  six: Avatar6,
  eight: Avatar8,
  nine: Avatar9,
  ten: Avatar10,
  eleven: Avatar11,
  twelve: Avatar12,
  thirteen: Avatar13,
  fourteen: Avatar14,
};

interface ImageDataType {
  image: StaticImageData,
  key: string
}

const AppearanceSelector = () => {
  const [currentImage, setCurrentImage] = useState<ImageDataType>({
    image: ProfileImage,
    key: 'zero'
  });

  // get image from image dictionary using key
  const getImageByKey = (key: string) => {
    if (imageDictionary.hasOwnProperty(key)) {
      return imageDictionary[key];
    }

    return '';
  };

  const handleImage = (key: string) => {
    const image = imageDictionary[key];

    setCurrentImage({image, key});
  }

  return (
    <div className={styles.main}>
      <div className={styles.rightTop}>
          <ThemeToggle />
       </div>
      <div className={styles.brandHeader}>
        Raven
      </div>
      <div>
        <div className={styles.containerText}>{"Let's personalize your experience!"}</div>
        <div className={styles.container}>
          <div className={styles.currentImage}>
            <div className={currentImage.key != 'zero' ? styles.selected : ''}></div>
            <Image 
              src={currentImage.image}
              alt='profileImage'
              height={42}
              width={42} />
          </div>
          <div className={styles.images}>
            {Object.keys(imageDictionary).map((key) => {
              return (
                <div 
                  key={key} 
                  onClick={() => handleImage(key)} 
                  className={styles.image}
                >
                  <div className={currentImage.key == key ? styles.selected : ''}></div>
                  <Image src={getImageByKey(key)} alt={`Avatar ${key}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


export default AppearanceSelector;