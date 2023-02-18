import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import { GET_PROJECTS_PENDING } from '../../actions/Projects';
import { Projects } from './Projects';
import { isLoadingSelector, projectsSelector } from '../../reducers/projects';

const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProjects: ({ search }) =>
    dispatch({
      type: GET_PROJECTS_PENDING,
      payload: {
        search,
      },
    }),
});

export const Projections = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(Projects);
