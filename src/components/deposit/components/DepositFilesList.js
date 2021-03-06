import React from 'react';

import {
  Anchor,
  Box,
  Button,
  Label,
  Menu,
  List,
  ListItem,
} from 'grommet';

import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import FileManager from './DepositFileManager';

import AddIcon from 'grommet/components/icons/base/Add';
import ArchiveIcon from 'grommet/components/icons/base/Archive';
import DocumentConfigIcon from 'grommet/components/icons/base/DocumentConfig';
import PieChartIcon from 'grommet/components/icons/base/PieChart';
import BookIcon from 'grommet/components/icons/base/Book';
import NoteIcon from 'grommet/components/icons/base/Note';
import MoreIcon from 'grommet/components/icons/base/More';

import prettyBytes from 'pretty-bytes';

class DepositFilesList extends React.Component {
  constructor(props) {
    super(props);

    this.files2 = [];
    this.files = [
      {
        filename: "my_repo.tar",
        uri: "",
        type: "archive",
        size: "1234"
      },
      {
        filename: "config.json",
        uri: "",
        type: "configuration",
        size: "4321"
      },
      {
        filename: "ntuple_NNN_MMM.dat",
        uri: "",
        type: "dataset",
        size: "5678"
      },
      {
        filename: "ANA_NOTE_MMM_123.pdf",
        uri: "",
        type: "publication",
        size: "5678"
      },
      {
        filename: "result.jpg",
        uri: "",
        type: "ploot",
        size: "5678"
      }
    ];
  }

  _getIcon(type) {
    const catToIcon = {
      archive: <ArchiveIcon type="status" size="xsmall"/>,
      configuration: <DocumentConfigIcon type="status" size="xsmall"/>,
      dataset: <PieChartIcon type="status" size="xsmall"/>,
      publication: <BookIcon type="status" size="xsmall"/>,
      plot: <PieChartIcon type="status" size="xsmall"/>,
    };

    return catToIcon[type] ? catToIcon[type] : <NoteIcon type="status" size="xsmall" />;
  }

  render() {
    return (
      <List basis="full" flex="true">
        {[
          <FileManager
            activeLayer={this.props.fileManagerLayerActive}
             key="_file_manager"/>,
          this.files.length > 0 ?
          this.files.map(file => (
            <ListItem key={file.filename} justify="between" pad="none"  flex={true} >
              <Box direction="row" flex={true} justify="between">
                <Box  direction="row" flex={true}>
                  <Box justify="center" margin={{horizontal: "small"}}>
                    {this._getIcon(file.type)}
                  </Box>
                  <Box justify="center" margin={{right: "small"}}>
                    <Label justify="center" margin="none" size="small" truncate={true}> {file.filename}</Label>
                  </Box>
                  <Box  justify="center" margin={{right: "small"}}>{prettyBytes(parseInt(file.size))}</Box>
                </Box>

                <Menu
                  responsive={true}
                  size="small"
                  dropAlign={{right: 'right', top: 'bottom'}}
                  icon={<MoreIcon size="xsmall" />}>
                    <Anchor href="#"
                      className="active">
                      Download
                    </Anchor>
                    <Anchor href="#">
                      More Info
                    </Anchor>
                </Menu>
              </Box>
            </ListItem>
          )) :
          <ListPlaceholder
            addControl={<Button icon={<AddIcon />} />}
            emptyMessage="No files have been attached to this deposit."
            unfilteredTotal={0}/>
        ]}

      </List>
    );
  }
}

export default DepositFilesList;
