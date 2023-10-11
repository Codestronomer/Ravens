import React from 'react';
import Image from 'next/image';
import Avatar1 from '../../../public/avatars/avatar1.svg';
import Avatar2 from '../../../public/avatars/avatar2.svg';
import Avatar3 from '../../../public/avatars/avatar3.svg';
import Avatar4 from '../../../public/avatars/avatar4.svg';
import Avatar5 from '../../../public/avatars/avatar5.svg';
import Avatar6 from '../../../public/avatars/avatar6.svg';
import Avatar7 from '../../../public/avatars/avatar7.svg';
import Avatar8 from '../../../public/avatars/avatar8.svg';
import Avatar9 from '../../../public/avatars/avatar9.svg';

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8];

const AppearanceSelector = () => {

  // const images = {
  //   "one": Avatar1,
  //   "two": Avatar2,
  //   "three": Avatar3,
  //   "four": Avatar4,
  //   "five": Avatar5,
  //   "six": Avatar6,
  //   "seven": Avatar7,
  //   "eight": Avatar8,
  // }


  return (
    <div>
      <div>{"Let's personalize your experience"}</div>
      <div>
        {avatars.map((avatar, index) => {
          return (
            <div key={index}>
              <Image src={avatar} alt={`Avatar ${index + 1}`} />
            </div>
          )
        })}
      </div>
    </div>
  );
}


export default AppearanceSelector;