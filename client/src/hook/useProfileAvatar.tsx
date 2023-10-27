import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import DefaultImage from '../../public/John.jpg';
import Avatar0 from '../../public/teepee.jpg';
import Avatar1 from '../../public/avatars/avatar1.svg';
import Avatar2 from '../../public/avatars/avatar2.svg';
import Avatar3 from '../../public/avatars/avatar3.svg';
import Avatar4 from '../../public/avatars/avatar4.svg';
import Avatar5 from '../../public/avatars/avatar5.svg';
import Avatar6 from '../../public/avatars/avatar6.svg';
import Avatar8 from '../../public/avatars/avatar8.svg';
import Avatar9 from '../../public/avatars/avatar9.svg';
import Avatar10 from '../../public/avatars/avatar10.svg';
import Avatar11 from '../../public/avatars/avatar11.svg';
import Avatar12 from '../../public/avatars/avatar12.svg';
import Avatar13 from '../../public/avatars/avatar13.svg';
import Avatar14 from '../../public/avatars/avatar14.svg';
import { ImageDictionary } from '@/app/appearance/page';

const useProfileAvatar = (key: string) => {

  console.log("key", key);

  const imageDictionary: ImageDictionary = {
    zero: Avatar0,
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

  // get image from image dictionary using key
  if (imageDictionary.hasOwnProperty(key)) {
    return imageDictionary[key];
  }

  return DefaultImage;
}

export default useProfileAvatar;
