interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: Array<number>): Result => {
  const target = 2;
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average =
    dailyExerciseHours.reduce((sum, hours) => sum + hours) / periodLength;

  const success = average >= target;

  interface Ratings {
    rating: number;
    ratingDescription: string;
  }

  const getRating = (average: number, target: number): Ratings => {
    if (average >= target) {
      return { rating: 3, ratingDescription: 'well done, keep this going' };
    } else if (average >= 0.75 * target) {
      return {
        rating: 2,
        ratingDescription: 'not too bad but could be better',
      };
    } else {
      return { rating: 1, ratingDescription: 'what a disappointment' };
    }
  };

  let { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
