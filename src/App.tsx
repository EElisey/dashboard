import { useState } from "react";
import metricsData from "./data/metrics.json";
import { Chart } from "./components/Chart";
import { Table } from "./components/Table";

const typedMetricsData = metricsData as any;

function App() {
  const [selected, setSelected] = useState("Выручка, руб");

  const days = typedMetricsData.days;
  const currentIndex = days.length - 1;
  const yesterdayIndex = days.length - 2;
  const weekDayIndex = days.length - 7;

  const topRowData = {
    "Выручка, руб": {
      today: typedMetricsData["Выручка, руб"][currentIndex],
      yesterday: typedMetricsData["Выручка, руб"][yesterdayIndex],
      weekDay: typedMetricsData["Выручка, руб"][weekDayIndex],
      diff: (
        ((typedMetricsData["Выручка, руб"][currentIndex] -
          typedMetricsData["Выручка, руб"][yesterdayIndex]) /
          typedMetricsData["Выручка, руб"][yesterdayIndex]) *
        100
      ).toFixed(1),
    },
  };

  const filteredMetricsData = Object.fromEntries(
    Object.entries(typedMetricsData).filter(([key]) => key !== "Выручка, руб")
  ) as any;

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          marginBottom: "24px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderSpacing: "5px",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: 600,
                  backgroundColor: "#EEEEEE",
                  width: "25%",
                }}
              >
                Показатель
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: 600,
                  backgroundColor: "#90CAF9",
                  width: "25%",
                }}
              >
                Текущий день
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: 600,
                  width: "25%",
                  backgroundColor: "#EEEEEE",
                }}
              >
                Вчера
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "center",
                  fontWeight: 600,
                  width: "25%",
                  backgroundColor: "#EEEEEE",
                }}
              >
                Этот день недели
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(topRowData).map(([key, value]) => {
              const diffNumber = Number(value.diff);
              const hasValidDiff = !isNaN(diffNumber);
              const diffBgColor = hasValidDiff
                ? diffNumber >= 0
                  ? "#C6F6D5"
                  : "#FEB2B2"
                : "#EEEEEE";

              return (
                <tr key={key} style={{ borderBottom: "1px solid #EDF2F7" }}>
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: 500,
                      backgroundColor: "#EEEEEE",
                    }}
                  >
                    {key}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      backgroundColor: "#90CAF9",
                    }}
                  >
                    {value.today.toLocaleString("ru-RU")}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      backgroundColor: diffBgColor,
                    }}
                  >
                    {value.yesterday.toLocaleString("ru-RU")}
                    {hasValidDiff && (
                      <span
                        style={{
                          color: diffNumber >= 0 ? "#38A169" : "#E53E3E",
                          marginLeft: "8px",
                          fontSize: "0.9em",
                        }}
                      >
                        {value.diff}%
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      backgroundColor: diffBgColor,
                    }}
                  >
                    {value.weekDay.toLocaleString("ru-RU")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Chart
        label={selected}
        data={typedMetricsData[selected]}
        days={typedMetricsData.days}
      />

      <Table
        metrics={filteredMetricsData}
        onSelect={setSelected}
        selected={selected}
      />
    </div>
  );
}

export default App;
