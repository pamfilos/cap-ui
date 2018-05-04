import _ from 'lodash';
import PropTypes from 'prop-types';

import React from 'react';

import {connect} from 'react-redux';

import Box from 'grommet/components/Box';

import DepositSidebar from './components/DepositSidebar';
import DepositHeader from './components/DepositHeader';
import DepositPreviewer from './components/DepositPreviewer';
import DepositForm from './form/Form';

import {startDeposit} from '../../actions/drafts';

let schemas = {};

let uiSchemas = {};

const transformSchema = (schema) => {
  const schemaFieldsToRemove = [
    "_deposit",
    "_cap_status",
    "_buckets",
    "_files",
    "$ana_type",
    "$schema",
    "general_title",
    "_experiment"
  ];

  schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
  schema = { type: schema.type, properties: schema.properties };

  return schema;
};

class DepositPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      selectSchema: null,
    };
  }

  _changeSchema(event) {
    let schema = event.value ? event.value : event;
    // this.props.fetchSchema(schema);
    // console.log("FETCHED", this.state)
    if (schemas[schema]){
      const _schema = transformSchema(schemas[schema]);
      const uiSchema = uiSchemas[schema] ?  uiSchemas[schema] : {};

      this.props.startDeposit({ selectedSchema: schema, schema: _schema, uiSchema: uiSchema });

      this.setState({
        formData: {},
        selectSchema: schemas[schema]
      });
    }
  }

  _saveData() {
    console.log("--------_saveData-----------");
    console.log(this.state.formData);
    console.log("--------_saveData-----------");
  }

  render() {
    return (
      <Box id="deposit-page" basis="full" flex={true}>
        <DepositHeader saveData={this._saveData.bind(this)}/>

        <Box flex={true} wrap={false} direction="row">
          <Box direction="row" full={false} flex={true}>
            <DepositSidebar
              files={[]}
              schemas={schemas}
              onChangeSchema={this._changeSchema.bind(this)} />

            <Box direction="row" flex={true} wrap={false}>
              <DepositForm
                formData={this.state.formData}
                selectSchema={this.state.selectSchema}
                schemas={schemas}
                changeSchema={this._changeSchema.bind(this)}
                onChange={(change) => {
                  console.log("CHANGE::",change);
                  this.setState({formData: change.formData});
                }}
              />
              <DepositPreviewer data={this.state.formData} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

DepositPage.propTypes = {
  startDeposit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    depositGroups: state.auth.getIn(['currentUser', 'profile']),
    pay: state.deposit.payload
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startDeposit: (schema, data) => dispatch(startDeposit(schema, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositPage);
