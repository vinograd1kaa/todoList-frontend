import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Todo from './Todo';

const mapStateToProps = (state) => ({
  tasksList: state.todo.items,
  items: 1,
  number: 12,
  strings: 'asdasd',
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

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Todo);
