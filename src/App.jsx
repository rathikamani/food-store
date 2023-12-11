
import { useMemo, useState } from 'react'
import './App.css'
import { useCallback, useEffect,useRef } from 'react';
import axios from "axios";

function App() {

  
  const [search, setSearch] = useState();
  const [results, setResults] = useState();
  const [randomValue, setrandomValue] = useState();
  const timer = useRef();
  const execute = useRef(true);

  let handleChange = useCallback((e) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSearch(e.target.value)
    }, 600);
   
  }, [search])


  const resultSesion = useMemo(()=>{
    return <div>
        <div id="result-heading">{results ? `Search results for ${search}` : '' }</div>
        <div id="meals" class="meals">
          {results && results.map((item) => {
            return (<div class="meal">
              <img src={item.strMealThumb} alt="Pancakes" />
              <div class="meal-info" data-mealid="52854">
                <h3>{item.strMeal}</h3>
              </div>
            </div>)
          })}
        </div>
        </div>
  },[results])


  const randomRender = useMemo(()=>{
    return <div>
    {randomValue && randomValue.map((item) => {    
       return <div id="single-meal">
          <div class="single-meal">
            <h1>{item.strMeal}</h1>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <div class="single-meal-info">
              <p>{item.strCategory}</p>
              <p>{item.strArea}</p>
            </div>
            <div class="main">
              <p>{item.strInstructions}
              </p>
              <h2>Ingredients</h2>
              <ul>
                <li>{item.strIngredient1}</li><li>{item.strIngredient2}</li><li>{item.strIngredient3}</li><li>{item.strIngredient4}</li><li>{item.strIngredient5}</li><li>{item.strIngredient6}</li>
              </ul>
            </div>
          </div>
        </div>
    })}
    </div>
  },[randomValue])

  const submitKey = useCallback(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then((response) => {
      setResults(response.data.meals);
    });
  }, [results, search])


  const randomClick = useCallback(() => {
    setSearch('');
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then((response) => {
      setrandomValue(response.data.meals)
    })
  }, [randomValue])

  const testClick = useCallback(()=>{
    if(execute.current){
      console.log('hello');
      execute.current = false;
      setTimeout(()=>{  execute.current = true; },2000)
    }
   
  },[])

  return (
    <>
      <div className="container">
        <h1>Meal Finder</h1>
        <button onClick={testClick}>test</button>
        <div class="flex">
        <div id="result-heading">{search}</div>
          <input
            type="text"
            id="search"
            onChange={(e) => { handleChange(e) }}
            placeholder="Search for meals or keywords"
          />
          <button class="search-btn" onClick={submitKey}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
          </button>

          <button class="random-btn" id="random" onClick={randomClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" /></svg>
          </button>
        </div>
        {search ? <div>{resultSesion}</div>:<div>{randomRender}</div>}
      </div>
    </>
  )
}

export default App
