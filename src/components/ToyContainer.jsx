import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {props.toy.map((toy, index) => {
         return  <ToyCard key={index} toy={toy} increasLike={props.increasLike} delteToy={props.delteToy}/>
      })}

    </div>
  );
}

export default ToyContainer;
