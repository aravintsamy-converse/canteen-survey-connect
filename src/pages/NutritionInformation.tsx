import { ListCheck } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface SearchResult {
  id: number;
  longName: string;
}

interface NutritionDetails {
  LongName?: string,
  Calories?: string,
  CaloriesFromFat?: string,
  TotalFat?: string,
  SaturatedFat?: string,
  TransFat?: string,
  Cholesterol?: string,
  Sodium?: string,
  TotalCarbohydrate?: string,
  Protein?: string,
  Sugars?: string,
  DietaryFiber?: string,
}

const NutritionInformation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [nutritionDetails, setNutritionDetails] = useState<NutritionDetails | null>(null);
  const [viewState, setViewState] = useState<'search' | 'results' | 'details'>('search');

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
        setViewState('results'); // Move to results view
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

  const handleItemSelect = async (itemId: number) => {
    setSelectedItemId(itemId);
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://dev-fieldservice-survey-api.cg-canteen.com/nutritions?product_id=${itemId}`
      );
      if (response.data) {
        setNutritionDetails(response.data);
        setViewState('details'); // Move to details view
      } else {
        setError('Nutrition details not found');
      }
    } catch (err) {
      setError('Failed to load nutrition details');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (viewState === 'details') {
      // Go back to results view
      setViewState('results');
      setNutritionDetails(null);
    } else if (viewState === 'results') {
      // Go back to search view
      setViewState('search');
      setSearchResults([]);
    }
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-78px)] flex flex-col justify-between items-center">
      <div className="flex justify-center items-center px-1 w-full md:w-[63%]">
        <div className="text-white w-full mt-4">
          <div className="bg-white p-6 rounded-0 shadow mb-4 flex items-center justify-between">
            <div className="text-xl md:text-2xl text-black font-bold">Nutrition Information</div>
            <div className="text-gray-600 mt-2"><ListCheck /></div>
          </div>
          <div className="py-4 rounded-[10px]">
            {/* Search Input - shown only in search view */}
            {viewState === 'search' && (
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

            {/* Search Results - shown only in results view */}
            {viewState === 'results' && (
              searchResults.length > 0 ? (
                <div className="mt-4 p-4 bg-white rounded-[10px]">
                  <h3 className="text-lg text-black mb-2">Search Results</h3>
                  <div className="w-full h-[1px] bg-[#808080]"></div>
                  <div className="space-y-2">
                    {searchResults.map((item, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="nutrition"
                          className="mr-2"
                          onChange={() => handleItemSelect(item.id)}
                        />
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

            {/* Nutrition Details - shown only in details view */}
            {/* {viewState === 'details' && nutritionDetails && ( */}
            <div className="mt-4 bg-white rounded-[10px] shadow-md">
              <h3 className="text-lg text-black p-3">Nutrition Info</h3>
              <div className="w-full h-[1px] bg-[#bcb8b8] mb-1"></div>

              <div className="px-4 py-1">
                <h4 className="text-md text-gray-700 mb-2">Hersheys Special Dark (1.45oz)</h4>
                <h5 className="text-md text-black mb-2">Nutrition Facts</h5>

                <div className="w-full h-[1px] bg-[#808080] my-2"></div>

                <div className="space-y-2 text-black text-sm w-full md:w-[50%] 2xl:w-[35%]">
                  <div className="flex justify-between">
                    <p><strong>Calories</strong> 190</p>
                  </div>
                  <div className="flex justify-between">
                    <p><strong>Calories From Fat</strong> 110</p>
                  </div>

                  <div className="w-full h-[1px] bg-[#808080] my-2"></div>

                  <div className="grid grid-cols-[70%_30%]">
                    <p className="font-semibold"></p>
                    <p className="font-normal">% Daily Value</p>
                  </div>

                  <div className="grid grid-cols-[70%_30%]">
                    <p><strong>Total Fat</strong> 12g</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%] pl-4">
                    <p><strong>Saturated Fat</strong> 8g</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%] pl-4">
                    <p><strong>Trans Fat</strong> 0g</p>
                    <p>–</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%]">
                    <p><strong>Cholesterol</strong> 5mg</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%]">
                    <p><strong>Sodium</strong> 15mg</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%]">
                    <p><strong>Total Carbohydrate</strong> 25g</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%] pl-4">
                    <p><strong>Dietary Fiber</strong> 3g</p>
                    <p>0%</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%] pl-4">
                    <p><strong>Sugars</strong> 21g</p>
                    <p>–</p>
                  </div>
                  <div className="grid grid-cols-[70%_30%]">
                    <p><strong>Protein</strong> 2g</p>
                    <p>0%</p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#808080] my-4"></div>

                <div className="mt-4 flex justify-center">
                  <img
                    src="https://www.bvfpulse.com/prod/asset.server/Imageserver.aspx?assetKey=IVENDPRODUCT|6516.gif"
                    alt="Hershey's Special Dark"
                    className="w-32"
                  />
                </div>
              </div>
            </div>

            {/* )} */}
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 p-4 flex justify-between items-center shadow-lg">
        <button
          onClick={handlePreviousPage}
          disabled={viewState === 'search'}
          className={`bg-[#FFFFFF] text-black font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f] ${viewState === 'search' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#c1f001]'
            }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {viewState === 'search' && (
            <button
              onClick={handleNextPage}
              disabled={!searchQuery || isLoading}
              className={`bg-[#FFFFFF] font-[700] text-black rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f] ${!searchQuery || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#c1f001]'
                }`}
            >
              {isLoading ? 'Loading...' : 'Next Page'}
            </button>
          )}
          {viewState === 'details' && (
            <button
              className="bg-[#c1f001] cursor-pointer text-black hover:bg-[#a5d000] font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f]"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionInformation;