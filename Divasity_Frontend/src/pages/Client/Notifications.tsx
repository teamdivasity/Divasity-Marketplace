import { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Your profile was updated successfully",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "error",
      message: "Login attempt failed from new device",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      message: "New feature available in your dashboard",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const getIcon = (type: string) => {
    return (
      <span
        className={`inline-block h-3 w-3 rounded-full ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
        }`}
      ></span>
    );
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
          {notifications.filter((n) => !n.read).length} New
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No notifications available
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6  rounded-lg border ${notification.read ? "bg-white" : "bg-gray-50"} relative`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              {!notification.read && (
                <div className="absolute top-3 left-3 h-2 w-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={() => setNotifications([])}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
