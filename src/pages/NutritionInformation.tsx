import { ListCheck } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Loader from "../component/Loader";

interface SearchResult {
  id: number;
  longName: string;
}

interface NutritionDetails {
  LongName?: string;
  Calories?: string;
  CaloriesFromFat?: string;
  TotalFat?: string;
  SaturatedFat?: string;
  TransFat?: string;
  Cholesterol?: string;
  Sodium?: string;
  TotalCarbohydrate?: string;
  Protein?: string;
  Sugars?: string;
  DietaryFiber?: string;
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

  // First search API call
  const handleNextPage = async () => {
    if (viewState === 'search') {
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
          setViewState('results');
        } else {
          setError('No Products Found');
        }
      } catch (err) {
        setError('No Products Found');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    // Second API call when in results view with selected item
    else if (viewState === 'results') {
      if (!selectedItemId) {
        setError('Please select an item');
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `https://dev-fieldservice-survey-api.cg-canteen.com/nutritions?product_id=${selectedItemId}`
        );
        if (response.data) {
          setNutritionDetails(response.data);
          setViewState('details');
        } else {
          setError('Nutrition details not found');
        }
      } catch (err) {
        setError('Failed to load nutrition details');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleItemSelect = (itemId: number) => {
    setSelectedItemId(itemId);
    setError(''); // Clear any previous errors
  };

  const handlePreviousPage = () => {
    if (viewState === 'details') {
      setViewState('results');
      setNutritionDetails(null);
    } else if (viewState === 'results') {
      setViewState('search');
      setSearchResults([]);
      setSelectedItemId(null);
    }
    setError('');
  };

  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="min-h-[calc(100vh-116px)] flex flex-col justify-between items-center">
          <div className="flex justify-center items-center px-1 w-full md:w-[63%]">
            <div className="text-white w-full mt-4">
              <div className="bg-white p-6 rounded-0 shadow mb-4 flex items-center justify-between">
                <div className="text-xl md:text-2xl text-black font-bold">Nutrition Information</div>
                <div className="text-gray-600 mt-2"><ListCheck /></div>
              </div>
              <div className="rounded-[10px]">
                {/* Search Input - shown only in search view */}
                {viewState === 'search' && (
                  <div>
                    <h2 className="text-xl text-white pb-2">Search<span className="text-red-600">*</span></h2>
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
                      <div className="text-white text-[16px] mt-2">
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {/* Search Results - shown only in results view */}
                {viewState === 'results' && (
                  searchResults.length > 0 ? (
                    <div className="mt-4 bg-white rounded-[10px] shadow-md">
                      <h3 className="text-lg text-black p-3">Search Results</h3>
                      <div className="w-full h-[1px] bg-[#bcb8b8] mb-1"></div>
                      <div className="px-6 py-5 w-full">
                        <div className="space-y-4">
                          {searchResults.map((item, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="radio"
                                value={item.id}
                                name="nutrition"
                                className="mr-3"
                                onChange={() => handleItemSelect(item.id)}
                                checked={selectedItemId === item.id}
                              />
                              <span className="text-black">{item.id} ({item.longName})</span>
                            </label>
                          ))}
                        </div>
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
                {viewState === 'details' && nutritionDetails && (
                  <div className="mt-4 bg-white rounded-[10px] shadow-md">
                    <h3 className="text-lg text-black p-3">Nutrition Info</h3>
                    <div className="w-full h-[1px] bg-[#bcb8b8] mb-1"></div>

                    <div className="px-6 py-1 w-full lg:w-[70%] 2xl:w-[35%]">
                      <h4 className="text-lg font-bold text-black mb-2">{nutritionDetails.LongName || 'Product'}</h4>
                      <h5 className="text-lg font-bold text-black mb-2">Nutrition Facts</h5>

                      <div className="w-full h-[1px] bg-[#808080] my-2"></div>
                      <div className="flex text-black justify-between">
                        <p><strong>Calories</strong> {nutritionDetails.Calories || 'N/A'}</p>
                      </div>
                      <div className="flex text-black justify-between">
                        <p><strong>Calories From Fat</strong> {nutritionDetails.CaloriesFromFat || 'N/A'}</p>
                      </div>
                      <div className="w-full h-[1px] bg-[#808080] my-2"></div>
                      <table className="w-full text-black">
                        <tbody>
                          <tr>
                            <td></td>
                            <td><small>% Daily Value</small></td>
                          </tr>
                          <tr>
                            <td><b>Total Fat</b> {nutritionDetails.TotalFat || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>&nbsp;&nbsp;&nbsp;&nbsp;Saturated Fat</b> {nutritionDetails.SaturatedFat || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>&nbsp;&nbsp;&nbsp;&nbsp;Trans Fat</b> {nutritionDetails.TransFat || 'N/A'}</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td><b>Cholesterol</b> {nutritionDetails.Cholesterol || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>Sodium</b> {nutritionDetails.Sodium || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>Total Carbohydrate</b> {nutritionDetails.TotalCarbohydrate || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>&nbsp;&nbsp;&nbsp;&nbsp;Dietary Fiber</b> {nutritionDetails.DietaryFiber || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                          <tr>
                            <td><b>&nbsp;&nbsp;&nbsp;&nbsp;Sugars</b> {nutritionDetails.Sugars || 'N/A'}</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td><b>Protein</b> {nutritionDetails.Protein || 'N/A'}</td>
                            <td>0%</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="w-full h-[1px] bg-[#808080] my-4"></div>

                      <div className="mt-4 flex justify-center">
                        <img
                          src="https://www.bvfpulse.com/prod/asset.server/Imageserver.aspx?assetKey=IVENDPRODUCT|6516.gif"
                          alt={nutritionDetails.LongName || 'Product'}
                          className="w-62 h-62"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sticky bottom-0 p-2 md:p-4 z-50 flex justify-between items-center bg-[#4D4D4D] shadow-lg">
            <button
              onClick={handlePreviousPage}
              disabled={viewState === 'search'}
              className={`bg-[#FFFFFF] text-black font-[700] rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f] ${viewState === 'search' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#c1f001]'
                }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {(viewState === 'search' || viewState === 'results') && (
                <button
                  onClick={handleNextPage}
                  disabled={
                    (viewState === 'search' && (!searchQuery || isLoading)) ||
                    (viewState === 'results' && (!selectedItemId || isLoading))
                  }
                  className={`bg-[#FFFFFF] font-[700] text-black rounded-[16px] px-3 py-2 text-[18px] border border-[#000] transition duration-300 ease-in-out focus:outline-none focus:ring-0 focus:ring-[#464646] focus:shadow-[0_0_12px_#92ae1f] ${(viewState === 'search' && (!searchQuery || isLoading)) ||
                      (viewState === 'results' && (!selectedItemId || isLoading))
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-[#c1f001]'
                    }`}
                >
                  { 'Next Page'}
                </button>
              )}

            </div>
          </div>
        </div>
      )}

    </>

  );
};

export default NutritionInformation;