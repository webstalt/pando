import React, {useEffect, useState} from 'react'
import {  useParams, useHistory } from "react-router-dom";
import SelectDropdown from '../../comps/selectDropdown'
import Banner from '../../comps/banner'
import Loader from '../../assets/covalent-logo-loop_dark_v2.gif'
import Alert from '../../assets/alert.svg'
import Back from '../../assets/Back.svg'
import Table from '../../comps/table'
import TimeSeries from '../../comps/timeseriesChart'
import axios from 'axios'
import './style.css'
import { CONFIG } from '../../config'
import moment from 'moment';
import axiosRetry from 'axios-retry';
import { Icon, IconSize,} from "@blueprintjs/core";


export default function CollectionView({light, vibrant, dark}) {
  const [nft, setNft] = useState([])
  const [graphData, setGraph] = useState([])
  const [weiData, setWei] = useState([])
  const [activeLoader, setLoader] = useState(true)
  const [graphLoader, setGraphLoader] = useState(true)
  const [collectionData, setData] = useState([])
  const [graphErr, setErr] = useState(false)
  const history = useHistory();
  const currentDay =moment().format('YYYY-MM-DD')
  let { address, id } = useParams();

  let blockchain_id = id ? id : CONFIG.TEMPLATE.block_chain_id
  let address_id = address ? address : CONFIG.TEMPLATE.collection_address


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
  
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(()=>{
    handleCollection()
    //handleNft()
  },[])

  // Handle Graph data
  const handleGraph = async(filter) => {
    setGraphLoader(true)
    setErr(false)
    setGraph([])
    setWei([])
    let from = moment().subtract(filter, 'days').format('YYYY-MM-DD')

    // If filter is 0 (All time), apply different parameters
    let api_call = filter > 0 ? 
      // 2 dates (from - to)
      `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?from=${from}&to=${currentDay}` 
      : 
      // 1 date (current date - all data before it)
      `https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/?to=${currentDay}`

    // Request for floor prices and add parameters to format for graph
      try{
        const resp = await axios.get(api_call, {auth: {username: 'ckey_6bf60a7bf22d4a309dbe74f3c5c'}})

        // Organize response data to insert into graph
        setGraph(resp.data.data.items.map(i => ({x:i.opening_date, y:i.floor_price_quote_7d})).reverse())
        setWei(resp.data.data.items.map(i => ({x:i.opening_date, y:i.floor_price_wei_7d / 10 ** 18})).reverse())
        setErr(false)
      }catch(error){
          setErr(true)
      }

      setGraphLoader(false)

  }

  // Request for collection data
  const handleCollection = async() => {
    let collection = []
    try{
      const resp = await axios.get(`https://api.covalenthq.com/v1/${blockchain_id}/nft_market/collection/${address_id}/`,{auth: {username: 'ckey_6bf60a7bf22d4a309dbe74f3c5c'}})
      setData([...resp.data.data.items])
      if(CONFIG.TEMPLATE.title !== "" && !address){
        CONFIG.TEMPLATE.title = `${resp.data.data.items[0].collection_name !== "" ? resp.data.data.items[0].collection_name : CONFIG.TEMPLATE.title } Dashboard`
      }
    }catch(error){
 
    }
    
    if(CONFIG.TEMPLATE.timeseries_chart){
      // Call endpoint with 7 day parameters as default for graph
      handleGraph(7)
    }

    setLoader(false)

  }

  return (
    <>
        <>
        <Banner
          img={CONFIG.TEMPLATE.banner_picture !== "" ? CONFIG.TEMPLATE.banner_picture : null}
          head={CONFIG.TEMPLATE.title}
          subhead={'Code Template'}
          color={vibrant}
        />
        <div className="main">
          {!address ?
          <div className="global" style={{color:light ? light :'#FF4C8B'}} onClick={()=>{history.push('/global')}}>
            Global View 
             <Icon icon={'chevron-right'} size={24} intent="primary" color={light ? light : '#FF4C8B'} className='icon'/>
          </div>
          :
          <div className="back" style={{color:light ? light : '#FF4C8B'}} onClick={()=>{history.goBack()}}>
            <Icon icon={'chevron-left'} size={24} intent="primary" color={light ? light : '#FF4C8B'} className='icon'/>
            Back
          </div>
          }
          <div className="content">
            <div className="info">
              <div className="image">
                {activeLoader ? 
                <img src={Loader}></img>
                :
                  <img className="collection-img" onError={(event) => {
                  event.target.classList.add("error-image")
                  event.target.classList.remove("collection-img")
                  }} src={collectionData[0] ?.first_nft_image_256} alt="No preview available"></img>
                }
              </div>
              <div className="details">
                <div className="title-cont">
                  <h1 style={{color:light}}>Collection Address </h1>
                  <h3 onClick={()=>{
                    if(blockchain_id == 1){
                      window.open(`https://etherscan.io/address/${address_id}`, "_blank")
                    }else if(blockchain_id == 137){
                      window.open(`https://polygonscan.com/address/${address_id}`, "_blank")
                    }else{
                      window.open(`https://snowtrace.io/address/${address_id}`, "_blank")
                    }

                  }}>{address_id} <Icon icon={'share'} size={15} intent="primary" color={light ? light : '#FF4C8B'} className='share'/></h3>
                  <table className="collection-table" >
                    <tr className="title-row" style={{color:light}}>
                      <td>Ticker Symbol</td>
                      <td>24hr Volume</td>
                      <td>24hr Sold Count</td>
                    </tr>
                    <tr className ="data-row">
                      <td>{collectionData[0]?.collection_ticker_symbol ? collectionData[0]?.collection_ticker_symbol : 0}</td>
                      <td> {collectionData[0]?.volume_quote_day ? formatter.format(collectionData[0]?.volume_quote_day).split('.')[0]  : 0}</td>
                      <td>{collectionData[0]?.unique_token_ids_sold_count_day ? collectionData[0]?.unique_token_ids_sold_count_day : 0}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {CONFIG.TEMPLATE.timeseries_chart &&
            <div className="graph-cont">
              {graphLoader &&
                <div className="graph-loader">
                  <img src={Loader}></img>
                </div> 
              }
              {graphErr &&
                <div className="graph-err">
                  No data available between these dates
                </div> 
              }
              <div className="graph-header">
                <h2>Floor Price </h2>
                  <SelectDropdown
                    options={CONFIG.GRAPH_OPTIONS}
                    onChange={(e)=>{handleGraph(e.target.value)}}
                  />
              </div>
              <div className="graph">
                <TimeSeries
                  quote={graphData}
                  wei={weiData}
                />
              </div>
            </div>
          }
          <div className="bottom-section">
            <h1>NFT Preview (First 5)</h1>
            {activeLoader ? 
            <div className="collection-load">
              <img src={Loader} alt="No preview available"></img>
            </div>
            :
            <div className="collection-display">
                    <div className="nft" onClick={()=>{history.push(`/nft/${collectionData[0]?.collection_address}/${collectionData[0]?.first_nft_image_token_id}/${collectionData[0].chain_id}`)}}>
                      <img src={collectionData[0] ?.first_nft_image_256} alt="No preview available" />
                    </div>
                    <div className="nft" onClick={()=>{history.push(`/nft/${collectionData[0]?.collection_address}/${collectionData[0]?.second_nft_image_token_id}/${collectionData[0].chain_id}`)}}>
                      <img src={collectionData[0] ?.second_nft_image_256} alt="No preview available" />
                    </div>
                    <div className="nft" onClick={()=>{history.push(`/nft/${collectionData[0]?.collection_address}/${collectionData[0]?.third_nft_image_token_id}/${collectionData[0].chain_id}`)}}>
                      <img src={collectionData[0] ?.third_nft_image_256} alt="No preview available" />
                    </div>
                    <div className="nft" onClick={()=>{history.push(`/nft/${collectionData[0]?.collection_address}/${collectionData[0]?.fourth_nft_image_token_id}/${collectionData[0].chain_id}`)}}>
                      <img src={collectionData[0] ?.fourth_nft_image_256} alt="No preview available" />
                    </div>
                    <div className="nft" onClick={()=>{history.push(`/nft/${collectionData[0]?.collection_address}/${collectionData[0]?.fifth_nft_image_token_id}/${collectionData[0].chain_id}`)}}>
                      <img src={collectionData[0] ?.fifth_nft_image_256} alt="No preview available" />
                    </div>
              
            </div>
            }
          </div>
          </div>
          </>
    </>
  );
}