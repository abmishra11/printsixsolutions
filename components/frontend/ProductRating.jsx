import { StarFilledIcon } from '@radix-ui/react-icons'
import { Star, StarHalf } from 'lucide-react'
import React from 'react'

const ProductRating = () => {
  return (
    <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <StarFilledIcon />
            </span>
            <span>
              <StarFilledIcon />
            </span>
            <span>
              <StarFilledIcon />
            </span>
            <span>
              <StarFilledIcon />
            </span>
            <span>
              <Star width={15}  height={15} />

            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
  )
}

export default ProductRating