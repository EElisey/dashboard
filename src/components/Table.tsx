import { MetricKey, MetricsData } from "../types/types";

type TableProps = {
  metrics: MetricsData;
  onSelect: (label: MetricKey) => void;
  selected?: MetricKey;
};

export function Table({ metrics, onSelect, selected }: TableProps) {
  const keys = Object.keys(metrics).filter((k) => k !== "days");
  const days = metrics.days;
  const currentIndex = days.length - 1;
  const yesterdayIndex = days.length - 2;
  const weekDayIndex = days.length >= 7 ? days.length - 7 : 0;

  const rowStyle: React.CSSProperties = {
    cursor: "pointer",
    backgroundColor: "white",
    borderBottom: "1px solid #E2E8F0",
  };

  const selectedRowStyle: React.CSSProperties = {
    ...rowStyle,
    backgroundColor: "#BEE3F8",
    fontWeight: 500,
  };

  return (
    <table
      style={{
        width: "100%",
        borderSpacing: "5px",
        backgroundColor: "white",
        marginTop: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <tbody>
        {keys.map((key) => {
          const today = metrics[key][currentIndex];
          const yesterday = metrics[key][yesterdayIndex];
          const weekDay = metrics[key][weekDayIndex];

          const diff =
            yesterday !== 0
              ? +(((today - yesterday) / yesterday) * 100).toFixed(1)
              : 0;

          let backgroundColor = "#EEEEEE";
          if (yesterday !== 0) {
            backgroundColor =
              diff > 0 ? "#C6F6D5" : diff < 0 ? "#FEB2B2" : "#EEEEEE";
          }

          return (
            <tr
              key={key}
              onClick={() => onSelect(key)}
              style={selected === key ? selectedRowStyle : rowStyle}
            >
              <td
                style={{
                  padding: "16px",
                  fontWeight: selected === key ? 500 : 400,
                  backgroundColor: "#EEEEEE",
                  width: "25%",
                }}
              >
                {key}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: selected === key ? 500 : 400,
                  backgroundColor: "#90CAF9",
                  width: "25%",
                }}
              >
                {today.toLocaleString("ru-RU")}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: selected === key ? 500 : 400,
                  backgroundColor,
                  width: "25%",
                }}
              >
                {yesterday.toLocaleString("ru-RU")}
                {yesterday !== 0 && (
                  <span
                    style={{
                      color: diff >= 0 ? "#38A169" : "#E53E3E",
                      marginLeft: "8px",
                      fontSize: "0.9em",
                    }}
                  >
                    {diff}%
                  </span>
                )}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: selected === key ? 500 : 400,
                  backgroundColor: !!diff ? "#C6F6D5" : "#EEEEEE",
                  width: "25%",
                }}
              >
                {weekDay.toLocaleString("ru-RU")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
