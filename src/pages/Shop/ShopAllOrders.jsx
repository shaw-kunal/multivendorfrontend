import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShopAllOrders = () => {
    const { seller } = useSelector((state) => state.seller);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_PROXY + `/order/${seller._id}/orders`);
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error("something went wrong")
            }
        };

        fetchOrders();
    }, [seller._id]);



    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            renderCell: (params) => {
                const status = params.row.status;
                return status === "Delivered"
                    ? <span style={{ color: "green" }}>Delivered</span>
                    : <span style={{ color: "red" }}>Not Delivered</span>;
            },
        },        
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/dashboard/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    orders &&
        orders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });


    return (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}

export default ShopAllOrders
