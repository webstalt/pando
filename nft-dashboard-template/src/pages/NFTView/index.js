import React, {useEffect, useState} from 'react'
import {  useParams, useHistory } from "react-router-dom";
import SelectDropdown from '../../comps/selectDropdown'
import Banner from '../../comps/banner'
import NftDetails from '../../comps/nftDetails'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Table from '../../comps/table'
import Back from '../../assets/Back.svg'
import axios from 'axios'
import axiosRetry from 'axios-retry';
import './style.css'
import { CONFIG } from '../../config'
import { Icon, IconSize,} from "@blueprintjs/core";



export default function NFTView({light, dark, vibrant}) {
  let { address, id, chainId } = useParams();
  const [nft, setNft] = useState({})
  const [activeLoader, setLoader] = useState(true)
  const history = useHistory()

  axiosRetry(axios, {
      retries: 3, 
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; 
      },
      retryCondition: (error) => {
        return error.response.status === 503;
      },
  });

  useEffect(()=>{
    handleNft()
  },[])

  // Request for nft metadata 
  const handleNft = async() => {
    const resp = await axios.get(`https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON`, {auth: {username: 'ckey_6bf60a7bf22d4a309dbe74f3c5c'}})
    setNft(resp.data.data.items[0].nft_data !== null ? resp.data.data.items[0].nft_data[0] : {external_data : {image: ""}})
    setLoader(false)
  }

  return (
    <>
      {activeLoader ? 
        <div className="load">
          <img  src={Loader}></img>
        </div> 
      :
      <>
        <Banner
          img={CONFIG.TEMPLATE.banner_picture !== "" ? CONFIG.TEMPLATE.banner_picture : null}
          head={CONFIG.TEMPLATE.title}
          subhead={'Code Template'}
          color={vibrant}
        />
        <div className="main">
          <div className="back" style={{color:light ? light : '#FF4C8B'}} onClick={()=>{history.goBack()}}>
            <Icon icon={'chevron-left'} size={24} intent="primary" color={light ? light : '#FF4C8B'} className='icon'/>
            Back
          </div>
          <NftDetails
            data={nft}
            color={dark}
          />
        </div>
      </>
      }
    </>
  )
}