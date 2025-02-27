"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApiData {
  _id: string;
  name: string;
  endpoint: string;
}

export default function AddApi() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [apis, setApis] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApis();
  }, []);

  async function fetchApis() {
    try {
      const res = await fetch("http://localhost:5000/api/apis", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch APIs");
      const data = await res.json();
      setApis(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/apis/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, endpoint }),
      });

      if (!res.ok) throw new Error("Failed to add API");

      setName("");
      setEndpoint("");
      fetchApis();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(apiId: string) {
    try {
      const res = await fetch(`http://localhost:5000/api/apis/${apiId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete API");

      fetchApis();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Manage APIs</h1>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => router.push("/Dashboard")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">API Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Endpoint</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add API"}
        </button>
      </form>

      {/* API List */}
      <ul className="mt-4">
        {apis.map((api) => (
          <li key={api._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2">
            <div>
              <p className="font-semibold">{api.name}</p>
              <p className="text-sm text-gray-600">{api.endpoint}</p>
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDelete(api._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
