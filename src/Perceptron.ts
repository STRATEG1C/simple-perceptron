class Perceptron {
  constructor(
    private readonly _weights = [0, 0, 0],
  ) {
    // (1) initialization
  }

  private _heaviside(weightedSum: number) {
    // (2) activation
    return weightedSum >= 0 ? 1 : 0;
  }

  private _calculateWeightedSum(input: number[]): number {
    // (3) calculates the weighted sum
    let weightedSum = 0;

    if (this._weights.length === input.length) {
      input.forEach((x, i) => weightedSum += x * this._weights[i]);
    } else {
      console.error("Length of weights and inputs doesn't match");
    }

    return weightedSum;
  }

  public predict(input: number[]): number {
    // (4) prediction
    const weightedSum = this._calculateWeightedSum(input);
    return this._heaviside(weightedSum);
  }

  public fit(iterations: number, trainingData: { input: number[]; target: number; }[]): { errors: number[], weights: number[] } {
    // (5) trains our algorithm and updates our weights
    let errors = [];

    for (let i = 0; i < iterations; i++) {
      const randomIndexOfTrainingData = Math.floor(
        Math.random() * trainingData.length
      );
      const selectedTrainingData = trainingData[randomIndexOfTrainingData];

      const input = selectedTrainingData.input;
      const target = selectedTrainingData.target;

      const calculatedTarget = this.predict(input);
      const error = target - calculatedTarget;

      this._updateWeights(error, input, target);

      errors.push(error);
    }

    return { errors, weights: this._weights };
  }

  _updateWeights(error: number, input: number[], target: any) {
    // (6) updates our class property weights
    input.forEach((x, i) => {
      this._weights[i] = this._weights[i] + error * x;
    });
  }
}

export default Perceptron;
