import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Menu, X, Navigation, Clock, Phone, ExternalLink, Globe, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CampusStop {
  id: string;
  name: string;
  category: string;
  description: string;
  hours?: string;
  contact?: string;
  coordinates?: [number, number]; // Add coordinates for map positioning
  tourUrl?: string; // Add 360° tour URL
  googleMapsUrl?: string; // Add Google Maps URL
}

const campusStops: CampusStop[] = [
  {
    id: 'library',
    name: 'Central Library',
    category: 'Academic',
    description: 'Main library with study halls and digital resources',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 179',
    coordinates: [26.8418642, 75.5657723], // Add real coordinates here
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8418642,75.5657723'
  },
  {
    id: 'dome',
    name: 'Dome Building',
    category: 'Administrative',
    description: 'Main administrative offices and registrar',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8418203, 75.5660127],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
  },
  {
    id: 'flapgatessubway',
    name: 'Flap Gates to Subway',
    category: 'Transport',
    description: 'The main entrance to the subway system towards hostels',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8419932, 75.5635830],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8419932,75.5635830'
  },
  {
    id: 'flapgatesmain',
    name: ' Main Entrance Flap Gates',
    category: 'Transport',
    description: 'The main entrance to the College campus',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8416278, 75.5645215],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8416278,75.5645215'
  },
  {
    id: 'ab1elephantgate',
    name: 'Academic Block 1 (Elephant Gate)',
    category: 'Academic',
    description: 'Various departments and research labs',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8428521, 75.5636096],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
  },
  {
    id: 'acblock1',
    name: 'Academic Block 1 (Lobby)',
    category: 'Recreation',
    description: 'Orientation and recreational area for students',
    hours: '9:00 AM - 11:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8428521, 75.5636096],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
  },
  {
    id: 'quessab1',
    name: 'Quess (Academic Block 1)',
    category: 'Dining',
    description: 'Go here for coffee, snacks, and light meals',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8428591, 75.5650090],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
  },
  {
    id: 'atm',
    name: 'ICICI Bank (Academic Block 1)',
    category: 'Facilities',
    description: 'On-campus banking services and ATM',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8428591, 75.5650090],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
  },
  {
    id: 'stationaryab1',
    name: 'Stationary Shop (In Old Mess towards Academic Block 1)',
    category: 'Facilities',
    description: 'Stationary and printing services for students',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.842496, 75.565113],
    googleMapsUrl: 'https://www.google.com/maps?q=26.842496,75.565113'
  },
  {
    id: 'stationaryab2',
    name: 'Stationary Shop (In Old Mess towards Academic Block 2)',
    category: 'Facilities',
    description: 'Stationary and printing services for students',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.842774, 75.565806],
    googleMapsUrl: 'https://www.google.com/maps?q=26.842774,75.565806'
  },
  {
    id: 'nescafe',
    name: 'Nescafe (Old Mess)',
    category: 'Dining',
    description: 'Popular for coffee, maggie and sandwiches in the old mess area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.842719, 75.565201],
    googleMapsUrl: 'https://www.google.com/maps?q=26.842719,75.565201'
  },
  {
    id: 'coffeeday',
    name: 'Coffee Day (Old Mess)',
    category: 'Dining',
    description: 'Popular for coffee, maggie and sandwiches in the old mess area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.842719, 75.565201],
    googleMapsUrl: 'https://www.google.com/maps?q=26.842719,75.565201'
  },
  {
    id: 'acblock3',
    name: 'Academic Block 3',
    category: 'Academic',
    description: 'Law, business and social sciences departments',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.844187, 75.564336],
    googleMapsUrl: 'https://www.google.com/maps?q=26.844187,75.564336'
  },
  {
    id: 'vasantipai',
    name: 'Vasanti Pai Auditorium',
    category: 'Recreational',
    description: 'Largest auditorium in MUJ for events and performances',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.844127, 75.564376],
    googleMapsUrl: 'https://www.google.com/maps?q=26.844127,75.564376'
  },
  {
    id: 'ab41',
    name: 'Lecture Hall Complex (Entrance towards AB 3)',
    category: 'Academic',
    description: 'Computer Science departments and Seminar Halls',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.84228, 75.564604],
    googleMapsUrl: 'https://www.google.com/maps?q=26.84228,75.564604'
  },
  {
    id: 'ab42',
    name: 'Lecture Hall Complex (Entrance towards AB 2)',
    category: 'Academic',
    description: 'Computer Science departments and Seminar Halls',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.844101, 75.565051],
    googleMapsUrl: 'https://www.google.com/maps?q=26.844101,75.565051'
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    category: 'Recreation',
    description: 'Cricket, Football Grounds and outdoor courts for Tennis and Basketball',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843728, 75.565352],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843728,75.565352'
  },
  {
    id: 'shardapaiauditorium',
    name: 'Sharda Pai Auditorium (Academic Block 2)',
    category: 'Recreation',
    description: 'Auditorium for cultural events and performances',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843437, 75.565636],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843437,75.565636'
  },
  {
    id: 'ab2',
    name: 'Academic Block 2',
    category: 'Academic',
    description: 'Engineering and Architechture departments and laboratories',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843437, 75.565636],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843437,75.565636'
  },
  {
    id: 'munchies',
    name: 'Munchies (Academic Block 2)',
    category: 'Dining',
    description: 'Popular for fries, burgers and other mid-class munchies in the Academic Block 2 area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843629, 75.565746],
    googleMapsUrl: 'https://www.google.com/maps?q=26.843629,75.565746'
  },
  {
    id: 'italianoven',
    name: 'Italian Oven (Academic Block 2)',
    category: 'Dining',
    description: 'Popular for pizzas and wraps in the Academic Block 2 area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843629, 75.565746],
    googleMapsUrl: 'https://www.google.com/maps?q=26.843629,75.565746'
  },
  {
    id: 'aic',
    name: 'Atal Incubation Centre (Underground in Academic Block 2)',
    category: 'Academic',
    description: 'Innovation and entrepreneurship hub for students',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843837, 75.566252],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843837,75.566252'
  },
  {
    id: 'yumzeez',
    name: 'Yumzeez (Academic Block 2)',
    category: 'Dining',
    description: 'Popular for maggie, cold coffee and juices in the Academic Block 2 area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843476, 75.566714],
    googleMapsUrl: 'https://www.google.com/maps?q=26.843476,75.566714'
  },
  {
    id: 'divine',
    name: 'Divine Snacks (Academic Block 2)',
    category: 'Dining',
    description: 'Popular for kachori chaat and samosa chaat in the Academic Block 2 area',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843168, 75.566149],
    googleMapsUrl: 'https://www.google.com/maps?q=26.843168,75.566149'
  },
  {
    id: 'workshopblock',
    name: 'Workshop Block (behind Academic Block 2)',
    category: 'Academic',
    description: 'Mechanical and Civil engineering workshops and labs',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843168, 75.566149],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843168,75.566149'
  },
  {
    id: 'tmapai',
    name: 'TMA Pai Auditorium (Academic Block 2)',
    category: 'Recreational',
    description: 'Auditorium for cultural events and performances',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843233, 75.566436],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843233,75.566436'
  },
  {
    id: 'ramdaspai',
    name: 'Ramdas Pai Amphithreatre (Academic Block 2)',
    category: 'Recreational',
    description: 'Open-air theatre for cultural events and performances',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.843132, 75.566485],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.843132,75.566485'
  },
  {
    id: 'grandstairs',
    name: ' Grand Stairs (between Academic Block 1 and 2)',
    category: 'Recreational',
    description: 'Popular hangout spot for students between classes and meeting point for clubs and societies',
    hours: '9:00 AM - 6:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.84232, 75.56570],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.84232,75.56570'
  },
  {
    id: 'quessrdome',
    name: ' Quess (Dome Building)',
    category: 'Dining',
    description: 'Popular for coffee, snacks, and light meals in the Dome Building area',
    hours: '9:00 AM - 7:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.8418263, 75.5660167],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
  },
  {
    id: 'cpdome',
    name: ' Chilling Point (Dome Building)',
    category: 'Dining',
    description: 'Popular for coffee, snacks, and light meals in the Dome Building area',
    hours: '9:00 AM - 7:00 PM',
    contact: '0141-3999100, extension: 142,257,297',
    coordinates: [26.841233, 75.5660137],
    tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
    googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
  }
];

const categoryColors = {
  'Academic': 'bg-orange-100 text-orange-800 border-orange-200',
  'Dining': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Events': 'bg-red-100 text-red-800 border-red-200',
  'Residential': 'bg-amber-100 text-amber-800 border-amber-200',
  'Administrative': 'bg-orange-100 text-orange-800 border-orange-200',
  'Recreation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Healthcare': 'bg-red-100 text-red-800 border-red-200',
  'Recreational': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  // Add new categories here:
  'Parking': 'bg-gray-100 text-gray-800 border-gray-200',
  'Security': 'bg-blue-100 text-blue-800 border-blue-200',
  'Facilities': 'bg-purple-100 text-purple-800 border-purple-200',
  'Transport': 'bg-green-100 text-green-800 border-green-200'
};

const categoryIconColors = {
  'Academic': '#f97316',
  'Dining': '#f59e0b', 
  'Events': '#ef4444',
  'Residential': '#d97706',
  'Administrative': '#ea580c',
  'Recreation': '#eab308',
  'Healthcare': '#dc2626',
  'Recreational': '#eab308',
  // Add corresponding icon colors:
  'Parking': '#6b7280',
  'Security': '#3b82f6',
  'Facilities': '#a855f7',
  'Transport': '#10b981'
};

function App() {
  const navigate = useNavigate();
  const [selectedStop, setSelectedStop] = useState<string>('library');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const selectedStopData = campusStops.find(stop => stop.id === selectedStop);

  // Create custom icon function
  const createCustomIcon = (category: string, isSelected: boolean = false) => {
    const color = categoryIconColors[category as keyof typeof categoryIconColors] || '#333';
    const size = isSelected ? 35 : 28;
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background: ${isSelected ? '#ef4444' : color}; 
        color: white; 
        border-radius: 50%; 
        width: ${size}px; 
        height: ${size}px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: ${isSelected ? '12px' : '10px'};
        font-weight: bold;
        border: ${isSelected ? '4px' : '3px'} solid white;
        box-shadow: 0 ${isSelected ? '4px 12px' : '3px 8px'} rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.2s ease;
      ">📍</div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2],
      popupAnchor: [0, -size/2 - 5]
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // We'll add custom controls
      attributionControl: false
    }).fitBounds([
      [26.841, 75.563], // Southwest corner
      [26.845, 75.568]  // Northeast corner
    ]);

    // Add custom zoom controls
    L.control.zoom({
      position: 'topleft'
    }).addTo(map);

    // Add fallback tile layer (commented out, uncomment if image doesn't load)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    // Add markers for all locations
    campusStops.forEach(stop => {
      if (stop.coordinates) {
        const marker = L.marker(stop.coordinates, {
          icon: createCustomIcon(stop.category, stop.id === selectedStop)
        }).addTo(map);

        // Create popup content
        const popupContent = `
          <div style="min-width: 250px; font-family: system-ui;">
            <h3 style="margin-bottom: 8px; color: #333; font-size: 16px;">${stop.name}</h3>
            <p style="margin-bottom: 8px; color: #666; font-size: 14px;">${stop.description}</p>
            <div style="margin-bottom: 10px;">
              <span style="background: ${categoryIconColors[stop.category as keyof typeof categoryIconColors]}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                ${stop.category}
              </span>
            </div>
            ${stop.hours ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Hours:</strong> ${stop.hours}</p>` : ''}
            ${stop.contact ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Contact:</strong> ${stop.contact}</p>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
        
        // Click handler to update selected stop
        marker.on('click', () => {
          setSelectedStop(stop.id);
        });

        markersRef.current.push(marker);
      }
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Update markers when selected stop changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Update marker icons based on selection
    markersRef.current.forEach((marker, index) => {
      const stop = campusStops[index];
      if (stop && stop.coordinates) {
        marker.setIcon(createCustomIcon(stop.category, stop.id === selectedStop));
        
        // Center map on selected location
        if (stop.id === selectedStop) {
          mapRef.current!.setView(stop.coordinates, 18, { animate: true });
        }
      }
    });
  }, [selectedStop]);

  // Function to open 360° tour
  const open360Tour = (url: string, name: string) => {
    if (url && !url.includes('YOUR_') && !url.includes('TOUR_ID')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`360° tour for ${name} coming soon!`);
    }
  };

  // Function to open Google Maps
  const openGoogleMaps = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-2">
              <Navigation className="text-yellow-300" size={32} />
              <h1 className="text-2xl font-bold text-white">MUJ Campus Navigator</h1>
            </div>
          </div>
          
          {/* Student Corner Button and Description */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/student-corner')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all backdrop-blur-sm hover:scale-105 transform group"
            >
              <Users size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-medium">Student Corner</span>
            </button>
            
            <div className="hidden md:block text-yellow-200 font-medium">
              Interactive Campus Map with 360° Tours
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static z-50 lg:z-auto
          w-80 h-full bg-white border-r border-orange-200 shadow-xl lg:shadow-none
          transition-transform duration-300 ease-in-out
        `}>
          <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Campus Locations</h2>
            <p className="text-sm text-gray-600">Click on any location to view on map</p>
          </div>
          
          <div className="overflow-y-auto h-full pb-6">
            <div className="p-4 space-y-3">
              {campusStops.map((stop) => (
                <button
                  key={stop.id}
                  onClick={() => {
                    setSelectedStop(stop.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                    hover:shadow-lg hover:scale-[1.02] transform
                    ${selectedStop === stop.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg'
                      : 'bg-white hover:bg-orange-50 border-gray-200 hover:border-orange-300 text-gray-800'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin size={16} className={selectedStop === stop.id ? 'text-yellow-300' : 'text-orange-500'} />
                        <h3 className="font-semibold text-sm">{stop.name}</h3>
                      </div>
                      <p className={`text-xs mb-2 ${selectedStop === stop.id ? 'text-orange-100' : 'text-gray-600'}`}>
                        {stop.description}
                      </p>
                    </div>
                  </div>
                  <span className={`
                    inline-block px-2 py-1 text-xs font-medium rounded-full border
                    ${selectedStop === stop.id 
                      ? 'bg-white/20 text-white border-white/30' 
                      : categoryColors[stop.category as keyof typeof categoryColors]
                    }
                  `}>
                    {stop.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 relative bg-gray-100">
            <div className="absolute inset-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div 
                ref={mapContainerRef}
                className="h-full w-full"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>

          {/* Selected Location Info Panel */}
          {selectedStopData && (
            <div className="bg-white border-t border-orange-200 p-6 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <MapPin className="text-orange-500" size={24} />
                    <h3 className="text-xl font-bold text-gray-900">{selectedStopData.name}</h3>
                    <span className={`
                      px-3 py-1 text-sm font-medium rounded-full border
                      ${categoryColors[selectedStopData.category as keyof typeof categoryColors]}
                    `}>
                      {selectedStopData.category}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {selectedStopData.tourUrl && (
                      <button
                        onClick={() => open360Tour(selectedStopData.tourUrl!, selectedStopData.name)}
                        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                      >
                        <Globe size={16} />
                        <span className="text-sm font-medium">360° Tour</span>
                      </button>
                    )}
                    {selectedStopData.googleMapsUrl && (
                      <button
                        onClick={() => openGoogleMaps(selectedStopData.googleMapsUrl!)}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm font-medium">Google Maps</span>
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedStopData.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedStopData.hours && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock size={16} className="text-orange-500" />
                      <span className="font-medium text-gray-700">Hours:</span>
                      <span className="text-gray-600">{selectedStopData.hours}</span>
                    </div>
                  )}
                  {selectedStopData.contact && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone size={16} className="text-orange-500" />
                      <span className="font-medium text-gray-700">Contact:</span>
                      <span className="text-gray-600">{selectedStopData.contact}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { MapPin, Menu, X, Navigation, Clock, Phone, ExternalLink, Globe } from 'lucide-react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';


// interface CampusStop {
//   id: string;
//   name: string;
//   category: string;
//   description: string;
//   hours?: string;
//   contact?: string;
//   coordinates?: [number, number]; // Add coordinates for map positioning
//   tourUrl?: string; // Add 360° tour URL
//   googleMapsUrl?: string; // Add Google Maps URL
// }

// const campusStops: CampusStop[] = [
//   {
//     id: 'library',
//     name: 'Central Library',
//     category: 'Academic',
//     description: 'Main library with study halls and digital resources',
//     hours: '24/7',
//     contact: '+1-555-0101',
//     coordinates: [26.8418642, 75.5657723], // Add real coordinates here
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8418642,75.5657723'
//   },
//   {
//     id: 'dome',
//     name: 'Dome Building',
//     category: 'Administrative',
//     description: 'Main administrative offices and registrar',
//     hours: '9:00 AM - 11:00 PM',
//     contact: '+1-555-0102',
//     coordinates: [26.8418203, 75.5660127],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
//   },
//   {
//     id: 'flapgatessubway',
//     name: 'Flap Gates to Subway',
//     category: 'Transport',
//     description: 'The main entrance to the subway system towards hostels',
//     hours: '9:00 AM - 11:00 PM',
//     contact: '+1-555-0103',
//     coordinates: [26.8419932, 75.5635830],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8419932,75.5635830'
//   },
//   {
//     id: 'flapgatesmain',
//     name: ' Main Entrance Flap Gates',
//     category: 'Transport',
//     description: 'The main entrance to the College campus',
//     hours: '9:00 AM - 11:00 PM',
//     contact: '+1-555-0103',
//     coordinates: [26.8416278, 75.5645215],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8416278,75.5645215'
//   },
//   {
//     id: 'ab1elephantgate',
//     name: 'Academic Block 1 (Elephant Gate)',
//     category: 'Academic',
//     description: 'Various departments and research labs',
//     hours: '9:00 AM - 11:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.8428521, 75.5636096],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
//   },
//   {
//     id: 'acblock1',
//     name: 'Academic Block 1 (Lobby)',
//     category: 'Recreation',
//     description: 'Orientation and recreational area for students',
//     hours: '9:00 AM - 11:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.8428521, 75.5636096],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
//   },
//   {
//     id: 'quessab1',
//     name: 'Quess (Academic Block 1)',
//     category: 'Dining',
//     description: 'Go here for coffee, snacks, and light meals',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.8428591, 75.5650090],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
//   },
//   {
//     id: 'atm',
//     name: 'ICICI Bank (Academic Block 1)',
//     category: 'Facilities',
//     description: 'On-campus banking services and ATM',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.8428591, 75.5650090],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8428521,75.5636096'
//   },
//   {
//     id: 'stationaryab1',
//     name: 'Stationary Shop (In Old Mess towards Academic Block 1)',
//     category: 'Facilities',
//     description: 'Stationary and printing services for students',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0106',
//     coordinates: [26.842496, 75.565113],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.842496,75.565113'
//   },
//   {
//     id: 'stationaryab2',
//     name: 'Stationary Shop (In Old Mess towards Academic Block 2)',
//     category: 'Facilities',
//     description: 'Stationary and printing services for students',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0107',
//     coordinates: [26.842774, 75.565806],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.842774,75.565806'
//   },
//   {
//     id: 'nescafe',
//     name: 'Nescafe (Old Mess)',
//     category: 'Dining',
//     description: 'Popular for coffee, maggie and sandwiches in the old mess area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0107',
//     coordinates: [26.842719, 75.565201],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.842719,75.565201'
//   },
//   {
//     id: 'coffeeday',
//     name: 'Coffee Day (Old Mess)',
//     category: 'Dining',
//     description: 'Popular for coffee, maggie and sandwiches in the old mess area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0107',
//     coordinates: [26.842719, 75.565201],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.842719,75.565201'
//   },
//   {
//     id: 'acblock3',
//     name: 'Academic Block 3',
//     category: 'Academic',
//     description: 'Law, business and social sciences departments',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.844187, 75.564336],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.844187,75.564336'
//   },
//   {
//     id: 'vasantipai',
//     name: 'Vasanti Pai Auditorium',
//     category: 'Recreational',
//     description: 'Largest auditorium in MUJ for events and performances',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0104',
//     coordinates: [26.844127, 75.564376],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.844127,75.564376'
//   },
//   {
//     id: 'ab41',
//     name: 'Lecture Hall Complex (Entrance towards AB 3)',
//     category: 'Academic',
//     description: 'Computer Science departments and Seminar Halls',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.84228, 75.564604],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.84228,75.564604'
//   },
//   {
//     id: 'ab42',
//     name: 'Lecture Hall Complex (Entrance towards AB 2)',
//     category: 'Academic',
//     description: 'Computer Science departments and Seminar Halls',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.844101, 75.565051],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.844101,75.565051'
//   },
//   {
//     id: 'sports',
//     name: 'Sports Complex',
//     category: 'Recreation',
//     description: 'Cricket, Football Grounds and outdoor courts for Tennis and Basketball',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843728, 75.565352],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843728,75.565352'
//   },
//   {
//     id: 'shardapaiauditorium',
//     name: 'Sharda Pai Auditorium (Academic Block 2)',
//     category: 'Recreation',
//     description: 'Auditorium for cultural events and performances',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843437, 75.565636],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843437,75.565636'
//   },
//   {
//     id: 'ab2',
//     name: 'Academic Block 2',
//     category: 'Academic',
//     description: 'Engineering and Architechture departments and laboratories',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843437, 75.565636],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843437,75.565636'
//   },
//   {
//     id: 'munchies',
//     name: 'Munchies (Academic Block 2)',
//     category: 'Dining',
//     description: 'Popular for fries, burgers and other mid-class munchies in the Academic Block 2 area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843629, 75.565746],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843629,75.565746'
//   },
//   {
//     id: 'italianoven',
//     name: 'Italian Oven (Academic Block 2)',
//     category: 'Dining',
//     description: 'Popular for pizzas and wraps in the Academic Block 2 area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843629, 75.565746],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843629,75.565746'
//   },
//   {
//     id: 'aic',
//     name: 'Atal Incubation Centre (Underground in Academic Block 2)',
//     category: 'Academic',
//     description: 'Innovation and entrepreneurship hub for students',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843837, 75.566252],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843837,75.566252'
//   },
//   {
//     id: 'yumzeez',
//     name: 'Yumzeez (Academic Block 2)',
//     category: 'Dining',
//     description: 'Popular for maggie, cold coffee and juices in the Academic Block 2 area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843476, 75.566714],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843476,75.566714'
//   },
//   {
//     id: 'divine',
//     name: 'Divine Snacks (Academic Block 2)',
//     category: 'Dining',
//     description: 'Popular for kachori chaat and samosa chaat in the Academic Block 2 area',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843168, 75.566149],
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843168,75.566149'
//   },
//   {
//     id: 'workshopblock',
//     name: 'Workshop Block (behind Academic Block 2)',
//     category: 'Academic',
//     description: 'Mechanical and Civil engineering workshops and labs',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843168, 75.566149],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843168,75.566149'
//   },
//   {
//     id: 'tmapai',
//     name: 'TMA Pai Auditorium (Academic Block 2)',
//     category: 'Recreational',
//     description: 'Auditorium for cultural events and performances',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843233, 75.566436],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843233,75.566436'
//   },
//   {
//     id: 'ramdaspai',
//     name: 'Ramdas Pai Amphithreatre (Academic Block 2)',
//     category: 'Recreational',
//     description: 'Open-air theatre for cultural events and performances',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.843132, 75.566485],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.843132,75.566485'
//   },
//   {
//     id: 'grandstairs',
//     name: ' Grand Stairs (between Academic Block 1 and 2)',
//     category: 'Recreational',
//     description: 'Popular hangout spot for students between classes and meeting point for clubs and societies',
//     hours: '9:00 AM - 6:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.84232, 75.56570],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.84232,75.56570'
//   },
//   {
//     id: 'quessrdome',
//     name: ' Quess (Dome Building)',
//     category: 'Dining',
//     description: 'Popular for coffee, snacks, and light meals in the Dome Building area',
//     hours: '9:00 AM - 7:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.8418263, 75.5660167],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
//   },
//   {
//     id: 'cpdome',
//     name: ' Chilling Point (Dome Building)',
//     category: 'Dining',
//     description: 'Popular for coffee, snacks, and light meals in the Dome Building area',
//     hours: '9:00 AM - 7:00 PM',
//     contact: '+1-555-0110',
//     coordinates: [26.841233, 75.5660137],
//     tourUrl: 'https://v1.panoskin.com/?tour=5f1aef29f3c94e38a84263d8#aria-share',
//     googleMapsUrl: 'https://www.google.com/maps?q=26.8418203,75.5660127'
//   }
// ];

// const categoryColors = {
//   'Academic': 'bg-orange-100 text-orange-800 border-orange-200',
//   'Dining': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//   'Events': 'bg-red-100 text-red-800 border-red-200',
//   'Residential': 'bg-amber-100 text-amber-800 border-amber-200',
//   'Administrative': 'bg-orange-100 text-orange-800 border-orange-200',
//   'Recreation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//   'Healthcare': 'bg-red-100 text-red-800 border-red-200',
//   // Add new categories here:
//   'Parking': 'bg-gray-100 text-gray-800 border-gray-200',
//   'Security': 'bg-blue-100 text-blue-800 border-blue-200',
//   'Facilities': 'bg-black-100 text-blue-800 border-blue-200',
//   'Transport': 'bg-green-100 text-green-800 border-green-200'
// };

// const categoryIconColors = {
//   'Academic': '#f97316',
//   'Dining': '#f59e0b', 
//   'Events': '#ef4444',
//   'Residential': '#d97706',
//   'Administrative': '#ea580c',
//   'Recreation': '#eab308',
//   'Healthcare': '#dc2626',
//   // Add corresponding icon colors:
//   'Parking': '#6b7280',
//   'Security': '#3b82f6',
//   'Transport': '#10b981'
// };


// function App() {
//   const [selectedStop, setSelectedStop] = useState<string>('library');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const mapRef = useRef<L.Map | null>(null);
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const markersRef = useRef<L.Marker[]>([]);

//   const selectedStopData = campusStops.find(stop => stop.id === selectedStop);

//   // Create custom icon function
//   const createCustomIcon = (category: string, isSelected: boolean = false) => {
//     const color = categoryIconColors[category as keyof typeof categoryIconColors] || '#333';
//     const size = isSelected ? 35 : 28;
    
//     return L.divIcon({
//       className: 'custom-div-icon',
//       html: `<div style="
//         background: ${isSelected ? '#ef4444' : color}; 
//         color: white; 
//         border-radius: 50%; 
//         width: ${size}px; 
//         height: ${size}px; 
//         display: flex; 
//         align-items: center; 
//         justify-content: center; 
//         font-size: ${isSelected ? '12px' : '10px'};
//         font-weight: bold;
//         border: ${isSelected ? '4px' : '3px'} solid white;
//         box-shadow: 0 ${isSelected ? '4px 12px' : '3px 8px'} rgba(0,0,0,0.3);
//         cursor: pointer;
//         transition: all 0.2s ease;
//       ">📍</div>`,
//       iconSize: [size, size],
//       iconAnchor: [size/2, size/2],
//       popupAnchor: [0, -size/2 - 5]
//     });
//   };

//   // Initialize map
//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     // Initialize Leaflet map
//     const map = L.map(mapContainerRef.current, {
//       zoomControl: false, // We'll add custom controls
//       attributionControl: false
//     }).fitBounds([
//       [26.841, 75.563], // Southwest corner
//       [26.845, 75.568]  // Northeast corner
//     ]);

//     // Add custom zoom controls
//     L.control.zoom({
//       position: 'topleft'
//     }).addTo(map);

//     // // Add your campus image overlay
//     // const imageUrl = '/map.png'; // Make sure this is in your public folder
//     // const imageBounds: L.LatLngBoundsExpression = [
//     //   [26.841, 75.563], // Southwest corner  
//     //   [26.845, 75.568]  // Northeast corner
//     // ];

//     // L.imageOverlay(imageUrl, imageBounds).addTo(map);

//     const imageUrl = '/public/muj_map.png'; // Must be in public folder
//     const imageBounds: L.LatLngBoundsExpression = [
//     [26.841, 75.563], // Southwest corner  
//     [26.845, 75.568]  // Northeast corner
//     ];

//     L.imageOverlay(imageUrl, imageBounds).addTo(map);

//     // Add fallback tile layer (commented out, uncomment if image doesn't load)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(map);

//     mapRef.current = map;

//     // Add markers for all locations
//     campusStops.forEach(stop => {
//       if (stop.coordinates) {
//         const marker = L.marker(stop.coordinates, {
//           icon: createCustomIcon(stop.category, stop.id === selectedStop)
//         }).addTo(map);

//         // Create popup content
//         const popupContent = `
//           <div style="min-width: 250px; font-family: system-ui;">
//             <h3 style="margin-bottom: 8px; color: #333; font-size: 16px;">${stop.name}</h3>
//             <p style="margin-bottom: 8px; color: #666; font-size: 14px;">${stop.description}</p>
//             <div style="margin-bottom: 10px;">
//               <span style="background: ${categoryIconColors[stop.category as keyof typeof categoryIconColors]}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
//                 ${stop.category}
//               </span>
//             </div>
//             ${stop.hours ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Hours:</strong> ${stop.hours}</p>` : ''}
//             ${stop.contact ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Contact:</strong> ${stop.contact}</p>` : ''}
//           </div>
//         `;

//         marker.bindPopup(popupContent);
        
//         // Click handler to update selected stop
//         marker.on('click', () => {
//           setSelectedStop(stop.id);
//         });

//         markersRef.current.push(marker);
//       }
//     });

//     // Cleanup function
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//         markersRef.current = [];
//       }
//     };
//   }, []);

//   // Update markers when selected stop changes
//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Update marker icons based on selection
//     markersRef.current.forEach((marker, index) => {
//       const stop = campusStops[index];
//       if (stop && stop.coordinates) {
//         marker.setIcon(createCustomIcon(stop.category, stop.id === selectedStop));
        
//         // Center map on selected location
//         if (stop.id === selectedStop) {
//           mapRef.current!.setView(stop.coordinates, 18, { animate: true });
//         }
//       }
//     });
//   }, [selectedStop]);

//   // Function to open 360° tour
//   const open360Tour = (url: string, name: string) => {
//     if (url && !url.includes('YOUR_') && !url.includes('TOUR_ID')) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     } else {
//       alert(`360° tour for ${name} coming soon!`);
//     }
//   };

//   // Function to open Google Maps
//   const openGoogleMaps = (url: string) => {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 shadow-lg relative overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-10"></div>
//         <div className="relative z-10 px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
//             >
//               {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//             <div className="flex items-center space-x-2">
//               <Navigation className="text-yellow-300" size={32} />
//               <h1 className="text-2xl font-bold text-white">MUJ Campus Navigator</h1>
//             </div>
//           </div>
//           <div className="hidden sm:block text-yellow-200 font-medium">
//             Interactive Campus Map with 360° Tours
//           </div>
//         </div>
//       </header>

//       <div className="flex h-[calc(100vh-80px)]">
//         {/* Mobile Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//           lg:translate-x-0 fixed lg:static z-50 lg:z-auto
//           w-80 h-full bg-white border-r border-orange-200 shadow-xl lg:shadow-none
//           transition-transform duration-300 ease-in-out
//         `}>
//           <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Campus Locations</h2>
//             <p className="text-sm text-gray-600">Click on any location to view on map</p>
//           </div>
          
//           <div className="overflow-y-auto h-full pb-6">
//             <div className="p-4 space-y-3">
//               {campusStops.map((stop) => (
//                 <button
//                   key={stop.id}
//                   onClick={() => {
//                     setSelectedStop(stop.id);
//                     setSidebarOpen(false);
//                   }}
//                   className={`
//                     w-full text-left p-4 rounded-xl border-2 transition-all duration-200
//                     hover:shadow-lg hover:scale-[1.02] transform
//                     ${selectedStop === stop.id
//                       ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg'
//                       : 'bg-white hover:bg-orange-50 border-gray-200 hover:border-orange-300 text-gray-800'
//                     }
//                   `}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-1">
//                         <MapPin size={16} className={selectedStop === stop.id ? 'text-yellow-300' : 'text-orange-500'} />
//                         <h3 className="font-semibold text-sm">{stop.name}</h3>
//                       </div>
//                       <p className={`text-xs mb-2 ${selectedStop === stop.id ? 'text-orange-100' : 'text-gray-600'}`}>
//                         {stop.description}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`
//                     inline-block px-2 py-1 text-xs font-medium rounded-full border
//                     ${selectedStop === stop.id 
//                       ? 'bg-white/20 text-white border-white/30' 
//                       : categoryColors[stop.category as keyof typeof categoryColors]
//                     }
//                   `}>
//                     {stop.category}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Map Container */}
//           <div className="flex-1 relative bg-gray-100">
//             <div className="absolute inset-4 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//               <div 
//                 ref={mapContainerRef}
//                 className="h-full w-full"
//                 style={{ minHeight: '400px' }}
//               />
//             </div>
//           </div>

//           {/* Selected Location Info Panel */}
//           {selectedStopData && (
//             <div className="bg-white border-t border-orange-200 p-6 shadow-lg">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//                   <div className="flex items-center space-x-3 mb-2 sm:mb-0">
//                     <MapPin className="text-orange-500" size={24} />
//                     <h3 className="text-xl font-bold text-gray-900">{selectedStopData.name}</h3>
//                     <span className={`
//                       px-3 py-1 text-sm font-medium rounded-full border
//                       ${categoryColors[selectedStopData.category as keyof typeof categoryColors]}
//                     `}>
//                       {selectedStopData.category}
//                     </span>
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="flex space-x-2">
//                     {selectedStopData.tourUrl && (
//                       <button
//                         onClick={() => open360Tour(selectedStopData.tourUrl!, selectedStopData.name)}
//                         className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
//                       >
//                         <Globe size={16} />
//                         <span className="text-sm font-medium">360° Tour</span>
//                       </button>
//                     )}
//                     {selectedStopData.googleMapsUrl && (
//                       <button
//                         onClick={() => openGoogleMaps(selectedStopData.googleMapsUrl!)}
//                         className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                       >
//                         <ExternalLink size={16} />
//                         <span className="text-sm font-medium">Google Maps</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 <p className="text-gray-600 mb-4">{selectedStopData.description}</p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {selectedStopData.hours && (
//                     <div className="flex items-center space-x-2 text-sm">
//                       <Clock size={16} className="text-orange-500" />
//                       <span className="font-medium text-gray-700">Hours:</span>
//                       <span className="text-gray-600">{selectedStopData.hours}</span>
//                     </div>
//                   )}
//                   {selectedStopData.contact && (
//                     <div className="flex items-center space-x-2 text-sm">
//                       <Phone size={16} className="text-orange-500" />
//                       <span className="font-medium text-gray-700">Contact:</span>
//                       <span className="text-gray-600">{selectedStopData.contact}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;