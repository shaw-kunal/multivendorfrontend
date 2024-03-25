
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const {user} = useSelector(state=>state.user)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.value === "Delivered" ? "greenColor" : "redColor";
            },
        },
        {
            field: "orderDate",
            headerName: "Order Date",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        }
    ];

    useEffect(() => {
        // Fetch orders from your API
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Make API call to fetch orders
            const {data} = await axios.get(import.meta.env.VITE_PROXY+ `/order/orders/${user._id}`)
            // Set the fetched orders to the component state
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // Handle error, show message to the user, etc.
        }
    };

    const rows = orders.map((item) => ({
        id: item._id,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
        orderDate:new Date(item.createdAt).toLocaleString()
    }));

    console.log(orders)

    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionOnClick
            />
        </div>
    );
};

export default AllOrders;
