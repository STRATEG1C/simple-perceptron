import React, { useState, useRef } from "react";
import Perceptron from "./Perceptron";
import ColorsMatrix from "./ColorsMatrix";
import { trainingData } from "./data-set";

const initialColorMatrix = Array(6).fill(undefined).map(()=>Array(4).fill(undefined));

const App: React.FC = () => {
    const perceptron = useRef(new Perceptron());

    const [epochNumber, setEpochNumber] = useState(50);
    const [bias, setBias] = useState(1);
    const [teachingTimeMs, setTeachingTimeMs] = useState(0);
    const [trainedTimes, setTrainedTimes] = useState(0);
    const [trainedWeights, setTrainedWeights] = useState<number[] | null>(null)
    const [colorsMatrix, setColorsMatrix] = useState<number[][]>([...initialColorMatrix]);

    const onTeachPerceptron = (): void => {
        if (!perceptron.current) return;
        
        const startTime = Date.now();

        const trainingDataWithBias = trainingData.map((item) => { item.input[0] = bias; return item });

        const result = perceptron.current.fit(epochNumber, trainingDataWithBias);

        const finishTime = Date.now();

        setTrainedWeights(result.weights);
        setTeachingTimeMs(finishTime - startTime);
        setTrainedTimes(trainedTimes + 1);
    }

    const onPredict = (x: number, y: number) => {
        if (!perceptron.current) return;

        const res = perceptron.current.predict([bias, x, y]);

        setColorsMatrix((prev) => {
            prev[x][y] = res;
            return [...prev];
        });
    }

    return (
        <div className="application">
            <h1 className="heading">Simple Perceptron</h1>
            <div className="devided-box">
                <div>
                    <ColorsMatrix matrix={colorsMatrix} onClickCell={onPredict} />
                </div>
                <div className="teaching-form">
                    <p className="teaching-form-heading">Teach Perceptron</p>
                    <div className="epoch-input">
                        <label htmlFor="epoch-input">Epoch num: </label>
                        <input
                            id="epoch-number-input"
                            value={epochNumber}
                            type="number"
                            onChange={({ target }) => setEpochNumber(Number(target.value))}
                        />
                    </div>
                    <div className="bias-input">
                        <label htmlFor="bias-input">Bias: </label>
                        <input
                            id="epoch-number-input"
                            value={bias}
                            type="number"
                            onChange={({ target }) => setBias(Number(target.value))}
                        />
                    </div>
                    <button className="teach-btn" onClick={onTeachPerceptron}>Teach</button>
                    <p>Teaching time: {teachingTimeMs}</p>
                    <p>Trained times: {trainedTimes}</p>
                    {trainedWeights && (
                      <p>Trained weights: [{trainedWeights[0]}, {trainedWeights[1]}, {trainedWeights[2]}]</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
