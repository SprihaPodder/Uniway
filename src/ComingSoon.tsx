import React, { useEffect, useState } from 'react';
import { Clock, Star, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showCountdown?: boolean;
  targetDate?: Date;
  onNotifyMe?: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  subtitle = "Something Amazing is Coming",
  description = "We're working hard to bring you an incredible experience. Stay tuned for updates!",
  showCountdown = false,
  targetDate,
  onNotifyMe
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-bounce opacity-30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}
    >
      <Sparkles size={12 + Math.random() * 8} className="text-yellow-300" />
    </div>
  ));

  // Countdown timer effect
  useEffect(() => {
    if (!showCountdown || !targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, targetDate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Icon with Animation */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-2xl animate-bounce">
            <Clock size={40} className="text-white" />
          </div>
          
          {/* Pulsing Ring */}
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-20 animate-ping"></div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
          {title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {description}
        </p>

        {/* Countdown Timer */}
        {showCountdown && targetDate && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-center space-x-4 md:space-x-8">
              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-xl p-4 min-w-[80px] border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600">{timeLeft.days}</div>
                  <div className="text-sm text-gray-500">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-xl p-4 min-w-[80px] border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-500">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-xl p-4 min-w-[80px] border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-xl p-4 min-w-[80px] border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600">{timeLeft.seconds}</div>
                  <div className="text-sm text-gray-500">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {onNotifyMe && (
            <button
              onClick={onNotifyMe}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-300 hover:from-orange-600 hover:to-red-600"
            >
              <Star size={20} className="mr-2 group-hover:animate-spin" />
              Notify Me When Ready
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          
          <button className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 border border-gray-200 hover:border-orange-300">
            <Calendar size={20} className="mr-2" />
            Stay Updated
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="bg-gray-200 rounded-full h-3 max-w-md mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full animate-progress-bar"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Development Progress: 75%</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
