import React, { useEffect, useState } from 'react'
import StarRating from 'react-star-ratings';

interface Props {
   initialRating?: any
   onChangeRating?: any
   readOnly?: boolean
}

export default function StarsRating({ initialRating = 0, onChangeRating, readOnly=false }: Props) {
   const [rating, setRating] = useState(0);

   useEffect(() => {
      setRating(initialRating)
   }, [initialRating]);

   useEffect(() => {
      onChangeRating && onChangeRating(rating)
   }, [rating])


   if (readOnly) return (
      <StarRating 
         rating={rating}
         starRatedColor="orange"
         numberOfStars={5}
         name="rating"
         starDimension="15px"
         starSpacing="2px"
      />
   )
   return (
      <StarRating 
         rating={rating}
         starRatedColor="orange"
         changeRating={(rating) => {
            setRating(rating)
         }}
         numberOfStars={5}
         name="rating"
         starDimension="15px"
         starSpacing="2px"
      />
   )
}

// LEGACY CODE
{/* <StarRating 
         rating={rating}
         starRatedColor="orange"
         changeRating={(rating) => {
            setRating(rating)
         }}
         numberOfStars={5}
         name="rating"
         starDimension="15px"
         starSpacing="2px"
      /> */}