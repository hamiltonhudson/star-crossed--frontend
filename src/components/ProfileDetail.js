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
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p>{ntdmn.toMonth(this.props.currentUser.birth_month)} {ntdmn.toDate(parseInt(this.props.currentUser.birth_day))}</p>
          <p>{this.props.currentUser.gender}<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.currentUser.age}</p>
          <p>{this.props.currentUser.location}</p>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p>{this.props.currentUser.bio}</p>
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
