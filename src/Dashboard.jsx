// src/Dashboard.js
import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

// Sample data
const financialData = [
  { month: 'January', revenue: 12000, expenses: 8000, profit: 4000 },
  { month: 'February', revenue: 15000, expenses: 9000, profit: 6000 },
  { month: 'March', revenue: 14000, expenses: 8500, profit: 5500 },
  { month: 'April', revenue: 16000, expenses: 9500, profit: 6500 },
  { month: 'May', revenue: 15500, expenses: 9200, profit: 6300 },
  { month: 'June', revenue: 17000, expenses: 9800, profit: 7200 },
];

const revenueData = [
  { month: 'January', revenue: '$12,000' },
  { month: 'February', revenue: '$15,000' },
  { month: 'March', revenue: '$14,000' },
  { month: 'April', revenue: '$16,000' },
  { month: 'May', revenue: '$15,500' },
  { month: 'June', revenue: '$17,000' },
];

const salesData = [
  { month: 'Jan', sales: 2000 },
  { month: 'Feb', sales: 2500 },
  { month: 'Mar', sales: 2200 },
  { month: 'Apr', sales: 2700 },
  { month: 'May', sales: 2600 },
  { month: 'Jun', sales: 2900 },
];

const customerData = [
  { month: 'Jan', newCustomers: 100, churned: 5 },
  { month: 'Feb', newCustomers: 120, churned: 8 },
  { month: 'Mar', newCustomers: 110, churned: 6 },
  { month: 'Apr', newCustomers: 130, churned: 7 },
  { month: 'May', newCustomers: 140, churned: 9 },
  { month: 'Jun', newCustomers: 150, churned: 10 },
];

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
  const metrics = {
    totalUsers: 1200,
    activeUsers: 850,
    revenue: "$45,000",
    newUsers: 120,
    churnRate: "2.5%",
    customerSatisfaction: "89%",
    mrr: "$12,000",
    arpu: "$10.00",
    totalSales: "$30,000",
    averageOrderValue: "$150",
    conversionRate: "4.2%",
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
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Area Chart for Customer Growth */}
      <Card style={{ width: 600 }}>
        <CardContent>
          <Typography variant="h5">Customer Growth and Churn</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="newCustomers" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="churned" stroke="#ff7300" fill="#ff7300" />
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
              {financialData.map((row, index) => (
                <TableRow key={index}>
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
            <LinearProgress variant="determinate" value={(12000 / 15000) * 100} />
            <Typography variant="body2">$12,000 / $15,000</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* KPI Indicators */}
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="MRR Target" target={15000} current={12000} />
        </CardContent>
      </Card>
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="Sales Target" target={35000} current={30000} />
        </CardContent>
      </Card>
      <Card style={{ width: 300 }}>
        <CardContent>
          <KPIIndicator metric="Customer Satisfaction" target={90} current={91} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
