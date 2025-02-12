import React, { useState, useEffect } from "react";
import { checkNewYearNotification } from "./Timer";

const Ertesitesek = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    checkNewYearNotification(setNotifications);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(['Emlékeztető: Töltse ki az Ebösszeíró lapot!']);
    }, 60); //  1 perc után

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Értesítések</h2>
      <ul className="list-disc list-inside">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="mb-2 p-2 border border-gray-300 rounded-lg shadow-sm bg-blue-100"
          >
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ertesitesek;
