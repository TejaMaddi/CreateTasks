import './index.css'

const DisplayText = props => {
  const {detailsTab} = props
  const {newText, activeOptionId1} = detailsTab

  return (
    <li className="list-tab-item">
      <p className="para-item">{newText}</p>
      <p className="para-button">{activeOptionId1}</p>
    </li>
  )
}

export default DisplayText
