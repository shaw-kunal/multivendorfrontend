import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const SellerProtectedRoute = ({children})=>{
    const {isSeller,loading} = useSelector(state=>state.seller)
    if( !loading && !isSeller){
        return <Navigate to="/shop-login" replace /> 
    }
    return children
}
export default SellerProtectedRoute