import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'
// import Matches from './Matches';

class ProfileDetail extends React.Component {
  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail">
          <h5>{this.props.currentUser.sun.sign}</h5>
          <span> ——— </span>
          <p>Dates  |  {this.props.currentUser.sun.start_date} - {this.props.currentUser.sun.end_date}</p>
          {/* <p>Vibe  |  {this.props.currentUser.sun.vibe}</p> */}
          <p>Symbol  |  {this.props.currentUser.sun.symbol}</p>
          <p>Element  |  {this.props.currentUser.sun.element}</p><br/>
          <span> ——— </span>
          <p> Compatible With | {this.props.currentUser.sun.compat_signs}, {this.props.currentUser.sun.sign} </p>
          {/* <p>Qualities  |  {this.props.currentUser.sun.keywords}</p> */}
        </div>
    )} else if (this.props.clicked === "name" || this.props.clicked === "photo") {
        let ntdmn = require('number-to-date-month-name');
      return (
        <div className="prof-info-deets">
          <h5>About</h5>
          <span> ——— </span>
          <p>{ntdmn.toMonth(this.props.currentUser.birth_month)} {ntdmn.toDate(parseInt(this.props.currentUser.birth_day))}</p>
          <p>{this.props.currentUser.gender}</p>
          <p>{this.props.currentUser.age}</p>
          <p>{this.props.currentUser.location}</p>
          <br/>
          <span> ——— </span>
          <br/>
          <p>{this.props.currentUser.bio}</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
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
