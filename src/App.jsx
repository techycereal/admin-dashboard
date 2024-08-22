// src/App.jsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from './Dashboard';
import customDataProvider from './dataProvider';
import FinancialsList from './FinancialsList';
import MetricsList from './MetricsList';
import { ListGuesser } from 'react-admin';

function App() {
  return (
    <Admin dashboard={Dashboard} dataProvider={customDataProvider}>
      {/* Existing Resources */}
      <Resource name="users" list={ListGuesser} />
      <Resource name="posts" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />

      {/* Additional Resources */}
      <Resource name="financials" list={FinancialsList} />
      <Resource name="metrics" list={MetricsList} />
    </Admin>
  );
}

export default App;
