import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import axios from 'axios';

const SuggestedProduct = ({ data }) => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_PROXY + `/product/?category=${data.category}`);
                setProduct(res.data.products);
            } catch (error) {
             console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {data ? <div className={`p-4 ${styles.section}`}>
                <h2 className={`${styles.heading}`}>Related Product</h2>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-7 mb-12'>

                    {
                        product.map((product) => <ProductCard data={product} key={product.id} />)
                    }
                </div>

            </div> : null}
        </div>
    )
}

export default SuggestedProduct