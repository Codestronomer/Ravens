'use client'

import Image from "next/image";
import error404 from '../../public/error404.svg';
import styles from '@/app/page.module.css';

export default function NotFoundPage() {

  return (
    <div className={styles.errorSVG}>
      <center>
        <Image
          src={error404}
          width={400}
          height={400}
          alt="Lost astronaut error"
        />
      </center>
    </div>
  )
}