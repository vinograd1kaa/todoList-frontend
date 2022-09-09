import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Todo from './Todo';
import { ADD_TASK, CHANGE_TASK_CHECKED, ADD_SUB_TASK } from '../../actions/Todo';
import { todoSelector } from '../../selectors/todo';

const mapStateToProps = (state) => ({
  tasksList: todoSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (title) =>
    dispatch({
      type: ADD_TASK,
      payload: {
        title,
      },
    }),
  changeTaskChecked: (id, checked) =>
    dispatch({
      type: CHANGE_TASK_CHECKED,
      payload: {
        id,
        checked,
      },
    }),

  addSubTask: (id, title) =>
    dispatch({
      type: ADD_SUB_TASK,
      payload: {
        id,
        title,
      },
    }),
});

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Todo);
