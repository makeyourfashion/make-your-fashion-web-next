import React from 'react';

export default class Modal extends React.Component {
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <aside
        ref={(r) => { this.modalDom = r; }}
        className="mdc-dialog mdc-dialog--open"
        role="alertdialog"
        aria-labelledby="mdc-dialog-with-list-label"
        aria-describedby="mdc-dialog-with-list-description"
      >
        <style jsx>{`
          .modal-body {
            max-height: 80%;
          }
          .mdc-dialog__surface {
            max-height: 100%;
          }
          @media (max-width: 599px) {
            .mdc-dialog__surface {
              width: 100%;
            }
          }
        `}</style>
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="mdc-dialog-with-list-label" className="mdc-dialog__header__title">
              {this.props.title}
            </h2>
          </header>
          <section id="mdc-dialog-with-list-description" className="modal-body mdc-dialog__body mdc-dialog__body--scrollable">
            {this.props.children}
          </section>
          <footer className="mdc-dialog__footer">
            {
              this.props.onAccept ? <button onClick={this.props.onAccept} type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">确定</button> : null
            }
            {
              this.props.onClose ? <button onClick={this.props.onClose} type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">返回</button> : null
            }
          </footer>
        </div>
        <div className="mdc-dialog__backdrop" />
      </aside>
    );
  }
}
