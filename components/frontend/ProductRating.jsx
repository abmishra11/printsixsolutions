import { StarFilledIcon } from '@radix-ui/react-icons'
import { Star, StarHalf } from 'lucide-react'
import React from 'react'
import ProductReview from './productreview/ProductReview';

export default function ProductRating({ reviews }){
  const rating = reviews?.length;
  return (
    <div className="flex items-center">
      <ProductReview
        stars={
              reviews?.reduce((acc, review) => acc + review?.rating, 0) /
                reviews?.length || 0
            }
        reviews={reviews?.length}
      />
      <div className="text-xs text-gray-500 ml-3">({rating } {`${(rating === 1 || rating === 0) ? ' Review' : 'Reviews'}`})</div>
    </div>
  );
}