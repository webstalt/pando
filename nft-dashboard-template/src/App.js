import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom'
import Global from './pages/GlobalView'
import CollectionView from './pages/CollectionView'
import NFTView from './pages/NFTView'
import Logo from './assets/logo.svg'
import * as Vibrant from 'node-vibrant'
import img from './assets/banner.png'
import React, {useEffect, useState} from 'react'
import { CONFIG } from './config'

function App() {

  useEffect(()=>{
    if(CONFIG.TEMPLATE.banner_picture !== ""){
      getColor()
    }
  },[])

  const [bg, setBg] = useState("")
  const [vibrant, setVibrant] = useState("")
  const [light, setLight] = useState("")
  const [dark, setDark] = useState("")

  const getColor = async() => {
    const palette = await Vibrant.from(CONFIG.TEMPLATE.banner_picture).getPalette()
    console.log(palette)
    setBg(palette.DarkMuted.getHex())
    setLight(palette.LightVibrant.getHex())
    setVibrant(palette.Vibrant.getHex())
    setDark(palette.DarkVibrant.getHex())
    return palette
  }


  return (
    <div className="App" style={{backgroundColor:`${bg}`}}>
    <Router>
      <HashRouter basename="/">
        <Switch>
          <Route path="/nft/:address/:id/:chainId" render={(props) => (
            <NFTView {...props} light={light} vibrant={vibrant} dark={bg}/>
          )} /> 
          <Route path="/collection/:address/:id" render={(props) => (
            <CollectionView {...props} light={light} vibrant={vibrant} dark={dark}/>
          )} /> 
          <Route path="/global" render={(props) => (
            <Global {...props} light={light} vibrant={vibrant} dark={dark}/>
          )} /> 
          <Route path="/" render={(props) => (
            <CollectionView {...props} light={light} vibrant={vibrant} dark={dark}/>
          )} /> 
        </Switch>
      </HashRouter>
    </Router>
    <div className="logo">
      <img src={Logo}></img>
    </div>
    </div>
  );
}

export default App;
