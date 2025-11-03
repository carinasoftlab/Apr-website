import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/apiClient";
import { getFromCache, setToCache, buildCacheKey } from "@/lib/cache";

// Cache TTL for different data types
const CACHE_TTL = {
  HOME_PAGES: 5 * 60 * 1000, // 5 minutes
  SCHEMES: 10 * 60 * 1000,   // 10 minutes
  LINKS: 15 * 60 * 1000,     // 15 minutes
};

// Helper function for cached API calls
const fetchWithCache = async (endpoint, cacheKey, ttl) => {
  // Check cache first
  const cached = getFromCache(cacheKey);
  if (cached.hit && !cached.stale) {
    return cached.data;
  }

  // Fetch from API
  const response = await apiClient.get(endpoint);
  const data = response.data;
  
  // Cache the result
  setToCache(cacheKey, data, ttl);
  
  return data;
};

// Async thunk for fetching home page data
export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = buildCacheKey(apiClient.defaults.baseURL, "/getAllHomePages");
      const data = await fetchWithCache("/getAllHomePages", cacheKey, CACHE_TTL.HOME_PAGES);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load home data");
    }
  }
);

// Async thunk for fetching schemes
export const fetchSchemes = createAsyncThunk(
  "home/fetchSchemes",
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = buildCacheKey(apiClient.defaults.baseURL, "/getAllSchemePages");
      const data = await fetchWithCache("/getAllSchemePages", cacheKey, CACHE_TTL.SCHEMES);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load schemes");
    }
  }
);

// Async thunk for fetching important links
export const fetchImportantLinks = createAsyncThunk(
  "home/fetchImportantLinks",
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = buildCacheKey(apiClient.defaults.baseURL, "/importantLinks");
      const data = await fetchWithCache("/importantLinks", cacheKey, CACHE_TTL.LINKS);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load important links");
    }
  }
);

// Async thunk for fetching about page data
export const fetchAboutData = createAsyncThunk(
  "home/fetchAboutData",
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = buildCacheKey(apiClient.defaults.baseURL, "/getAllAboutPages");
      const data = await fetchWithCache("/getAllAboutPages", cacheKey, CACHE_TTL.HOME_PAGES);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load about data");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeData: {
      data: null,
      loading: false,
      error: null,
    },
    schemes: {
      data: null,
      loading: false,
      error: null,
    },
    importantLinks: {
      data: null,
      loading: false,
      error: null,
    },
    aboutData: {
      data: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    clearErrors: (state) => {
      state.homeData.error = null;
      state.schemes.error = null;
      state.importantLinks.error = null;
      state.aboutData.error = null;
    },
    clearCache: (state) => {
      // This would need to be implemented in the cache utility
      // For now, we'll just reset the state
      state.homeData.data = null;
      state.schemes.data = null;
      state.importantLinks.data = null;
      state.aboutData.data = null;
    },
  },
  extraReducers: (builder) => {
    // Home data reducers
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.homeData.loading = true;
        state.homeData.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.homeData.loading = false;
        state.homeData.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.homeData.loading = false;
        state.homeData.error = action.payload;
      })
      // Schemes reducers
      .addCase(fetchSchemes.pending, (state) => {
        state.schemes.loading = true;
        state.schemes.error = null;
      })
      .addCase(fetchSchemes.fulfilled, (state, action) => {
        state.schemes.loading = false;
        state.schemes.data = action.payload;
      })
      .addCase(fetchSchemes.rejected, (state, action) => {
        state.schemes.loading = false;
        state.schemes.error = action.payload;
      })
      // Important links reducers
      .addCase(fetchImportantLinks.pending, (state) => {
        state.importantLinks.loading = true;
        state.importantLinks.error = null;
      })
      .addCase(fetchImportantLinks.fulfilled, (state, action) => {
        state.importantLinks.loading = false;
        state.importantLinks.data = action.payload;
      })
      .addCase(fetchImportantLinks.rejected, (state, action) => {
        state.importantLinks.loading = false;
        state.importantLinks.error = action.payload;
      })
      // About data reducers
      .addCase(fetchAboutData.pending, (state) => {
        state.aboutData.loading = true;
        state.aboutData.error = null;
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.aboutData.loading = false;
        state.aboutData.data = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.aboutData.loading = false;
        state.aboutData.error = action.payload;
      });
  },
});

export const { clearErrors, clearCache } = homeSlice.actions;
export default homeSlice.reducer;
