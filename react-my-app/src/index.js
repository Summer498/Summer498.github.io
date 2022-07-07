import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const range = (b, n, s = 1) => [...Array(n)].map((_, i) => b + i * s);
const order = (n) => [...Array(n)].map((_, i) => i);

const Hoge = () =>
	<div>
		{range(0, 3, 3).map(e =>
			<div>
				{range(e, 3).map(e => <li>item{e}</li>)}
			</div>
		)}
	</div>

const Rects = ()=>
	<svg>
		{range(0, 3).map(i =>
			<g>
				{range(0, 3).map(j => <rect x={String(j*100)} y={String(i*100)} width="80" height="80" />)}
			</g>
		)}
	</svg>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		<Hoge />
		<Rects />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
