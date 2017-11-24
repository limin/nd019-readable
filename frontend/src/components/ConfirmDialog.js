import React from 'react'

class ConfirmDialog extends React.Component{
  render(){
    const {title, body, activeModal, onCancel, onConfirm}=this.props
    return (
      <div className={activeModal?"modal is-active":"modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onCancel}></button>
          </header>
          <section className="modal-card-body">
            <p>{body}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={onConfirm}>Yes</button>
            <button className="button" onClick={onCancel}>No</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default ConfirmDialog
