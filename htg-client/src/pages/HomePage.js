import React, { Component } from 'react'
// import Grid from 'material-ui/Grid'
import HelperForm from '../containers/HelperForm'
import 'bootstrap/dist/css/bootstrap.css'

class HomePage extends Component {

  render() {
    // return (
    //   <div style={{marginTop: 100}}>
    //     <Grid container spacing={24}>
    //       <Grid item xs={1} sm={1} >
    //       </Grid>
    //       <Grid item xs={5} sm={5}>
    //         <HelperForm />
    //       </Grid>
    //       <Grid item xs={1} sm={1} >
    //       </Grid>
    //       <Grid item xs={5} sm={5}>
    //       </Grid>
    //     </Grid>
    //   </div>
    // );
    return (
      <div style={{marginTop: 100}}>
        <div className="row">
          <div className="col-md-1" >
          </div>
          <div className="col-md-5">
            <HelperForm />
          </div>
          <div className="col-md-1" >
          </div>
          <div className="col-md-5">
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage
