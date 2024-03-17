import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DataTable from '../../utils/DataTable';
import Button from '../Button';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AllEvents = () => {

    const [events, setEvents] = useState('');

    const { seller } = useSelector(state => state.seller)


    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(import.meta.env.VITE_PROXY + `/event/get-all-events/${seller._id}`)
                setEvents(data.events)
            } catch (error) {
                toast.error("Not able to fetch event")
            }
        }
        fetchEvent();
    }, [])

    const handleDelete = async (id) => {

        try {

            const { data } = await axios.delete(import.meta.env.VITE_PROXY + `/event/delete-event/${id}`, { withCredentials: true })
            if (data?.success) {
                setEvents(events.filter((item) => item._id !== id))
                toast.success("Record Delete successfully")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }




    const columns = [
        { field: "id", headerName: "Item ID", width: 150 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "description", headerName: "Description", width: 200 },
        { field: "tags", headerName: "Tags", width: 150 },
        { field: "originalPrice", headerName: "Original Price", width: 150 },
        { field: "discountPrice", headerName: "Discount Price", width: 150 },
        { field: "stock", headerName: "Stock", width: 100 },
        { field: "sold_out", headerName: "Sold Out", width: 100 },
        { field: "createdAt", headerName: "Created At", width: 100 },
        { field: "startDate", headerName: "Start At", width: 100 },
        { field: "endDate", headerName: "End At", width: 100 },
        {
            field: "Preview",
            width: 80,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex gap-2'>
                        <Link to={`/events/${params.id}`}>
                            <button>
                                <AiOutlineEye size={25} fill='green' fontWeight={600} />
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} color='red' fontWeight={600} />
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    events &&
        events.forEach((item) => {
            rows.push({
                id: item._id,
                name: item?.name,
                description: item?.description,
                tags: item?.tags,
                originalPrice: item.originalPrice,
                discountPrice: item.discountPrice,
                stock: item.stock,
                sold_out: item.sold_out,
                startDate: item.startDate.slice(0,10),
                endDate: item.endDate.slice(0,10),
                createdAt: new Date(item.createdAt).toLocaleString(), // Format createdAt to a readable form
            });
        });



    return (
        <div className='m-5 w-full'>
            <DataTable rows={rows} columns={columns} />
        </div>
    )
}

export default AllEvents