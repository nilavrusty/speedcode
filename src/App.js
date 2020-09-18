import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import contentJson from './menu.json'
import { IsItemAvailable } from './utility/index'

import SearchInput from './components/SearchInput'
import Button from './components/Button'

function App() {

  const [menu, setMenu] = useState(contentJson.menuDetails);
  const [search, setSearch] = useState('');
  const [leftMenu, setLeftMenu] = useState(Object.keys(contentJson.menuDetails)[0])
  const [content, setContent] = useState(contentJson.menuDetails[Object.keys(contentJson.menuDetails)[0]])
  const [backUpConetnt, setbackUpContent] = useState(contentJson.menuDetails[Object.keys(contentJson.menuDetails)[0]]);


  const clickRes = (e) => {

    setLeftMenu(e.target.innerText)
    setContent(menu[e.target.innerText])
    setbackUpContent(menu[e.target.innerText])
    setSearch('');
  }

  const onSearch = (val) => {
    setSearch(val)
    if (val.trim().length) {
      setContent([...content.filter(v => v.foodname.toLowerCase().includes(val.toLowerCase()))])
    }
    else {
      setContent([...backUpConetnt]);
    }

  }

  const toggleOfs = (e) => {
    let id = e.target.classList[1];
    let x = content.map(v => {
      if (Object.is(v.foodid, id)) {
        return {
          ...v,
          ofs: !v.ofs
        }
      }
      return { ...v }
    })
    setContent([...x])
    setbackUpContent([...x])
  }

  const allChange = (val) => {
    let x = content.map(v => {

      return {
        ...v,
        ofs: val
      }


    })
    setContent([...x])
    setbackUpContent([...x])
  }


  const validation = (v) => {
    let time = v.servingtime.split('-');
    // if (!Object.is(time[0], '0:0') || !Object.is(time[1], '23:59')) {
    return !IsItemAvailable(v.servingtime) || v.ofs;     /* time true : available  and ofs true : not available  */
    // }
    // return v.ofs
  }

  return (
    <div className="App">
      <header>
        <SearchInput value={search} change={onSearch} />
      </header>
      <div className="main">
        <div className="aside">
          {Object.keys(menu).map(v => <div onClick={clickRes} className='eachRes'>{v}</div>)}
        </div>
        <div className="content">
          {content.map(v =>
            <span onClick={toggleOfs} className={`eachfood ${v.foodid} ${validation(v) ? ' invalid' : ' valid'}`}>
              {v.foodname}
            </span>
          )}
        </div>
      </div>
      <footer>
        <Button click={() => allChange(true)} text='All Unavailable' />
        <Button click={() => allChange(false)} text='All Available' />
      </footer>
    </div>
  );
}

export default App;
