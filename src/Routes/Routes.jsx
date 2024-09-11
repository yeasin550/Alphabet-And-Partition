

import {
    createBrowserRouter,
} from "react-router-dom";
// import "./index.css";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AlphabetTileInteraction from "../components/AlphabetTileInteraction/AlphabetTileInteraction";
import LayoutBuilder from "../components/LayoutBuilder";
// import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/alphabet",
                element: <AlphabetTileInteraction />
            },
            {
                path: "/recursive",
                element: < LayoutBuilder />
            },


        ]
    },
]);
export default router;



