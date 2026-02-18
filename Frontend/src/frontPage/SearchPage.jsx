import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import CardLoading from './cardLoading'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import CardProduct from '../components/cardProduct'
import { useLocation } from 'react-router-dom'

function SearchPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] =useState(false)
  const loadingCardArray = new Array(12).fill(null)
  const [page , setpage] = useState (1)
  const [totalPage,SetTotalPage] = useState(1)
  const params = useLocation()
  const search = params?.search?.slice(3)
  

  const getSearchProduct = async()=>{
    try {
      setLoading(true)
      const res= await Axios({
        ...SummaryApi.getSeachProduct,
        data : {
          search : search,
          page : page
        }
      })
      const {data : resData} = res
      if(resData.success){
        if(resData.page == 1){
          setData(resData.data)
        }else{
          setData((prev)=>{
            return[
              ...prev, ...resData.data
            ]
          })
        }
        SetTotalPage(resData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getSearchProduct()
  },[page,search])
  const handleGetMore=()=>{
    if (totalPage > page) {
      setpage(prev => prev + 1)
    }
  }
  return (
    <section className=''>
        <div className='container mx-auto p-4'>
              <p className='font-semibold'> Search Results : {data.length} </p>
                <InfiniteScroll 
                dataLength={data.length}
                hasMore={true}
                next={handleGetMore}
                >
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mt-4' >
                

                {
                  data.map((p,index)=>{
                    return(
                      <CardProduct
                      data={p}
                      key={p._id + index}
                      />
                    )
                  })
                }
                
                {
                  loading && (
                    loadingCardArray.map((_,index)=>{
                      return(
                        <CardLoading
                        key={index+'hi'}
                        
                        />
                      )
                    })
                  )
                }
            </div>
                </InfiniteScroll>
        </div>
    </section>
  )
}

export default SearchPage
