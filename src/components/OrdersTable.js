import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Phone Model", width: 100 },
  { field: "quantity", headerName: "Quantity", width: 170 },
  { field: "shipping_date", headerName: "Shipping Date", width: 170 },
];

export default function OrdersTable({customer_orders}) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(customer_orders);
  }, [customer_orders]);

  return (
    <Box sx={{ height: 400, width: 600 }}>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
