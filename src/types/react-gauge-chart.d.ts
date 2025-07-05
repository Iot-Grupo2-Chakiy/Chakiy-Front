declare module 'react-gauge-chart' {
  interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    arcPadding?: number;
    animate?: boolean;
    needleTransitionDuration?: number;
    percent: number;
    textColor?: string;
    colors?: string[];
    needleColor?: string;
    needleBaseColor?: string;
    hideText?: boolean;
    formatTextValue?: (value: string) => string;
    className?: string;
    style?: React.CSSProperties;
    cornerRadius?: number;
    marginInPercent?: number;
    [key: string]: any;
  }

  const GaugeChart: React.FC<GaugeChartProps>;
  export default GaugeChart;
}