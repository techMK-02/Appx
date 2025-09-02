import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiApp } from "@shared/schema";

export function useApiSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allApps, isLoading, error } = useQuery<ApiApp[]>({
    queryKey: ['/api/apps'],
  });

  const filteredApps = useMemo(() => {
    if (!allApps) return [];
    if (!searchQuery.trim()) return allApps;

    const query = searchQuery.toLowerCase();
    return allApps.filter(app => 
      app.name.toLowerCase().includes(query)
    );
  }, [allApps, searchQuery]);

  return {
    apps: filteredApps,
    allApps: allApps || [],
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
  };
}
