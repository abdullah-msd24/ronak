import React from 'react';

const UserReviews = ({ reviews }) => {
    return (
        <div className="user-reviews">
            <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li key={review.id} className="border p-4 rounded-lg shadow">
                            <h3 className="font-bold">{review.title}</h3>
                            <p>{review.content}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserReviews;