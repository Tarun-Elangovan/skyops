import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plane, Calendar, Filter, ChevronDown } from 'lucide-react';
import { useOperations } from '../../context/OperationsContext';

export const FloatingSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { flights } = useOperations();

  const [query, setQuery] = useState('');
  const [airline, setAirline] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('Today, Live');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matched = new Set<string>();
    flights.forEach((f) => {
      if (f.flightNumber.toLowerCase().includes(val.toLowerCase())) {
        matched.add(f.flightNumber);
      }
      if (f.origin.toLowerCase().includes(val.toLowerCase()) || f.originName.toLowerCase().includes(val.toLowerCase())) {
        matched.add(`${f.origin} (${f.originName.split(',')[0]})`);
      }
      if (f.destination.toLowerCase().includes(val.toLowerCase()) || f.destinationName.toLowerCase().includes(val.toLowerCase())) {
        matched.add(`${f.destination} (${f.destinationName.split(',')[0]})`);
      }
    });
    setSuggestions(Array.from(matched).slice(0, 5));
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (item: string) => {
    const flightNum = item.split(' ')[0];
    setQuery(flightNum);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (airline) params.set('airline', airline);
    if (status) params.set('status', status);
    navigate(`/app/flights?${params.toString()}`);
  };

  return (
    <div className="relative z-30 max-w-5xl mx-auto px-4 -mt-10 sm:-mt-12">
      <form
        onSubmit={handleSearch}
        className="p-3 sm:p-4 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-sky-950/10 flex flex-col lg:flex-row items-stretch lg:items-center gap-3"
      >
        {/* Field 1: Flight Number or Route */}
        <div className="flex-1 relative">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1 pl-1">
            Flight No. or Airport Route
          </label>
          <div className="relative flex items-center">
            <Plane className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => query && setShowSuggestions(true)}
              placeholder="e.g. AI302, BOM, DEL..."
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs text-slate-800">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full px-3.5 py-2 text-left hover:bg-blue-50 font-mono text-xs flex items-center justify-between"
                >
                  <span>{s}</span>
                  <span className="text-[10px] text-blue-600 font-medium">select</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Field 2: Airline */}
        <div className="w-full lg:w-48">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1 pl-1">
            Airline Carrier
          </label>
          <div className="relative flex items-center">
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white appearance-none"
            >
              <option value="">All Airlines</option>
              <option value="Air India">Air India (AI)</option>
              <option value="IndiGo">IndiGo (6E)</option>
              <option value="Emirates">Emirates (EK)</option>
              <option value="Singapore Airlines">Singapore Airlines (SQ)</option>
              <option value="Lufthansa">Lufthansa (LH)</option>
              <option value="British Airways">British Airways (BA)</option>
              <option value="Qatar Airways">Qatar Airways (QR)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>

        {/* Field 3: Date */}
        <div className="w-full lg:w-44">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1 pl-1">
            Operational Date
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              readOnly
              value={date}
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium cursor-default"
            />
          </div>
        </div>

        {/* Field 4: Status */}
        <div className="w-full lg:w-44">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1 pl-1">
            Flight Status
          </label>
          <div className="relative flex items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="Delayed">Delayed Only</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Air">In Air</option>
              <option value="Landed">Landed</option>
              <option value="Boarding">Boarding</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 lg:pt-5">
          <button
            type="submit"
            className="w-full lg:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="whitespace-nowrap">Search Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
};
