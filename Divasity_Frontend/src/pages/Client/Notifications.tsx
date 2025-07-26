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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest activities</p>
            </div>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
              {notifications.filter((n) => !n.read).length} New
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">🔔</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-500">We'll notify you when something important happens</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer ${
                  notification.read ? "border-gray-100" : "border-purple-200 bg-purple-50/30"
                } relative`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 rounded-full ${
                      notification.type === "success"
                        ? "bg-green-100"
                        : notification.type === "error"
                        ? "bg-red-100"
                        : "bg-blue-100"
                    }`}>
                      {getIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-base mb-2 ${
                      notification.read ? "text-gray-700" : "text-gray-900"
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
                {!notification.read && (
                  <div className="absolute top-4 left-4 h-2 w-2 bg-purple-500 rounded-full"></div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setNotifications([])}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Clear all notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
