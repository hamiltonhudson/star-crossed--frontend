import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'


const MatchDetail = () => {
  console.log(this.props.name)
  return (
    <div>
      <div className='tooltipped'> User Sign </div>
      <a className="btn tooltipped" data-position="left" data-tooltip="I am a tooltip">Hover me!</a>

      <div> User Details </div>
      {/* <p>{props.first_name} {props.last_name}</p>
      <p>{props.birth_month}/{props.birth_day}/{props.birth_year}</p> */}
    </div>
  )
}


  // {/* {this.displayMatches} */}
  // {/* {
  //     this.props.matches.map(match =>
  //     return <Match key={match.id} match={...match} />
  //     )
  // } */}
      // let detail = M.Tooltip.getInstance()
