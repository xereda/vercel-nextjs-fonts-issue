import { PieChart } from 'react-minimal-pie-chart';
import propTypes from 'prop-types';
import style from './LimitChart.style';
import { useEffect, useState } from 'react';

LimitChart.propTypes = {
  percentage: propTypes.number,
  limiteBalance: propTypes.string,
  usedLimit: propTypes.string,
  totalLimit: propTypes.string,
};

LimitChart.defaultProps = {
  percentage: 0,
  limiteBalance: 'R$ 0,00',
  usedLimit: 'R$ 0,00',
  totalLimit: 'R$ 0,00',
};

export default function LimitChart({
  percentage,
  limiteBalance,
  usedLimit,
  totalLimit,
}) {

  const [backgroudColor, setBackgroundColor] = useState('');
  const [gaugeColor, setGageColor] = useState('');

  useEffect(() => {
    if (percentage >= 0 && percentage <= 49) {
      setBackgroundColor('var(--bds-color-green)');
      setGageColor('var(--bds-color-green-dark)');
    }
    if (percentage >= 50 && percentage <= 74) {
      setBackgroundColor('var(--bds-color-yellow-light)');
      setGageColor('var(--bds-color-yellow-dark)');
    }
    if (percentage >= 75) {
      setBackgroundColor('var(--bds-color-red-light)');
      setGageColor('var(--bds-color-red-medium)');
    }
  }, [percentage]);

  return(
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-transform">
          <PieChart
            id="chart"
            data={[{ value: 1, key: 1, color: gaugeColor }]}
            reveal={percentage}
            lineWidth={25}
            percentage={`${percentage}`}
            lengthAngle={270}
            rounded
            background={backgroudColor}
          />
        </div>
        <span id="chart-percentage">{`${percentage}%`}</span>
        <span className="label">Utilizado</span>
      </div>
      <div className="description">
        <span id="chart-limit">
          seu limite disponível para pedidos é:
        </span>

        <span id="chart-available-value">
          {limiteBalance}
        </span>

        <span id="chart-desc">
          Você está utilizando
          <span id="used-value" style={{color: gaugeColor}}>
            {` ${usedLimit} `}
          </span>
          do seu limite total de
          <span id="total">
            {` ${totalLimit} `}
          </span>
        </span>

      </div>

      <style jsx="true">{style}</style>
    </div>
  );
}
