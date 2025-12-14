"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useProjectStore } from "@/stores/project-store";
import { useMediaStore } from "@/stores/media-store";
import { storageService } from "@/lib/storage/storage-service";
import { toast } from "sonner";

interface StorageContextType {
  isInitialized: boolean;
  isLoading: boolean;
  hasSupport: boolean;
  error: string | null;
}

const StorageContext = createContext<StorageContextType | null>(null);

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within StorageProvider");
  }
  return context;
}

interface StorageProviderProps {
  children: React.ReactNode;
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [status, setStatus] = useState<StorageContextType>({
    isInitialized: false,
    isLoading: true,
    hasSupport: false,
    error: null,
  });

  const loadAllProjects = useProjectStore((state) => state.loadAllProjects);

  useEffect(() => {
    const initializeStorage = async () => {
      setStatus((prev) => ({ ...prev, isLoading: true }));

      try {
        // Check browser support
        const hasSupport = storageService.isFullySupported();

        if (!hasSupport) {
          toast.warning(
            "存储不完全支持。某些功能可能无法工作。"
          );
        }

        // Load saved projects (media will be loaded when a project is loaded)
        await loadAllProjects();

        setStatus({
          isInitialized: true,
          isLoading: false,
          hasSupport,
          error: null,
        });
      } catch (error) {
        console.error("Failed to initialize storage:", error);
        setStatus({
          isInitialized: false,
          isLoading: false,
          hasSupport: storageService.isFullySupported(),
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    };

    initializeStorage();
  }, [loadAllProjects]);

  return (
    <StorageContext.Provider value={status}>{children}</StorageContext.Provider>
  );
}
