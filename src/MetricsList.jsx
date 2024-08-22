// src/MetricsList.jsx
import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

const MetricsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="metricName" label="Metric Name" />
      <NumberField source="value" label="Value" />
    </Datagrid>
  </List>
);

export default MetricsList;
