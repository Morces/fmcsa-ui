import React from "react";
import dayjs from "dayjs";
import BasicModal from "../../../../../components/modals/BasicModal";

const ViewLogs = ({ showView, setShowView, trip }) => {
  const dutyLabels = {
    OFF_DUTY: "Off Duty",
    SLEEPER: "Sleeper Berth",
    DRIVING: "Driving",
    ON_DUTY_NOT_DRIVING: "On Duty (Not Driving)",
  };

  const keyItems = [
    { code: "D", label: "Driving", color: "#22c55e" },
    { code: "O", label: "Off Duty", color: "#9ca3af" },
    { code: "ON", label: "On Duty (Not Driving)", color: "#f97316" },
    { code: "S", label: "Sleeper Berth", color: "#3b82f6" },
  ];

  return (
    <BasicModal
      isOpen={showView}
      onClose={() => setShowView(false)}
      title="View Logs"
      className="max-w-5xl w-full"
    >
      <div className="bg-white text-black space-y-8 print:p-0 max-w-5xl w-full">
        {/* === Header === */}
        <div className="border rounded p-2 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Driver:</strong> {trip?.driver?.name}
            </p>
            <p>
              <strong>License:</strong> {trip?.driver?.license_number}
            </p>
            <p>
              <strong>Truck:</strong> {trip?.truck?.plate_number}
            </p>
            <p>
              <strong>Route Miles:</strong> {trip?.route_distance_miles} mi
            </p>
            <p>
              <strong>Route Hours:</strong> {trip?.route_duration_hours} hrs
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Pickup:</strong> {trip?.pickup_location?.name || "--"}
            </p>
            <p>
              <strong>Dropoff:</strong> {trip?.dropoff_location?.name || "--"}
            </p>
            <p>
              <strong>Status:</strong> {trip?.status}
            </p>
          </div>
        </div>

        {/* === Daily Logs === */}
        {trip?.logs?.map((log, index) => {
          const segments = log?.grid_data?.duty_segments || [];
          const timeline = segments.map((s, i) => (
            <div
              key={i}
              className="h-4 text-xs flex items-center justify-center text-white"
              style={{
                backgroundColor:
                  s.status === "DRIVING"
                    ? "#22c55e"
                    : s.status === "OFF_DUTY"
                    ? "#9ca3af"
                    : s.status === "ON_DUTY_NOT_DRIVING"
                    ? "#f97316"
                    : "#3b82f6",
                flex: s.hours,
              }}
            >
              {s.status === "DRIVING"
                ? "D"
                : s.status === "OFF_DUTY"
                ? "O"
                : s.status === "ON_DUTY_NOT_DRIVING"
                ? "ON"
                : "S"}
            </div>
          ));

          return (
            <div
              key={log?.id || index}
              className="border rounded p-4 space-y-2"
            >
              <div className="font-semibold">
                {dayjs(log.date).format("MMMM D, YYYY")}
              </div>

              {/* 24 Hour Scale */}
              <div className="flex w-full border-b mb-1 text-xs">
                {Array.from({ length: 24 }).map((_, h) => (
                  <div key={h} className="flex-1 text-center border-l">
                    {h}
                  </div>
                ))}
              </div>

              {/* Duty Segments Bar */}
              <div className="flex w-full border">{timeline}</div>

              {/* Summary */}
              <div className="grid grid-cols-2 text-sm mt-2">
                <div>
                  <p>
                    <strong>Total Hours:</strong>{" "}
                    {parseFloat(log?.total_hours).toFixed(2)}
                  </p>
                  <p>
                    <strong>Duty Breakdown:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {segments.map((s, i) => (
                      <li key={i}>
                        {dutyLabels[s.status] || s.status}: {s.hours.toFixed(2)}{" "}
                        hrs
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p>
                    <strong>Remarks:</strong> {log.remarks || "—"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Totals */}
        <div className="border p-4 text-sm">
          <p>
            <strong>Total Trip Hours:</strong>{" "}
            {trip?.logs
              ?.reduce((acc, l) => acc + parseFloat(l.total_hours), 0)
              .toFixed(2)}
          </p>
        </div>

        {/* === Segments Key === */}
        <div className="border rounded p-4 text-sm">
          <h4 className="font-semibold mb-2">Segments Key</h4>
          <div className="flex flex-wrap gap-4">
            {keyItems.map((k) => (
              <div key={k.code} className="flex items-center gap-2">
                <div
                  className="w-6 h-4 flex items-center justify-center text-white text-xs rounded"
                  style={{ backgroundColor: k.color }}
                >
                  {k.code}
                </div>
                <span>{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default ViewLogs;
