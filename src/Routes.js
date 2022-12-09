import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import VideoPlayer from "./components/VideoPage";
import HighLight from "./components/HighLight";

const RoutesPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<HighLight />} /> */}
            {/* <Route path="/video-player" element={<VideoPlayer />} /> */}
        </Routes>
    )
}

export default RoutesPage;