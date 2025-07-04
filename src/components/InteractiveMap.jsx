import React, { useState } from 'react';

export default function InteractiveMap({
  latitude = 37.7749,
  longitude = -122.4194,
  zoom = 13,
  title = "Featured Location",
  description = "An interesting place worth exploring"
}) {
  const [mapType, setMapType] = useState('openstreetmap');

  // Generate map URLs for different providers (no API keys required)
  const getMapUrl = (type = 'openstreetmap') => {
    switch (type) {
      case 'openstreetmap':
        return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
      case 'google':
        return `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=${zoom}&output=embed`;
      case 'bing':
        return `https://www.bing.com/maps/embed?h=400&w=500&cp=${latitude}~${longitude}&lvl=${zoom}&typ=d&sty=r&src=SHELL&FORM=MBEDV8`;
      default:
        return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    }
  };

  const mapTypes = [
    { value: 'openstreetmap', label: 'OpenStreetMap', icon: '🗺️' },
    { value: 'google', label: 'Google Maps', icon: '🌍' },
    { value: 'bing', label: 'Bing Maps', icon: '🛰️' }
  ];

  return (
    <div className="my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-blue-100 text-sm">{description}</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-blue-100">📍 Coordinates</div>
            <div className="font-mono">{latitude.toFixed(4)}, {longitude.toFixed(4)}</div>
          </div>
        </div>
      </div>

      {/* Map Type Selector */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
          <div className="flex gap-1">
            {mapTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setMapType(type.value)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  mapType === type.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <iframe
          src={getMapUrl(mapType)}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title={`Map showing ${title}`}
        />
        
        {/* Overlay with location info */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Zoom: {zoom}x • {mapTypes.find(t => t.value === mapType)?.label} view
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in Google Maps
          </a>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${latitude}, ${longitude}`);
              // You could add a toast notification here
            }}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Coordinates
          </button>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Interactive Map
        </div>
      </div>
    </div>
  );
}
