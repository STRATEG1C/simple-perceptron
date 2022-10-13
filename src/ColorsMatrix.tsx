import React from 'react';

interface Props {
    matrix: number[][],
    onClickCell: (x: number, y: number) => void;
}

const ColorsMatrix: React.FC<Props> = ({ matrix, onClickCell }: Props) => {
    return (
        <div className="matrix-box">
            <div className="matrix">
                {matrix.map((xAxis, i) => {
                    return (
                        <div className="row" key={i}>
                            {xAxis.map((yCell, j) => {
                                let colorClass = '';

                                if (yCell !== undefined) {
                                    colorClass = yCell === 1 ? 'green' : 'yellow';
                                }

                                return <div className={`cell ${colorClass}`} onClick={() => onClickCell(i, j)} key={j} />;
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="matrix-box-hint">green&uarr;yellow</div>
        </div>
    );
};

export default ColorsMatrix;
