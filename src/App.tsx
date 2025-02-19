import React, { useState, useRef, useEffect } from 'react';
import { Settings2, Bookmark, Sun, Moon, Type, Minus, Plus, Monitor } from 'lucide-react';

function App() {
  const [progress, setProgress] = useState(30);
  const [showAppearanceMenu, setShowAppearanceMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const chapters = [10, 25, 40, 55, 70, 85];

  const appearanceRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (appearanceRef.current && !appearanceRef.current.contains(event.target as Node)) {
        setShowAppearanceMenu(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFontSizeChange = (change: number) => {
    setFontSize(prev => Math.min(Math.max(12, prev + change), 24));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
        <div>
          <h1 className="text-xl font-semibold">The Great Gatsby</h1>
          <p className="text-sm text-gray-600">F. Scott Fitzgerald</p>
        </div>
        <div className="flex gap-4 items-center relative">
          {/* Appearance Menu */}
          <div ref={appearanceRef} className="relative">
            <button 
              onClick={() => {
                setShowAppearanceMenu(!showAppearanceMenu);
                setShowSettingsMenu(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Sun className="w-5 h-5 text-gray-600" />
            </button>
            {showAppearanceMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Appearance</h3>
                  <div className="space-y-4">
                    {/* Theme Selection */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Theme</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex-1 p-2 rounded ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                        >
                          <Sun className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex-1 p-2 rounded ${theme === 'dark' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                        >
                          <Moon className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          onClick={() => setTheme('system')}
                          className={`flex-1 p-2 rounded ${theme === 'system' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                        >
                          <Monitor className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                    {/* Font Size */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Font Size</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleFontSizeChange(-1)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center text-sm">{fontSize}px</span>
                        <button
                          onClick={() => handleFontSizeChange(1)}
                          className="p-1 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bookmark className="w-5 h-5 text-gray-600" />
          </button>

          {/* Settings Menu */}
          <div ref={settingsRef} className="relative">
            <button 
              onClick={() => {
                setShowSettingsMenu(!showSettingsMenu);
                setShowAppearanceMenu(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings2 className="w-5 h-5 text-gray-600" />
            </button>
            {showSettingsMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Page Numbers</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Show Progress Bar</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex">
        {/* Left Column */}
        <div className="flex-1 p-8 max-w-[50ch] mx-auto">
          <p className="text-gray-800 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
            In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4" style={{ fontSize: `${fontSize}px` }}>
            "Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."
          </p>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-8 max-w-[50ch] mx-auto">
          <p className="text-gray-800 leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
            He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4" style={{ fontSize: `${fontSize}px` }}>
            In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-20 border-t border-gray-200 px-6 flex flex-col justify-center bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Chapter 1: The Beginning</span>
          <span className="text-sm text-gray-600">Page 1 of 180</span>
        </div>
        <div className="relative w-full">
          <input
            type="range"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          {/* Chapter markers */}
          <div className="absolute top-1/2 w-full -translate-y-1/2 pointer-events-none">
            {chapters.map((position, index) => (
              <div
                key={index}
                className="absolute w-1 h-1 bg-gray-400 rounded-full"
                style={{ left: `${position}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;