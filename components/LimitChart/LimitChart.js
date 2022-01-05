import { PieChart } from "react-minimal-pie-chart";

import global from './LimitChart.style.js'
import { toMoneyMask } from "../utils/helper.js";

export default function LimitChart() {
  
  return(
    <div className="chart-container">
      <div className="chart-wrapper">
        <div className="chart-transform">
          <PieChart
            id="chart"
            data={[{ value: 1, key: 1 }]}
            reveal={1}
            lineWidth={25}
            percentage="1"
            lengthAngle={270}
            rounded
            background="#2AD178"
          />
        </div>
        <span id="chart-percentage">1%</span>
        <span className="label">Utilizado</span>
      </div>
      <div className="description">
        <span id="chart-limit">
          seu limite disponível para pedidos é:
        </span>

        <span id="chart-available-value">
          {` ${toMoneyMask(49938564.42)} `}
        </span>

        <span id="chart-desc">
          Você está utilizando
          <span id="used-value">
            {` ${toMoneyMask(61435.58)} `}
          </span>
            do seu limite total de
          <span id="total">
            {` ${toMoneyMask(50000000)} `}
          </span>
        </span>
    
      </div>

      <style jsx global>
        {global}
      </style>

    </div>
  )
}