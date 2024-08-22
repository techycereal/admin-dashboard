// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import customDataProvider from './dataProvider'; // Ensure this is correctly imported

// Mock data fetching function
const fetchData = async (resource) => {
  try {
    const response = await customDataProvider.getList(resource, {});
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${resource} data`, error);
    return [];
  }
};

function KPIIndicator({ metric, target, current }) {
  const isOnTrack = current >= target;
  return (
    <div style={{ marginBottom: 20 }}>
      <Typography variant="h6">{metric}</Typography>
      <Typography variant="h4">{current}</Typography>
      {isOnTrack ? <ThumbUp color="success" /> : <ThumbDown color="error" />}
    </div>
  );
}

function Dashboard() {
  const [financialData, setFinancialData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const financials = await fetchData('financials');
      const metrics = await fetchData('metrics');
      setFinancialData(financials);
      setMetricsData(metrics);
    };

    fetchDataAsync();
  }, []);

  // Limited number of users
  const totalUsers = 10;
  
  // Calculate total values from financialData
  const totalRevenue = financialData.reduce((acc, { revenue }) => acc + revenue, 0);
  const totalExpenses = financialData.reduce((acc, { expenses }) => acc + expenses, 0);
  const totalProfit = financialData.reduce((acc, { profit }) => acc + profit, 0);

  // Fetch metrics or use placeholders if necessary
  const arpu = metricsData.find(metric => metric.metricName === 'ARPU')?.value || 0;
  const mrr = metricsData.find(metric => metric.metricName === 'MRR')?.value || 0;

  // Update metric values
  const metrics = {
    totalUsers,
    activeUsers: totalUsers,
    revenue: `$${totalRevenue.toLocaleString()}`,
    newUsers: totalUsers,
    churnRate: '0%', // Placeholder as example
    customerSatisfaction: '89%', // Example value
    mrr: `$${mrr.toLocaleString()}`,
    arpu: `$${arpu.toFixed(2)}`,
    totalSales: `$${totalRevenue.toLocaleString()}`, // Placeholder for totalSales
    averageOrderValue: '$150', // Example value
    conversionRate: '4.2%', // Example value
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {/* Cards */}
      {Object.entries(metrics).map(([key, value]) => (
        <Card key={key} style={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Typography>
            <Typography variant="h4">{value}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Line Chart for MRR */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Monthly Recurring Revenue (MRR) Over Time</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart for Sales */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Sales Data Over Time</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}> {/* Placeholder for actual sales data */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Area Chart for Customer Growth */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Customer Growth and Churn</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financialData}> {/* Placeholder for actual customer data */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="expenses" stroke="#ff7300" fill="#ff7300" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table for Revenue and Expenses Breakdown */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Financial Breakdown</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Month</Typography></TableCell>
                <TableCell><Typography variant="h6">Revenue</Typography></TableCell>
                <TableCell><Typography variant="h6">Expenses</Typography></TableCell>
                <TableCell><Typography variant="h6">Profit</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financialData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>${row.revenue.toLocaleString()}</TableCell>
                  <TableCell>${row.expenses.toLocaleString()}</TableCell>
                  <TableCell>${row.profit.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Progress Bar for Revenue Target */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Revenue Target Progress</Typography>
          <Box>
            <Typography variant="h6">Current Revenue</Typography>
            <LinearProgress variant="determinate" value={(totalRevenue / 15000) * 100} />
            <Typography variant="body2">${totalRevenue.toLocaleString()} / $15,000</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* KPI Indicators */}
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="MRR Target" target={15000} current={mrr} />
        </CardContent>
      </Card>
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="Sales Target" target={35000} current={totalRevenue} /> {/* Placeholder */}
        </CardContent>
      </Card>
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="Customer Satisfaction" target={90} current={91} /> {/* Placeholder */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
