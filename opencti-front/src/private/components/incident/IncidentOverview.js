import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, pathOr } from 'ramda';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import Markdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import inject18n from '../../../components/i18n';
import { truncate } from '../../../utils/String';

const styles = theme => ({
  paper: {
    minHeight: '100%',
    margin: '10px 0 0 0',
    padding: '15px',
    borderRadius: 6,
  },
});

class IncidentOverviewComponent extends Component {
  render() {
    const {
      t, fld, classes, incident,
    } = this.props;
    return (
      <div style={{ height: '100%' }} className="break">
        <Typography variant="h4" gutterBottom={true}>
          {t('Information')}
        </Typography>
        <Paper classes={{ root: classes.paper }} elevation={2}>
          <Typography variant="h3" gutterBottom={true}>
            {t('Creation date')}
          </Typography>
          {fld(incident.created)}
          <Typography
            variant="h3"
            gutterBottom={true}
            style={{ marginTop: 20 }}
          >
            {t('Modification date')}
          </Typography>
          {fld(incident.modified)}
          <Typography
            variant="h3"
            gutterBottom={true}
            style={{ marginTop: 20 }}
          >
            {t('Creator')}
          </Typography>
          {pathOr('-', ['createdByRef', 'node', 'name'], incident)}
          <Typography
            variant="h3"
            gutterBottom={true}
            style={{ marginTop: 20 }}
          >
            {t('Description')}
          </Typography>
          <Markdown
            className="markdown"
            source={truncate(incident.description, 250)}
          />
        </Paper>
      </div>
    );
  }
}

IncidentOverviewComponent.propTypes = {
  incident: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
  fld: PropTypes.func,
};

const IncidentOverview = createFragmentContainer(IncidentOverviewComponent, {
  incident: graphql`
    fragment IncidentOverview_incident on Incident {
      id
      name
      description
      created
      modified
      createdByRef {
        node {
          name
        }
      }
    }
  `,
});

export default compose(
  inject18n,
  withStyles(styles),
)(IncidentOverview);
