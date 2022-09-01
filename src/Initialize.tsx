import { BrowserRouter, Route, Routes } from "react-router-dom";

import PackagesView from "./views/packages/packages";
import CardsView from "./views/cards/cards";
import { ROUTES } from "./constants/routes";

function Initialize() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`${ROUTES.cards}/:id`} element={<CardsView />} />

          <Route path={ROUTES.packages} element={<PackagesView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Initialize;
