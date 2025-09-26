import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const kpis = [
  { title: "Total Reservations Today", value: 42, color: "", icon: "👥" },
  { title: "Total Check-ins", value: 26, color: "", icon: "🏢" },
  { title: "Overstay Alerts", value: 2, color: "", icon: "⏳" },
  { title: "Escalated Incidents", value: 1, color: "", icon: "🚨" },
];

export default function Dashboard() {
  // const [incidents, setIncidents] = useState([
  //   { time: "10:15 AM", message: "Visitor in restricted zone", type: "alert" },
  //   { time: "09:45 AM", message: "Overstay alert triggered", type: "warning" },
  // ]);

  // const [pendingRequests, setPendingRequests] = useState([
  //   { visitorName: "John Doe", purpose: "Client Meeting", time: "10:45 AM" },
  //   {
  //     visitorName: "Jane Smith",
  //     purpose: "Maintenance Work",
  //     time: "11:00 AM",
  //   },
  //   { visitorName: "Ali Khan", purpose: "Delivery", time: "11:15 AM" },
  // ]);

  // const handleApprove = (index) => {
  //   const approved = pendingRequests[index];
  //   alert(`Approved: ${approved.visitorName}`);
  //   setPendingRequests((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleReject = (index) => {
  //   const rejected = pendingRequests[index];
  //   alert(`Rejected: ${rejected.visitorName}`);
  //   setPendingRequests((prev) => prev.filter((_, i) => i !== index));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newIncident = {
  //       time: new Date().toLocaleTimeString(),
  //       message:
  //         Math.random() > 0.5
  //           ? "Random security check triggered"
  //           : "Suspicious activity detected",
  //       type: Math.random() > 0.5 ? "alert" : "warning",
  //     };
  //     setIncidents((prev) => [newIncident, ...prev].slice(0, 5));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const chartRef = useRef(null);

  const barChartData = {
    labels: [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
    ],
    datasets: [
      {
        label: "Visitors",
        data: [2, 10, 5, 15, 4, 3, 8, 4, 6, 9],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          // Gradient from solid blue to transparent
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#2196f3"); // top - blue
          gradient.addColorStop(0.5, "rgba(33,150,243,1)"); // mid
          gradient.addColorStop(1, "rgba(33,150,243,0.3)"); // bottom transparent
          return gradient;
        },
        borderRadius: { topLeft: 22, topRight: 22 },
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Hourly Reservations",
        font: { size: 20, weight: "bold" },
        color: "#0d47a1",
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#0d47a1",
        bodyColor: "#333",
        borderColor: "#42a5f5",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} visitors`;
          },
        },
      },
      datalabels: {
        color: "#000",
        font: { weight: "bold", size: 14 },
        anchor: "end",
        align: "top",
        formatter: (value) => value,
      },
    },
    animation: {
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 150;
        }
        return delay;
      },
      duration: 1000,
      easing: "easeOutQuart",
      animateScale: true,
      animateRotate: false,
    },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 14, weight: "bold" } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#555", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(0,0,0,0.05)" },
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Reservations",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Security Command Dashboard</h2>
      </header>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <span className="kpi-icon">{kpi.icon}</span>
            <div>
              <h5>{kpi.title}</h5>
              <span className="kpi-value">{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="main-grid">
        <div className="widget-card wide">
          <Bar ref={chartRef} data={barChartData} options={barChartOptions} />
        </div>

        {/* <div className="widget-card">
          <h5>Live Incident Feed</h5>
          <div className="incident-feed">
            {incidents.map((incident, idx) => (
              <div key={idx} className={`incident-item ${incident.type}`}>
                <strong>{incident.time}</strong> — {incident.message}
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="widget-card">
          <h5>Pending Approvals</h5>
          {pendingRequests.length === 0 ? (
            <p className="no-requests">No pending approvals</p>
          ) : (
            <ul className="approval-list">
              {pendingRequests.map((request, index) => (
                <li key={index} className="approval-item">
                  <div className="approval-info">
                    <strong>{request.visitorName}</strong> — {request.purpose}
                    <br />
                    <small>{request.time}</small>
                  </div>
                  <div className="approval-actions">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(index)}
                    >
                      <span className="btn-icon">✔</span> Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(index)}
                    >
                      <span className="btn-icon">✖</span> Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
}
