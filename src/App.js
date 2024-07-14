import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import DisplayList from './components/DisplayText'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    textInput: '',
    activeOptionId: tagsList[0].optionId,
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onChangeText = event => {
    this.setState({
      textInput: event.target.value,
    })
  }

  onChangeActive = event => {
    this.setState({
      activeOptionId: event.target.value,
    })
  }

  onClickTabButton = id => {
    this.setState({
      activeOptionId: id,
    })
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {textInput, activeOptionId} = this.state
    const taskName = textInput
    const taskCategory = activeOptionId
    const newComment = {
      id: uuidv4(),
      newText: taskName,
      activeOptionId1: taskCategory,
      bgColor: false,
    }
    if (taskName.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newComment],
        textInput: '',
        activeOptionId: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {activeOptionId, tasksList, textInput, activeTag} = this.state
    const filteredLists =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.activeOptionId1 === activeTag)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="left-part">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="heading1">Create a task!</h1>
              <label className="label" htmlFor="task">
                Task
              </label>
              <input
                type="text"
                id="task"
                className="input"
                value={textInput}
                onChange={this.onChangeText}
                placeholder="Enter the task here"
              />
              <label className="label" htmlFor="tags">
                Tags
              </label>
              <select
                id="tags"
                value={activeOptionId}
                className="input"
                onChange={this.onChangeActive}
              >
                {tagsList.map(each => (
                  <option value={each.optionId}>{each.displayText}</option>
                ))}
              </select>
              <button type="submit" className="button">
                Add Task
              </button>
            </form>
          </div>
          <div className="right-part">
            <h1 className="tags-name">Tags</h1>
            <ul className="tablist-container">
              {tagsList.map(each => {
                const isActive = activeTag === each.optionId
                const tabClassName = isActive ? 'active tab' : 'tab'
                return (
                  <li key={each.optionId} className="tab-list">
                    <button
                      type="button"
                      value={each.optionId}
                      onClick={this.onClickTag}
                      className={tabClassName}
                    >
                      {each.displayText}
                    </button>
                  </li>
                )
              })}
            </ul>
            <h1 className="tags-name1">Tasks</h1>
            <ul className="task-lists-show">
              {filteredLists.length === 0 ? (
                <p className="no-task">No Tasks Added Yet</p>
              ) : (
                filteredLists.map(each => (
                  <DisplayList key={each.id} detailsTab={each} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
