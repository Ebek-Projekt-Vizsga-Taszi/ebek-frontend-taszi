import React, { useState, useEffect } from "react";
import { checkNewYearNotification } from "./Timer";
import { InvoiceAlert } from "./Design/Ertesites"; // Javított import

const Ertesitesek = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    checkNewYearNotification(setNotifications);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prevNotifications) => {
        const hasInvoiceAlert = prevNotifications.some(
          (notification) => notification.key === "invoice-alert"
        );
        if (!hasInvoiceAlert) {
          return [
            ...prevNotifications,
            <div key="invoice-alert" className="mb-4">
              <InvoiceAlert />
            </div>,
          ];
        }
        return prevNotifications;
      });
    }, 60000); // 1 perc után

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Értesítések</h2>
      <ul className="list-none space-y-4">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="p-4 rounded-lg shadow-sm bg-gray-800 hover:shadow-md transition-shadow"
          >
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ertesitesek;