import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './App.css';
import DashBoard from './pages/dashboard';
import LogIn from './pages/login';
function App() {
    const [isSignedIn, setIsSignedIn] = useState(true);
    return (_jsx(_Fragment, { children: _jsx("main", { children: isSignedIn ? (_jsx(DashBoard, {})) : (_jsx(LogIn, {})) }) }));
}
export default App;
