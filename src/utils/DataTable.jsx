import styled from '@emotion/styled';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import React from 'react'
import { Co2Sharp } from '@mui/icons-material';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}`]: {
        backgroundColor: "#fff",
        margin: 0,
        "&:hover, &.Mui-focusVisible": {
            backgroundColor: "#f3e8ff!important",
          
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        "&.even": {
            backgroundColor: "#fbfbff",
        },
    },
  
}));


const DataTable = ({ rows, columns, pageSize = 30, setSelectedId = null ,handleClose=()=>{},onRowClick=()=>{}}) => {
    return (
        <div>
            <StripedDataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                }}
               
                pageSizeOptions={[10,20,30,40,50]}
                checkboxSelection
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                autoHeight
                onRowSelectionModelChange={value => setSelectedId && setSelectedId(value)}
                onRowClick={(value) => {
                 setSelectedId && setSelectedId(value);
                    handleClose();   
                    onRowClick(value?.id);
                }}
            />
        </div>
    )
}

export default DataTable