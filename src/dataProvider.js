// src/dataProvider.js
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const jsonServerUrl = 'https://jsonplaceholder.typicode.com';
const httpClient = fetchUtils.fetchJson;

const jsonServerDataProvider = jsonServerProvider(jsonServerUrl, httpClient);

const customDataProvider = {
  ...jsonServerDataProvider,
  getList: (resource, params) => {
    if (resource === 'financials') {
      // Return custom financial data here
      return Promise.resolve({
        data: [
          { id: 1, month: 'January', revenue: 12000, expenses: 8000, profit: 4000 },
          { id: 2, month: 'February', revenue: 15000, expenses: 9000, profit: 6000 },
          { id: 3, month: 'March', revenue: 14000, expenses: 8500, profit: 5500 },
          { id: 4, month: 'April', revenue: 16000, expenses: 9500, profit: 6500 },
          { id: 5, month: 'May', revenue: 15500, expenses: 9200, profit: 6300 },
          { id: 6, month: 'June', revenue: 17000, expenses: 9800, profit: 7200 },
        ],
        total: 6,
      });
    }

    if (resource === 'metrics') {
      // Return custom metrics data here
      return Promise.resolve({
        data: [
          { id: 1, metricName: 'MRR', value: 12000 },
          { id: 2, metricName: 'ARPU', value: 10.00 },
          { id: 3, metricName: 'Active Users', value: 850 },
        ],
        total: 3,
      });
    }

    return jsonServerDataProvider.getList(resource, params);
  },
};

export default customDataProvider;
