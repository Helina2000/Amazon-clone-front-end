import React, { useEffect, useState } from 'react'
import classes from './results.module.css'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/EndPoints'
import ProductCard from '../../components/Product/ProductCard'
import Loader from '../../components/Loader/Loader'

const Results = () => {
  const [results,setResults]=useState([])
  const { categoryName } = useParams()
  console.log(categoryName)
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      setResults(res.data)
      console.log(res.data)
      setIsLoading(false)
  })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  },[])

  
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results
