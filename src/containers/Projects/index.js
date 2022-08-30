import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import { GET_PROJECTS_PENDING } from '../../actions/Projects';
import { projectsSelector, isLoadingSelector } from '../../selectors/projects';
import Projects from './Projects';

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

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Projects);
