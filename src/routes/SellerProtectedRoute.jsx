import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loader from "../components/Layout/Loader"

const SellerProtectedRoute = ({ children }) => {
    const { isSeller, loading } = useSelector(state => state.seller)

    return  loading ? <Loader/> :(!isSeller ?<Navigate to="/shop-login" replace />: children   )
  }
export default SellerProtectedRoute