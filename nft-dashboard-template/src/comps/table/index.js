import React, {useEffect, useState, useRef} from 'react'
import './style.css'
import { Icon} from "@blueprintjs/core";
import { CONFIG } from '../../config'


const Table = ({data, onClick, color, load}) => {
  const [sortConfig, setConfig] = useState({key: '', direction: ''})
  const [sortedData, setSorted] = useState(null)
  const tableRef = useRef()


  useEffect(()=>{
    if(tableRef.current !== undefined){
      tableRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  })

  useEffect(()=>{
    setSorted(sortData())
  },[sortConfig])

  const sortData = () => {
    let sorted = [...data]
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sorted
  }

  const requestSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setConfig({ key, direction });
}

  var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  });

  return (
    <table className="table">
      <tr className="title-row">

        <th className="collection-name">
          <div className="tableHeader-collection"> 
            Picture 
            <Icon icon={sortConfig.key === 'collection_name' && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'collection_name' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('collection_name')}}/>
          </div>
        </th>
    
        <th className="collection-name">
          <div className="tableHeader-collection"> 
            Collection 
            <Icon icon={sortConfig.key === 'collection_name' && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'collection_name' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('collection_name')}}/>
          </div>
        </th>

        <th className="align-right">
          <div className="tableHeader">
            Market Cap
            <Icon icon={sortConfig.key === 'market_cap_quote'  && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'market_cap_quote' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('market_cap_quote')}}/>
          </div>
        </th>
        
        <th className="align-right">
          <div className="tableHeader">
            24hr Volume 
            <Icon icon={sortConfig.key === 'volume_quote_24h' && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'volume_quote_24h' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('volume_quote_24h')}}/> 
          </div>
        </th>

        <th className="align-right">
          <div className="tableHeader">
            24hr Avg Price  
            <Icon icon={sortConfig.key === 'avg_volume_quote_24h' && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'avg_volume_quote_24h' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" }size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('avg_volume_quote_24h')}}/>
          </div>
       </th>
        
        <th className="align-right">
          <div className="tableHeader">
            # Transaction  
            <Icon icon={sortConfig.key === 'transaction_count_alltime'  && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'transaction_count_alltime' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('transaction_count_alltime')}}/>
          </div>
        </th>

        <th className="align-right">
          <div className="tableHeader">
            # Wallets  
            <Icon icon={sortConfig.key === 'unique_wallet_purchase_count_alltime'  && sortConfig.direction === 'descending' ?  "chevron-down" : sortConfig.key === 'unique_wallet_purchase_count_alltime' && sortConfig.direction === 'ascending' ?  "chevron-up" : "expand-all" } size={16} intent="primary" color="#FF4C8B" className='icon' onClick={()=>{requestSort('unique_wallet_purchase_count_alltime')}}/>
          </div>
        </th>
      </tr>
      {sortedData && sortedData.map((o,i)=>{
        if(o.collection_name == ""){
          console.log()
        }
        
        return (
          <>
          {o.collection_address === CONFIG.TEMPLATE.collection_address ? 
           <tr key={i} ref={tableRef} className="active" style={{backgroundColor:color}} onClick={()=>{onClick(o.collection_address)}}>
            <td className="thumbnail-image"> <img src={o.first_nft_image_256 ? o.first_nft_image_256 : "https://media-exp1.licdn.com/dms/image/C560BAQHZftuIJc5OMQ/company-logo_200_200/0/1616601285421?e=2147483647&v=beta&t=j6DJiJFHvVEFGFKU6rki6dFXYO4m3c43X0jKwe6H7_A"} style={{height:50,width:50}} alt="No preview available"/></td>
            <td className="collection-name" style={{fontWeight:"600"}}>{o.collection_name !== "" ? o.collection_name : o.collection_address}</td>
            <td className="table-data-active">{o.market_cap_quote ? formatter.format(o.market_cap_quote).split('.')[0] : 0}</td>
            <td className="table-data-active">{o.volume_quote_24h ? formatter.format(o.volume_quote_24h).split('.')[0] : 0}</td>
            <td className="table-data-active">{o.avg_volume_quote_24h ? formatter.format(o.avg_volume_quote_24h).split('.')[0] : 0}</td>
            <td className="table-data-active">{o.transaction_count_alltime ? o.transaction_count_alltime.toLocaleString() : 0}</td>
            <td className="table-data-active">{o.unique_wallet_purchase_count_alltime ? o.unique_wallet_purchase_count_alltime.toLocaleString() : 0}</td>
          </tr>
           :
          <tr key={i} className="data-row" onClick={()=>{onClick(o.collection_address)}}>
            <td className="thumbnail-image"> <img src={o.first_nft_image_256 ? o.first_nft_image_256 : "https://media-exp1.licdn.com/dms/image/C560BAQHZftuIJc5OMQ/company-logo_200_200/0/1616601285421?e=2147483647&v=beta&t=j6DJiJFHvVEFGFKU6rki6dFXYO4m3c43X0jKwe6H7_A"} style={{height:50,width:50}} alt="No preview available"/></td>
            <td className="collection-name" style={{fontWeight:"600"}}>{o.collection_name !== "" ? o.collection_name : o.collection_address}</td>
            <td className="table-data">{o.market_cap_quote ? formatter.format(o.market_cap_quote).split('.')[0] : 0}</td>
            <td className="table-data">{o.volume_quote_24h ? formatter.format(o.volume_quote_24h).split('.')[0] : 0}</td>
            <td className="table-data">{o.avg_volume_quote_24h ? formatter.format(o.avg_volume_quote_24h).split('.')[0] : 0}</td>
            <td className="table-data">{o.transaction_count_alltime ? o.transaction_count_alltime.toLocaleString() : 0}</td>
            <td className="table-data">{o.unique_wallet_purchase_count_alltime ? o.unique_wallet_purchase_count_alltime.toLocaleString() : 0}</td>
          </tr>
          }
          </>
        )
      })}
    </table>
  )
}


export default Table;