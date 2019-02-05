import React from 'react';
import { connect } from 'react-redux'
import ProfileDetail from './ProfileDetail'

class ProfileContainer extends React.Component {

  // renderProfileDetails = () => this.props.map((detail, id) => <ProfileDetail key={id} text={detail} />)

  render () {
    console.log(this.state.first_name)
    return (
      <div>
        <div>
          {/* <p>{this.props.first_name} {this.props.last_name}</p>
          <p>{this.props.birth_month}/{this.props.birth_day}/{this.props.birth_year}</p> */}
        </div>
        {/* {this.renderProfileDetails()} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // newUser: state.newUser
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      birth_year: this.state.birth_year,
      birth_month: this.state.birth_month,
      birth_day: this.state.birth_day,
    }
  }

export default connect(mapStateToProps)(ProfileContainer);
