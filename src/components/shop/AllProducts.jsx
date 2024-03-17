import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductShop, resetProductState } from '../../redux/actions/product'
import DataTable from '../../utils/DataTable'
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const { product, isLoading } = useSelector(state => state.product)
  const { seller } = useSelector(state => state.seller);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductShop(seller._id))
  }, [dispatch]);


  // useEffect(() => {
  //   return () => {
  //     dispatch(resetProductState())
  //   }
  // }, [])

  const handleDelete = (id) => {
    try {
      dispatch(deleteProduct(id))
    } catch (error) {
      console.log(error)
    }
    finally {
      dispatch(resetProductState());
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
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} color='red' />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        name: item?.name,
        description: item?.description,
        tags: item?.tags,
        originalPrice: item.originalPrice,
        discountPrice: item.discountPrice,
        stock: item.stock,
        sold_out: item.sold_out,
        createdAt: new Date(item.createdAt).toLocaleString(), // Format createdAt to a readable form
      });
    });

  return (
    <div className='w-full mx-8 mt-10 bg-white'>
      <DataTable rows={rows} columns={columns} />
    </div>
  )
}

export default AllProducts