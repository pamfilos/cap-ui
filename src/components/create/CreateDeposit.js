import _ from 'lodash';
import React from 'react';

import {connect} from 'react-redux';

import {Box, Heading, Tiles, Tile, Toast, Paragraph} from 'grommet';

import _isEqual from 'lodash/isEqual';

import {fetchSchema, createDraft, initForm, getDraftById, publishDraft} from '../../actions/drafts';
import DepositForm from '../deposit/form/Form';
import DepositHeader from '../deposit/components/DepositHeader';
import Sidebar from '../deposit/components/DepositSidebar';
import Previewer from '../deposit/components/DepositPreviewer';

const transformSchema = (schema) => {
  const schemaFieldsToRemove = [
    "_access",
    "_deposit",
    "_cap_status",
    "_buckets",
    "_files",
    "$ana_type",
    "$schema",
    "general_title",
    "_experiment",
    "control_number"
  ];

  schema.properties = _.omit(schema.properties, schemaFieldsToRemove);
  schema = { type: schema.type, properties: schema.properties };
  return schema;
};


export class CreateDeposit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.draft_id) {
      if (this.props.match.params.draft_id !== this.props.draft_id) {
        this.props.getDraftById(this.props.match.params.draft_id, true);
      }
    }
    if (this.props.match.params.schema_id) {
      this.props.initForm();
      this.props.fetchSchema(this.props.match.params.schema_id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.match.params.draft_id) {
      if (nextProps.match.params.draft_id !== nextProps.draft_id) {
        // nextProps.getDraftById(nextProps.match.params.draft_id, true);
      }
    }
    return true
  }

  _saveData() {
    if (this.props.match.params.schema_id)
      this.props.createDraft(this.state.formData, this.props.match.params.schema_id);
  }

  _publishData() {
      this.props.publishDraft(this.props.draft_id);
  }

  render() {
    let _schema = this.props.schema ? transformSchema(this.props.schema):null;

    return (
      <Box id="deposit-page" basis="full" flex={true}>
        {
          this.props.error?
          <Toast status="critical">
            {this.props.error.message}
          </Toast> : null
        }
        <DepositHeader draftId={this.props.draft_id} saveData={this._saveData.bind(this)} publishData={this._publishData.bind(this)}/>
          <Box direction="row" flex={true} wrap={false}>
          <Sidebar draftId={this.props.draft_id} />
          {
            this.props.schema ?
            <DepositForm
              formData={this.state.formData}
              schema={_schema}
              uiSchema={this.props.uiSchema || {}}
              onChange={(change) => {
                console.log("CHANGE::",change);
                this.setState({formData: change.formData});
              }}
            /> : null
          }
          <Previewer data={this.state.formData}/>
          </Box>
      </Box>
    );
  }
}

CreateDeposit.propTypes = {};

function mapStateToProps(state) {
  return {
    schema: state.drafts.get('schema'),
    uiSchema: state.drafts.get('uiSchema'),
    error: state.drafts.getIn(['current_item', 'error']),
    draft_id: state.drafts.getIn(['current_item', 'id']),
    published_id: state.drafts.getIn(['current_item', 'published_id'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSchema: (schema) => dispatch(fetchSchema(schema)),
    createDraft: (data, schema) => dispatch(createDraft(data, schema)),
    getDraftById: (id, fet) => dispatch(getDraftById(id, fet)),
    initForm: () => dispatch(initForm()),
    publishDraft: (depid) => dispatch(publishDraft(depid))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDeposit);
