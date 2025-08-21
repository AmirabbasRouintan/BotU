import React, { useEffect, useState, useCallback } from "react";

interface NekosImage {
  id: number;
  url: string;
  artist?: {
    id: number;
    name: string;
  };
  source_url?: string;
  rating: "safe" | "suggestive" | "borderline" | "explicit";
  tags: string[];
  width: number;
  height: number;
}

interface NekosApiResponse {
  items: NekosImage[];
  total: number;
  count: number;
}

const API_CONFIG = {
  useV4: true,
  rating: ["explicit"] as Array<
    "safe" | "suggestive" | "borderline" | "explicit"
  >,
  limit: 1,
  without_tags: ["violence", "gore"],
  apiKey: "YOUR_API_KEY_HERE" // Replace with your actual API key
};

export default function Nsfw() {
  const [image, setImage] = useState<string>("");
  const [imageData, setImageData] = useState<NekosImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiInUse, setApiInUse] = useState<string>("");
  // const [apiKeyError, setApiKeyError] = useState<boolean>(false);

  const fetchImageV4 = async (): Promise<NekosImage> => {
    // Check if API key is configured
    if (!API_CONFIG.apiKey || API_CONFIG.apiKey === "YOUR_API_KEY_HERE") {
      // setApiKeyError(true);
      throw new Error(
        "API key not configured. Please get one from https://nekosapi.com"
      );
    }

    // Construct query parameters according to API documentation
    const params = new URLSearchParams();

    // Add rating parameters (array of strings)
    API_CONFIG.rating.forEach((r) => params.append("rating", r));

    // Add other parameters
    params.append("limit", API_CONFIG.limit.toString());
    API_CONFIG.without_tags.forEach((tag) =>
      params.append("without_tags", tag)
    );

    const url = `https://api.nekosapi.com/v4/images?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error(
          "Invalid API key. Please check your API key at https://nekosapi.com"
        );
      }
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data: NekosApiResponse = await res.json();

    if (data.items && data.items[0]) {
      return data.items[0];
    } else {
      throw new Error("No image found in response");
    }
  };

  // Fetch image from Nekos v2 (fallback)
  const fetchImageV2 = async (): Promise<string> => {
    const res = await fetch("https://nekos.best/api/v2/neko");
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (data.results && data.results[0]) {
      return data.results[0].url;
    } else {
      throw new Error("No image found in response");
    }
  };

  // Main fetch function with fallback - wrapped in useCallback to fix useEffect dependency
  const fetchImage = useCallback(async () => {
    setLoading(true);
    setError(null);
    // setApiKeyError(false);

    try {
      if (API_CONFIG.useV4) {
        setApiInUse("NekosAPI v4");
        try {
          const imageData = await fetchImageV4();
          setImage(imageData.url);
          setImageData(imageData);
        } catch (v4Error) {
          // Fallback to v2 if v4 fails
          console.warn("NekosAPI v4 failed, falling back to v2:", v4Error);
          setApiInUse("Nekos v2 (fallback) kiram to v4 kiri ke kar nemikoneee");
          const imageUrl = await fetchImageV2();
          setImage(imageUrl);
          setImageData(null);
        }
      } else {
        setApiInUse("Nekos v2");
        const imageUrl = await fetchImageV2();
        setImage(imageUrl);
        setImageData(null);
      }
    } catch (err: unknown) {
      console.error("Error fetching image:", err);
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch image. Please try again.");
      } else {
        setError("Failed to fetch image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array as API_CONFIG is static

  useEffect(() => {
    fetchImage();
  }, [fetchImage]); // Now fetchImage is a dependency but it's memoized with useCallback

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] gap-6 text-white p-4">
      {/* Warning message for explicit content */}
      {/* <div className="bg-red-900 text-yellow-200 p-3 rounded-lg text-center max-w-md">
        <strong>Warning:</strong> This content is set to "explicit" rating. You
        may see NSFW content.
      </div> */}

      {/* API Key Error Message */}
      {/* {apiKeyError && (
        <div className="bg-yellow-800 text-yellow-200 p-4 rounded-lg text-center max-w-md">
          <strong>API Key Required:</strong> To use NekosAPI v4, you need an API
          key.
          <div className="mt-2">
            <a
              href="https://nekosapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded transition"
            >
              Get API Key
            </a>
          </div>
          <div className="mt-2 text-sm">
            Then replace <code className="px-1 rounded">YOUR_API_KEY_HERE</code>{" "}
            in the code.
          </div>
        </div>
      )} */}

      {/* Image Container */}
      <div className="rounded-2xl overflow-hidden">
        <div className="w-[400px] h-[400px] flex items-center justify-center text-white rounded-2xl">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-center p-4 text-red-400">
              <div className="mb-2">Error: {error}</div>
              <button
                onClick={fetchImage}
                className="px-4 py-2 rounded-xl transition"
              >
                Retry
              </button>
            </div>
          ) : image ? (
            <img
              src={image}
              alt="Neko"
              crossOrigin="anonymous"
              className="max-w-[400px] max-h-[400px] object-cover rounded-2xl"
            />
          ) : (
            <div>No image available</div>
          )}
        </div>
      </div>

      {/* API Info Display */}
      {apiInUse && (
        <div className="rounded-lg px-4 py-2">
          <p className="text-center">
            API: <span className="font-bold">{apiInUse}</span>
          </p>
          {API_CONFIG.useV4 && API_CONFIG.rating && (
            <p className="text-center mt-1">
              Rating:{" "}
              <span className="font-bold uppercase">{API_CONFIG.rating}</span>
            </p>
          )}
        </div>
      )}

      {/* Image Metadata */}
      {imageData && (
        <div className="rounded-lg p-4 max-w-md">
          <h3 className="font-bold mb-2">Image Details:</h3>
          <p>Artist: {imageData.artist?.name || "Unknown"}</p>
          <p>Rating: {imageData.rating}</p>
          <p>
            Tags: {imageData.tags.slice(0, 5).join(", ")}
            {imageData.tags.length > 5 && "..."}
          </p>
          <p>
            Dimensions: {imageData.width} × {imageData.height}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={fetchImage}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-black disabled:opacity-50"
        >
          Previous
        </button>
        <a
          href={image}
          download={`neko-${Date.now()}.jpg`}
          className={`px-4 py-2 rounded-xl bg-neutral-200 text-black ${
            !image ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Download
        </a>
        <button
          onClick={() => alert("Liked! ❤️")}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-black"
        >
          Like
        </button>
        <button
          onClick={fetchImage}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-black disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Instructions */}
      {/* <div className="text-sm max-w-md text-center">
        {API_CONFIG.useV4 ? (
          <>
            <p>
              Using NekosAPI v4 with {API_CONFIG.rating.join(", ")} content
              rating.
            </p>
            <p className="mt-1">
              You need an API key from{" "}
              <a
                href="https://nekosapi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                nekosapi.com
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p>Using Nekos v2 API (SFW content only).</p>
            <p className="mt-1">
              To enable content rating options, set{" "}
              <code className="bg-gray-800 px-1 rounded">useV4: true</code> in
              API_CONFIG.
            </p>
            <p className="mt-1">
              Note: Nekos v2 API doesn't support explicit content or rating
              parameters.
            </p>
          </>
        )}
      </div> */}
    </div>
  );
}
