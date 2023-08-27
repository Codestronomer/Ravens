'use client'

import Image from "next/image";
import { useEffect } from "react";
import error503 from '../../public/error503.svg'

export default function Error({ error, reset }: {
  error: Error, 
  reset: () => void
  }) {
  useEffect(() => {
    // Log the error to an error report service
    console.error(error);
  }, [error])

  return (
    <>
      <center>
        <Image
          src={error503}
          width={400}
          height={400}
          alt="Lost astronaut error"
        />
      </center>
    </>
  )
}