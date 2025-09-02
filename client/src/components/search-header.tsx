import { useState, useEffect } from "react";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  searchQuery: string;
  totalCount: number;
  filteredCount: number;
  isLoading?: boolean;
}

export function SearchHeader({ 
  onSearch, 
  onClearSearch, 
  searchQuery, 
  totalCount, 
  filteredCount,
  isLoading = false
}: SearchHeaderProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClearSearch();
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    onClearSearch();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            <i className="fas fa-code text-primary mr-2"></i>
            Appx API List
          </h1>
          <p className="text-muted-foreground text-base">Comprehensive database of app APIs - Search, discover, and integrate</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-muted-foreground"></i>
            </div>
            <input 
              type="text" 
              value={localQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="block w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-base"
              placeholder="Search by app name... (e.g., 'agriculture', 'academy', 'classes')"
              autoComplete="off"
              data-testid="input-search"
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-muted-foreground" data-testid="text-results-counter">
              {isLoading ? (
                "Loading..."
              ) : searchQuery ? (
                `${filteredCount} of ${totalCount} apps found`
              ) : (
                `${totalCount} apps available`
              )}
            </div>
            {searchQuery && (
              <button 
                onClick={handleClear}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
                data-testid="button-clear-search"
              >
                <i className="fas fa-times mr-1"></i>Clear search
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
