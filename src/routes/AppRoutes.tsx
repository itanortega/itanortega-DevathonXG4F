import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback";

const AppRoutes = () => {
  const Lobby = lazy(() => import("../pages/Lobby"))
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
