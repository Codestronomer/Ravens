'use client'
import useDarkMode from 'use-dark-mode';
import { useRouter } from 'next/navigation';
import styles from './appearance.module.css';
import ThemeToggle from '@/components/themeToggle';
import React, { useContext, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { axiosPut, baseUrl } from '@/services/backend';
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
import ImageSelected from '../../../public/imageSelected.svg';
import ProfileImage from '../../../public/user-svgrepo-com.svg';
import { AuthContext, AuthContextType } from '@/context/authContext';
import ErrorModal from '@/components/ErrorModal';

export type ImageDictionary = {
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
  const router = useRouter();
  // const { theme } = useContext(Theme) as ThemeContextType;
  const theme = useDarkMode(false);
  const { user } = useContext(AuthContext) as AuthContextType;
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

  const handleClick = async (key: string) => {
    if (key) {
      const response = await axiosPut(`${baseUrl}/users/${user.id}/avatar`, { key });

      if (response.error) {
        console.log(response.error);
      } else {
        router.push('/chat');
      }

    }
  }

  return (
    <div 
      className={`${styles.main} ${theme.value == true ? 'dark' : ''} `} 
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
    >
      <div className={styles.rightTop}>
          <ThemeToggle />
       </div>
      <div className={styles.brandHeader}>
        Raven
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.containerText}>{"Let's personalize your experience!"}</div>
        <div className={styles.container}>
          <div className={currentImage.key === 'zero' ? styles.currentImage : styles.currentImageSelected}>
            {
              currentImage.key !== 'zero' && (
                <div className={styles.selected}>
                  <Image src={ImageSelected} alt='selected-icon' />
                </div>
              )
            }
            <Image 
              src={currentImage.image}
              alt='profileImage'
              height={42}
              width={42}
            />
          </div>
          <span className={styles.avatarText}>Choose your avatar</span>
          <div className={styles.images}>
            {Object.keys(imageDictionary).map((key) => {
              return (
                <div 
                  key={key} 
                  onClick={() => handleImage(key)} 
                  className={currentImage.key == key ? styles.imageSelected : styles.image}
                >
                  {
                    currentImage.key == key && (
                      <div className={styles.selected}>
                        <Image src={ImageSelected} alt='selected-icon' />
                      </div>
                    )
                  }
                  <Image src={getImageByKey(key)} alt={`Avatar ${key}`} />
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.submitButton} onClick={() => handleClick(currentImage.key)}>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}


export default AppearanceSelector;