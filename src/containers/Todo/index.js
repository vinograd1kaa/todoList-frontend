import { compose } from 'lodash/fp';
import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import Todo from './Todo';
import { ADD_TASK, ADD_SUB_TASK, CHANGE_TASK_TITLE, CHANGE_IS_EXPENDED } from '../../actions/Todo';
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

  addSubTask: (id, title, item) =>
    dispatch({
      type: ADD_SUB_TASK,
      payload: {
        id,
        title,
        item,
      },
    }),

  changeTaskTitle: (id, title, item) =>
    dispatch({
      type: CHANGE_TASK_TITLE,
      payload: {
        id,
        title,
        item,
      },
    }),

  changeIsExpended: (id, isExpended) =>
    dispatch({
      type: CHANGE_IS_EXPENDED,
      payload: {
        id,
        isExpended,
      },
    }),
});

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Todo);
