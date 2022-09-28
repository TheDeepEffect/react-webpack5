import React, { Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './style.scss';

const SubTitle = React.lazy(() => import("./SubTitle"));

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container);

root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <App />
        <SubTitle />
    </Suspense>
);
module.hot.accept();