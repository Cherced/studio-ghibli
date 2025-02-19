import React from 'react'
import {useRouter} from 'next/router'
import data from '../../database/data'
import { HeaderNav } from '../../components/UI/organismos/HeaderNav/HeaderNav'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faStar, faArrowRight  } from "@fortawesome/free-solid-svg-icons";

export default function Film ({data}){
    
  return (
      <>
        <HeaderNav />
        <div className='container-film-id'>        
            <img className='background-img' src={data.movie_banner} />
            <div className='container-title'>
                <div>
                <h1 className='title'>{ data.title }</h1>
                <FontAwesomeIcon icon={faHeart} style={{color:"red"}}/>
                </div>
                
                <p className='year-card-film'>{ data.release_date }</p>
            </div>
            <div className='container-images'>
                <img className='img' src={data.image}  /> 
                <div className='iconStar'>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                </div>
                
            </div>
            <div className='container-text-film-id'>
                <p className='description'>{ data.description }</p>
                <p className='moreInfo'><a href= "https://ghibli.fandom.com/wiki/Ghibli_Wiki" >More info </a><FontAwesomeIcon icon={faArrowRight}/></p>
            </div>     
    </div>
    </>
  )
}


        
export async function getStaticPaths (){
    try{
      const res = await fetch('https://ghibliapi.herokuapp.com/films');
      const data = await res.json();
      const paths = data.map(({ id }) => ({params: {id: `${id}`}}));
      return {
          paths,
          fallback:false
      }
    }catch (error){
      console.log(error);
    }

}

export async function getStaticProps ({ params }){
    
    try {
      const res = await fetch(
          'https://ghibliapi.herokuapp.com/films/' +  params.id);
      const data = await res.json();
      return{
          props: {
            data
          }
      }      
    }catch (error){
      console.log(error);
    }

}
