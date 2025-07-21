import { useState } from "react";
import { X } from "lucide-react";

export function DevBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Only show in development when using mock data
  const showBanner =
    import.meta.env.DEV && !import.meta.env.VITE_API_URL;

  if (!showBanner || !isVisible) return null;

  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <strong>Development Mode:</strong> Using mock data since API
              server is not configured. Set{" "}
              <code className="bg-orange-200 px-1 rounded">
                VITE_API_URL
              </code>{" "}
              in .env.local to connect to a real API.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-orange-500 hover:text-orange-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
