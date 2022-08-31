import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Todo from './Todo';
import { ADD_TASK, CHANGE_TASK_CHECKED } from '../../actions/Todo';

const mapStateToProps = (state) => ({
  tasksList: state.todo.items,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (title) =>
    dispatch({
      type: ADD_TASK,
      payload: {
        title,
      },
    }),
  changeTaskChecked: (id) =>
    dispatch({
      type: CHANGE_TASK_CHECKED,
      payload: {
        id,
      },
    }),
});

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Todo);
