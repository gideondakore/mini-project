import React from "react";
import { Rating } from "react-simple-star-rating";
const starRate = ({ rating }: { rating: number | null | undefined }) => {
  return (
    <div>
      {rating && (
        <Rating
          initialValue={rating}
          readonly={true}
          allowFraction={true}
          size={25}
        />
      )}
    </div>
  );
};

export default starRate;
