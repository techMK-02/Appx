import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchHeader } from "@/components/search-header";
import { ApiCard } from "@/components/api-card";
import type { ApiApp } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch all apps or search results based on query
  const { data: apps, isLoading, error } = useQuery<ApiApp[]>({
    queryKey: searchQuery ? ['/api/apps/search', { q: searchQuery }] : ['/api/apps'],
    enabled: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <SearchHeader 
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          searchQuery={searchQuery}
          totalCount={0}
          filteredCount={0}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="text-6xl text-destructive mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Error loading data</h3>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader 
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        searchQuery={searchQuery}
        totalCount={apps?.length || 0}
        filteredCount={apps?.length || 0}
        isLoading={isLoading}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
            <p className="text-muted-foreground text-sm">Loading API directory...</p>
          </div>
        ) : apps && apps.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="api-grid"
          >
            {apps.map((app) => (
              <ApiCard 
                key={app.id} 
                app={app} 
                searchQuery={searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="no-results">
            <div className="text-4xl text-muted-foreground mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-sm text-muted-foreground mb-6">Try adjusting your search terms or browse all available APIs</p>
            <button 
              onClick={handleClearSearch}
              className="gradient-button text-white px-6 py-3 rounded-lg text-sm font-semibold border-0"
              data-testid="button-show-all"
            >
              <i className="fas fa-list mr-2"></i>Show all APIs
            </button>
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 API Directory. Built for developers, by developers.</p>
            <p className="mt-2 text-sm">Comprehensive API database with instant search capabilities</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
