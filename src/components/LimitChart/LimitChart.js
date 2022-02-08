import { PieChart } from 'react-minimal-pie-chart';
import propTypes from 'prop-types';
import style from './LimitChart.style';

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

  return(
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-transform">
          <PieChart
            id="chart"
            data={[{ value: 1, key: 1, color: 'green' }]}
            reveal={percentage}
            lineWidth={25}
            percentage={`${percentage}`}
            lengthAngle={270}
            rounded
            background="#2AD178"
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
          <span id="used-value">
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
