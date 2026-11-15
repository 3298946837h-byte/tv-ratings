import React from 'react';

interface RadarData {
  criticPraise: number;     // 专业口碑
  popularBuzz: number;      // 大众热度
  chineseTaste: number;     // 华语受众
  plotConsistency: number;  // 剧情扎实度
  endingSatisfaction: number;// 完结满意度
}

interface RadarChartProps {
  data: RadarData;
  compareData?: RadarData;
  name?: string;
  compareName?: string;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  compareData,
  name = '当前剧集',
  compareName = '对比剧集',
  size = 280,
}) => {
  const center = size / 2;
  const radius = (size / 2) - 40;
  
  const axes = [
    { key: 'criticPraise', label: '专业口碑 (MTC/RT)', angle: -Math.PI / 2 },
    { key: 'popularBuzz', label: '大众热度 (IMDb)', angle: -Math.PI / 2 + (2 * Math.PI / 5) },
    { key: 'chineseTaste', label: '华语受众 (豆瓣)', angle: -Math.PI / 2 + (4 * Math.PI / 5) },
    { key: 'plotConsistency', label: '剧情扎实度', angle: -Math.PI / 2 + (6 * Math.PI / 5) },
    { key: 'endingSatisfaction', label: '完结满意度', angle: -Math.PI / 2 + (8 * Math.PI / 5) },
  ];

  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value: number, angle: number) => {
    // value is 0-10
    const normalized = Math.max(0, Math.min(10, value)) / 10;
    const r = normalized * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const getPoints = (d: RadarData) => {
    return axes
      .map(axis => {
        const val = d[axis.key as keyof RadarData] || 5;
        const coords = getCoordinates(val, axis.angle);
        return `${coords.x},${coords.y}`;
      })
      .join(' ');
  };

  const pointsPrimary = getPoints(data);
  const pointsCompare = compareData ? getPoints(compareData) : null;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Background Grids */}
        {levels.map((level, idx) => (
          <polygon
            key={idx}
            points={axes
              .map(axis => {
                const r = level * radius;
                const x = center + r * Math.cos(axis.angle);
                const y = center + r * Math.sin(axis.angle);
                return `${x},${y}`;
              })
              .join(' ')}
            fill={idx === levels.length - 1 ? 'rgba(30, 41, 59, 0.3)' : 'none'}
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray={idx < levels.length - 1 ? '2 2' : 'none'}
          />
        ))}

        {/* Axes Lines */}
        {axes.map((axis, idx) => {
          const x = center + radius * Math.cos(axis.angle);
          const y = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#475569"
              strokeWidth="1"
            />
          );
        })}

        {/* Compare Polygon if present */}
        {pointsCompare && (
          <polygon
            points={pointsCompare}
            fill="rgba(245, 158, 11, 0.25)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        )}

        {/* Primary Polygon */}
        <polygon
          points={pointsPrimary}
          fill="rgba(56, 189, 248, 0.35)"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />

        {/* Primary Data Points */}
        {axes.map((axis, idx) => {
          const val = data[axis.key as keyof RadarData] || 5;
          const coords = getCoordinates(val, axis.angle);
          return (
            <g key={idx}>
              <circle
                cx={coords.x}
                cy={coords.y}
                r="4.5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="2"
              />
              {/* Value Text */}
              <text
                x={coords.x}
                y={coords.y - 8}
                fill="#7dd3fc"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Axis Labels */}
        {axes.map((axis, idx) => {
          const textRadius = radius + 22;
          const x = center + textRadius * Math.cos(axis.angle);
          const y = center + textRadius * Math.sin(axis.angle);
          return (
            <text
              key={idx}
              x={x}
              y={y + 4}
              fill="#cbd5e1"
              fontSize="11"
              fontWeight="500"
              textAnchor={
                Math.abs(x - center) < 10 ? 'middle' : x > center ? 'start' : 'end'
              }
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      {/* Legend if comparing */}
      {compareData && (
        <div className="flex items-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
            <span className="text-slate-200 font-medium">{name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="text-slate-200 font-medium">{compareName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
