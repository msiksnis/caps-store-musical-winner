import RatingStars from "./RatingStars";

interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

interface ReviewsProps {
  /** An array of reviews to display */
  reviews: Review[];
}

/**
 * Renders a list of reviews with ratings and descriptions.
 *
 * @param reviews - An array of review objects to display.
 * @returns A JSX element displaying the list of reviews.
 */

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="mt-10 flex w-full flex-col gap-4 md:flex-row">
      {reviews.map((review) => (
        <div
          className="flex w-full justify-center rounded-2xl bg-muted p-10"
          key={review.id}
        >
          <div className="flex flex-col justify-center space-y-4">
            <p className="inline max-w-96 text-balance font-light text-muted-foreground">
              {review.description}
            </p>
            <div className="w-fit space-y-2">
              <RatingStars rating={review.rating} />
              <p className="w-fit font-medium">{review.username}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
