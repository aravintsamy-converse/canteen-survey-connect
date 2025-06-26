import { ListCheck } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface SearchResult {
  id: number;
  longName: string;
}

const NutritionInformation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false); // New state variable

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();
    setSearchQuery(query);
  };

  const handleNextPage = async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const response = await axios.get(
        `https://dev-fieldservice-survey-api.cg-canteen.com/nutritions?query=${encodeURIComponent(searchQuery)}`
      );
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setSearchResults(response.data);
        setHasSearched(true); // Set to true after successful search
      } else {
        setError('Content not found');
      }
    } catch (err) {
      setError('Content not found');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    setHasSearched(false); // Reset to show search input again
    setSearchResults([]); // Clear previous results
    setError(''); // Clear any errors
  };

  return (
    <div className="min-h-[87vh] flex flex-col justify-between items-center">
      <div className="flex justify-center items-center px-1 w-full md:w-[63%]">
        <div className="text-white w-full mt-4">
          <div className="bg-white p-6 rounded-0 shadow mb-4 flex items-center justify-between">
            <div className="text-xl md:text-2xl text-black font-bold">Nutrition Information</div>
            <div className="text-gray-600 mt-2"><ListCheck /></div>
          </div>
          <div className="py-4 rounded-[10px]">
            {/* Conditionally render search input */}
            {!hasSearched && (
              <div>
                <h2 className="text-xl text-black pb-2">Search<span className="text-red-600">*</span></h2>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={searchQuery}
                  onChange={handleInputChange}
                  maxLength={50}
                  className="w-full md:w-[50%] p-2 border border-[#464646] rounded-[12px] bg-[#808080] focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
                />
                <div className="text-left text-[16px] mt-1 font-[400]" style={{ textShadow: '0 0 0 #444444' }}>
                  {50 - searchQuery.length} Characters Remaining
                </div>
                {error && (
                  <div className="text-red-600 text-[16px] mt-2">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Conditionally render search results */}
            {hasSearched && (
              searchResults.length > 0 ? (
                <div className="mt-4 p-4 bg-white rounded-[10px]">
                  <h3 className="text-lg text-black mb-2">Search Results</h3>
                  <div className="w-full h-[1px] bg-[#808080]"></div>
                  <div className="space-y-2">
                    {searchResults.map((item, index) => (
                      <label key={index} className="flex items-center">
                        <input type="radio" name="nutrition" className="mr-2" />
                        <span className="text-black">{item.id} ({item.longName})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-white rounded-[10px]">
                  <h3 className="text-lg text-black mb-2">Search Results</h3>
                  <div className="w-full h-[1px] bg-[#808080]"></div>
                  <p className="text-black">No results found.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 p-4 flex justify-between items-center shadow-lg">
        <button
          onClick={handlePreviousPage}
          className="bg-[#FFFFFF] cursor-pointer text-black hover:bg-[#c1f001] font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleNextPage}
            disabled={(!searchQuery || isLoading) && !hasSearched}
            className={`bg-[#FFFFFF] font-[700] text-black rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f] ${(!searchQuery || isLoading) && !hasSearched
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer hover:bg-[#c1f001]'
              }`}
          >
            {isLoading ? 'Loading...' : hasSearched ? 'Next' : 'Next Page'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionInformation;