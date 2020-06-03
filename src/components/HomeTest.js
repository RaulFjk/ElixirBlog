import React from 'react'
import Image  from "../curry.jpg";

export default function HomeTest() {
    return (
 <div className="container ">    

 <div className="center">
    <ul className="tabs transparent">
        <li className="tab">
            <a href="#" className="indigo-text text-darken-4"> All Posts</a>
        </li>
        <li className="tab">
            <a href="#"> My Posts</a>
        </li>
    </ul>
 </div>

<div className="row">  
   <div className="col s4">
      <div className="card mystyle">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>
      <div className="col s4 ">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>

      <div className="col s4 ">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>

      <div className="col s4 ">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>

      <div className="col s4">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>

      <div className="col s4 ">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>


      <div className="col s4 ">
      <div className="card ">
      <div className="card-image">
          <img src={Image}/>
        </div>
        <div className="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        </div>
      </div>


    </div>
    </div>
    );
}
