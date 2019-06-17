import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'
// import Matches from './Matches';

class ProfileSun extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail" >
          <h5>{this.props.currentUser.sun.sign}</h5>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p> Dates<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.currentUser.sun.start_date} - {this.props.currentUser.sun.end_date} </p>
          <p> Symbol<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.currentUser.sun.symbol} </p>
          <p> Element<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.currentUser.sun.element} </p>
          <p style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </p>
          <p> Compatible With<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.currentUser.sun.compat_signs} </p>
          {/* <p>Qualities  |  {this.props.currentUser.sun.keywords}</p> */}
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
export default connect(mapStateToProps)(ProfileSun);
