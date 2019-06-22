import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'

class ProfileDetail extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "name" || this.props.clicked === "photo") {
    let ntdmn = require('number-to-date-month-name');
      return (
        <div className="prof-info-deets">
          <h5> About </h5>
          {/* <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/> */}
          <hr id="profile-details-hr"/>
          <p>{ntdmn.toMonth(this.props.currentUser.birth_month)} {ntdmn.toDate(parseInt(this.props.currentUser.birth_day))}<span className="invisible-span">|</span></p>
          <p>{this.props.currentUser.gender}<span className="visible-span"> | </span> {this.props.currentUser.age}</p>
          <p>{this.props.currentUser.location}<span className="invisible-span">|</span></p>
          {/* <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/> */}
          <hr id="profile-details-hr"/>
          <p>{this.props.currentUser.bio}<span className="invisible-span">|</span></p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="col l4 m3 s12 side-card">
        {this.renderDetail()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}
export default connect(mapStateToProps)(ProfileDetail);
