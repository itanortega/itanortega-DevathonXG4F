import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback";
import Lobby from "../pages/Lobby";

const AppRoutes = () => {
  const Board = lazy(() => import("../pages/Board"))

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<Lobby />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
