import React from 'react';
import { createRoot } from 'react-dom/client';
import AbcHeader from './AbcHeader';
import NavAndMainPane from './NavAndMainPane';

const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <AbcHeader />
	<NavAndMainPane />
  </div>
);