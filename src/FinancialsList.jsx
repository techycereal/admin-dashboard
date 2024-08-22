// src/FinancialsList.jsx
import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

const FinancialsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="month" label="Month" />
      <NumberField source="revenue" label="Revenue" />
      <NumberField source="expenses" label="Expenses" />
      <NumberField source="profit" label="Profit" />
    </Datagrid>
  </List>
);

export default FinancialsList;
