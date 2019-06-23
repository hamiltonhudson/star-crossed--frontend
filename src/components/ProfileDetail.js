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
          <hr className="profile-details-hr"/>
          <p>{ntdmn.toMonth(this.props.currentUser.birth_month)} {ntdmn.toDate(parseInt(this.props.currentUser.birth_day))}<span style={{"fontFamily": "Datalegreya-Thin", "color": "transparent", "fontSize": "calc(.65em + .65vw"}}>|</span></p>
          <p>{this.props.currentUser.gender}<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.currentUser.age}</p>
          <p>{this.props.currentUser.location}<span style={{"fontFamily": "Datalegreya-Thin", "color": "transparent", "fontSize": "calc(.65em + .65vw"}}>|</span></p>
          <hr className="profile-details-hr"/>
          <p>{this.props.currentUser.bio}<span style={{"fontFamily": "Datalegreya-Thin", "color": "transparent", "fontSize": "calc(.65em + .65vw"}}>|</span></p>
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
