import { BrowserRouter, Route, Routes } from "react-router-dom"
import DAshboard from "../Layout/DAshboard"

export default function Approute() {



    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<DAshboard />} />
                <Route path="DAshboard/*" element={<DAshboard />} />
            </Routes>
        </BrowserRouter>
    </>
}