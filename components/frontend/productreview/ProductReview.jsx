import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

export default function ProductReview({ stars, reviews}) {
  const ratingStar = Array.from(
    {length: 5}, (elem, index) => {
        let number = index  + 0.5;
        return(
            <span key={index}>
                {stars >= index+1 ? (
                    <FaStar />
                ) : stars >= number ? (
                    <FaStarHalfAlt />
                ) : (
                    <AiOutlineStar />
                )}
            </span>
        )
    }
  )
  return (
    <div className='flex items-center text-yellow-400 text-xl'>
        {ratingStar}
    </div>
  )
}
