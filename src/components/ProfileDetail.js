import React from 'react';

const ProfileDetail = props => {
  console.log(props)
  return (
    <div>
      <p>{props.first_name} {props.last_name}</p>
      <p>{props.birth_month}/{props.birth_day}/{props.birth_year}</p>
    </div>
  )
}

export default ProfileDetail;
