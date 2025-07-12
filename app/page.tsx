'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ipData, setIpData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/ip-info')
      .then((res) => res.json())
      .then((data) => setIpData(data));
  }, []);

  if (!ipData) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-white">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">What is my IP?</h1>
        <p className="text-2xl text-emerald-400 mb-2">{ipData.ipv4 || 'Not found'}</p>
        <p className="text-md text-gray-400 mb-6">Find out what your IPv4 and IPv6 addresses are, along with detailed geolocation insights, including the associated country, city, and ISP, below.</p>

        <div className="text-left bg-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Full IP Information</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {Object.entries(ipData).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-800">
                  <td className="py-2 font-medium capitalize w-1/3 text-gray-300">{key.replace('_', ' ')}</td>
                  <td className="py-2 text-white">{value || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
