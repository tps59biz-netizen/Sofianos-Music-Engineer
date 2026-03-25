import { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadAudio = async () => {
    setIsLoading(true);
    try {
      const selected = await open({
        filters: [
          {
            name: 'Audio Files',
            extensions: ['wav', 'mp3', 'flac', 'aiff']
          }
        ],
        defaultPath: undefined,
        directory: false,
        multiple: false,
        title: 'Load Audio File'
      });

      if (selected) {
        setSelectedFile(selected as string);
      }
    } catch (error) {
      console.error('Error opening file dialog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-white">sofianos</h1>
        
        <button
          onClick={handleLoadAudio}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Loading...' : 'Load Audio File'}
        </button>

        {selectedFile && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700 max-w-2xl">
            <p className="text-gray-400 text-sm">Selected File:</p>
            <p className="text-white font-mono text-sm break-all mt-2">{selectedFile}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;