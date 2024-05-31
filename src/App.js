import React from "react";
import { ChakraProvider, ColorModeScript, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";
import LoginPage from "./pages/LoginPage";
import ActiveOrdersPage from "./pages/ActiveOrdersPage";
import CompletedOrdersPage from "./pages/CompletedOrdersPage";
import SalesOrdersPage from "./pages/SalesOrdersPage"; // New consolidated page
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return (
    <Box>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/active-orders"
          element={
            <ProtectedRoute>
              <ActiveOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed-orders"
          element={
            <ProtectedRoute>
              <CompletedOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales-orders"
          element={
            <ProtectedRoute>
              <SalesOrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
