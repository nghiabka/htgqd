import React, { Component } from 'react'
import { Field, Form, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton';
import { MenuItem} from 'material-ui/Menu'
// import { Redirect } from 'react-router-dom'
import SelectField from 'material-ui/SelectField'
import axios from 'axios'
import { connect} from "react-redux"
import CustomTextField from '../components/CustomTextField'
import CustomSelectField from '../components/CustomSelectField'
// import { InputLabel} from 'material-ui/Input'
// import Table, { TableBody, TableRowColumn, TableRow } from 'material-ui/Table';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import {fetchData} from '../actions/app-actions'

const validate = values => {
  const errors = {}
  if (!values.score) {
    errors.score = "Bắt buộc!";
  } else {
    if( ! /[0-9]/.test( values.score))
    errors.score = "Nhập số";
  }
  // if (!values.area) {
  //   errors.area = "Bắt buộc!";
  // }
  if (!values.hobby) {
    errors.hobby = "Bắt buộc!";
  }
  // if (!values.group) {
  //   errors.group = "Bắt buộc!";
  // }
  // if (!values.school) {
  //   errors.school = "Bắt buộc!";
  // }
  return errors
}

class HelperForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      score: 0,
      hobby: '',
      group: '',
      school: '',
      area: ''
    }
  }

  componentDidMount = () => {
    this.props.fetchData();
  }

  submit = (event) => {
    console.log(this.state)
    // axios.post('localhost:8000/result', {
    //   data: this.state
    // })
    // .then( (response) => {
    //
    // })
    // this.setState({
    //   success: true
    // })
  }

  onScoreChange = (event) => {
    this.setState({
      score: event.target.value
    })
  }

  onSelectFieldFieldChange = (name) => (event) => {
    console.log(name)
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    //onChange={this.onSelectFieldFieldChange('hobby')}
    return(
      <div>
          <Form onSubmit={this.props.handleSubmit(this.submit)}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableRowColumn>
                    <h4>Điểm thi</h4>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Field
                      onChange={this.onScoreChange}
                      autoFocus={true}
                      name="score"
                      component={CustomTextField}
                      placeholder="Điểm thi"
                      />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <h4>Sở thích</h4>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Field
                      value={this.state.hobby}
                      onChange={this.onSelectFieldFieldChange('hobby')}
                      name="hobby"
                      component={CustomSelectField}
                      label="Sở thích"
                      >
                      {
                        this.props.hobby.map( (el, index) => {
                          return <MenuItem value={el.id} key={index} primaryText={el.hobby}/>
                        })
                      }
                    </Field>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <h4>Khu vực</h4>
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField value={this.state.area} onChange={this.onSelectFieldFieldChange('area')} fullWidth>
                      {
                        this.props.area.map( (el, index) => {
                          return <MenuItem value={el.id} key={index} >{el.area}</MenuItem>
                        })
                      }
                    </SelectField>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <h4>Trường</h4>
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField value={this.state.school} onChange={this.onSelectFieldFieldChange('school')} fullWidth>
                      <MenuItem value="0" SelectFielded="true" >Tất cả</MenuItem>
                      {
                        this.props.school.map( (el, index) => {
                          return <MenuItem value={el.id} key={index}>{el.name}</MenuItem>
                        })
                      }
                    </SelectField>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <h4>Khối thi</h4>
                  </TableRowColumn>
                  <TableRowColumn>
                    <SelectField value={this.state.group} onChange={this.onSelectFieldFieldChange('group')} fullWidth>
                      {
                        this.props.group.map( (el, index) => {
                          return <MenuItem value={el.group} key={index} >{el.group}</MenuItem>
                        })
                      }
                    </SelectField>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <br/><br/>
            <RaisedButton style = {{float: "right"}} primary={true} type="submit" disabled={ this.props.pristine || this.props.submitting}>Xác nhận</RaisedButton>
          </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hobby: state.appStore.hobby,
    group: state.appStore.group,
    school: state.appStore.school,
    area: state.appStore.area,
  }
}

HelperForm = reduxForm({
  form: 'HelperForm',
  // validate,
})(HelperForm)
export default connect (mapStateToProps, {fetchData})(HelperForm)
