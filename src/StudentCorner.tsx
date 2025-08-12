import React, { useState } from 'react';
import { MapPin, Clock, Star, ChefHat, Calendar, Users, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CafeteriaSpot {
  id: string;
  name: string;
  image: string;
  location: string;
  specialDishes: string[];
  hours: string;
  rating: number;
  description: string;
}

interface FlagshipEvent {
  id: string;
  name: string;
  image: string;
  date: string;
  description: string;
  attendees: string;
}

const cafeteriaSpots: CafeteriaSpot[] = [
  {
    id: 'italianoven',
    name: 'Italian Oven',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cMaGcb665G8HvWrx1lLPHU6EDXPR8uT5Fg&s',
    location: 'Academic Block 2',
    specialDishes: ['Pizzas', 'Pastas', 'Wraps'],
    hours: '9:00 AM - 6:00 PM',
    rating: 4.5,
    description: 'From our oven to your heart - genuine Italian comfort food with a campus twist.'
  },
  {
    id: 'devine-snacks',
    name: 'Devine Snacks',
    image: 'https://content.jdmagicbox.com/comp/jaipur/j1/0141px141.x141.220327235943.y6j1/catalogue/devine-snacks-jaipur-food-court-qj0779boqw-250.jpg',
    location: 'Academic Block 2',
    specialDishes: ['Samosa', 'Kachori', 'Tea'],
    hours: '9:00 AM - 6:00 PM',
    rating: 4.4,
    description: 'Where crispy meets tangy — Devine’s chaat is pure magic for your taste buds.'
  },
  {
    id: 'nescafe',
    name: 'Nescafe',
    image: 'https://content.jdmagicbox.com/comp/jaipur/c4/0141px141.x141.200627214908.s2c4/catalogue/nescafe-campus-cafe-jaipur-coffee-shops-vfLO7N4nSo.jpg',
    location: 'Old Mess',
    specialDishes: ['Coffee', 'Maggie', 'Sandwiches'],
    hours: '9:00 AM - 6:00 PM',
    rating: 4.6,
    description: 'That’s that me Espresso—better than your morning coffee!'
  },
  {
    id: 'old-mess',
    name: 'Old Mess',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nomOoDRJ26hxP5phTALc0mq1nQULw-qlivj3P1PjPB1xt0Vo12NK6dlE0GOMLV61naZRlOZdPnXG3QzHKM46FPnC5vMAnejI8HJEMj82Q7iWmZn7X7DJ5NS3nkRYt1G2CODBpa2=s1360-w1360-h1020-rw',
    location: 'Old Mess between Academic Block 1 and 2',
    specialDishes: ['Full Meals', 'Curry', 'Roti'],
    hours: '9:00 AM - 6:00 PM',
    rating: 4.0,
    description: 'Where stories are served hotter than the food.'
  }
];

const flagshipEvents: FlagshipEvent[] = [
 {
    id: 'lecture-hall-complex',
    name: 'Lecture Hall Complex',
    image: 'https://files.prokerala.com/news/photos/imgs/1024/dharmendra-pradhan-inaugurates-lecture-hall-at-1911394.jpg',
    date: 'Year Round',
    description: 'Success ke peeche mat bhaago, excellence ka pichha karo… success jhak maarke tumhare peeche aayegi',
    attendees: 'Faculty & Students'
  },
  {
    id: 'academic-block-2',
    name: 'Academic Block 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTignVkVN9PuLHOysbVWFOOoa89Ty948Ws3wg&s',
    date: 'Year Round',
    description: 'Aal Izz Well… bas exams ke result ke din chhod ke',
    attendees: 'Faculty & Students'
  },
  {
    id: 'academic-block-1',
    name: 'Academic Block 1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSpjHCjGAHRCzXGECZLLfeTori-AUqasffQ&s',
    date: 'Year Round',
    description: 'Life yahan sirf padhai nahi… dosti, rants, aur late submissions ka mix hai.',
    attendees: 'Faculty & Students'
  },
  {
    id: 'academic-block-3',
    name: 'Academic Block 3',
    image: 'https://trcww.in/wp-content/uploads/2024/07/manipal-academic.jpg',
    date: 'Year Round',
    description: 'The land of notes, naps & last-minute assignments.',
    attendees: 'Faculty & Students'
  },
  {
    id: 'dome-building',
    name: 'Dome Building',
    image: 'https://manipalblobstorage.blob.core.windows.net/manipal-azr-container//002_Institute_MUJ_1_jpg_1296x700_3653573dc5.webp',
    date: 'Year Round',
    description: 'Our campus’ very own Taj Mahal… minus the tourists',
    attendees: 'Campus Visitors'
  },
  {
    id: 'main-entrance',
    name: 'Main Entrance',
    image: 'https://live.staticflickr.com/1811/30071711498_c5126a5189_b.jpg',
    date: 'Year Round',
    description: 'Beyond this gate: deadlines, chai breaks & a lifetime of friends',
    attendees: 'All Visitors'
  }

];


const StudentCorner: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCafeteria, setSelectedCafeteria] = useState<string>(cafeteriaSpots[0].id);

  const selectedSpot = cafeteriaSpots.find(spot => spot.id === selectedCafeteria);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 mb-4 px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Campus Map</span>
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <ChefHat className="text-yellow-100" size={40} />
              <h1 className="text-4xl font-bold text-white">Student Corner</h1>
            </div>
            <p className="text-yellow-100 text-lg font-medium">
              Discover amazing food spots and memorable events on campus
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Cafeteria Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Munching Spots</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our diverse mid-class munching options, from casual cafés to aesthetic experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image Gallery */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Dining Locations</h3>
              <div className="space-y-4">
                {cafeteriaSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedCafeteria(spot.id)}
                    className={`
                      w-full text-left group relative overflow-hidden rounded-2xl shadow-lg
                      transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl
                      ${selectedCafeteria === spot.id 
                        ? 'ring-4 ring-orange-400 ring-opacity-50' 
                        : 'hover:ring-2 hover:ring-yellow-400 hover:ring-opacity-30'
                      }
                    `}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-bold text-lg mb-1">{spot.name}</h4>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-yellow-300" />
                          <span className="text-yellow-100 text-sm">{spot.location}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:sticky lg:top-6">
              {selectedSpot && (
                <div className="bg-white rounded-2xl shadow-xl border-l-4 border-orange-400 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">{selectedSpot.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={20} />
                        <span className="text-gray-700 font-semibold">{selectedSpot.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">{selectedSpot.description}</p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="text-orange-500" size={18} />
                            <span className="font-semibold text-gray-700">Location</span>
                          </div>
                          <p className="text-gray-600 ml-6">{selectedSpot.location}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="text-orange-500" size={18} />
                            <span className="font-semibold text-gray-700">Hours</span>
                          </div>
                          <p className="text-gray-600 ml-6">{selectedSpot.hours}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <ChefHat className="text-orange-500" size={18} />
                          <span className="font-semibold text-gray-700">Specialties</span>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-6">
                          {selectedSpot.specialDishes.map((dish, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flagship Events Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Award className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Block Insights</h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Spaces that define our campus community
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max px-2">
              {flagshipEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{event.name}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-orange-500" size={16} />
                        <span className="text-sm font-semibold text-gray-700">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="text-orange-500" size={16} />
                        <span className="text-sm text-gray-600">{event.attendees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCorner;
