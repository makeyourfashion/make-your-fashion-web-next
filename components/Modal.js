import React from 'react';
import ClickOutside from 'react-click-outside';

class ModalWindow extends React.Component {
  handleClickOutside = () => {
    if (window.screen.width > 600) {
      this.props.onClose();
    }
  }
  render() {
    return (
      <div className="mdc-dialog__surface">
        <style jsx>{`
          .modal-body {
            max-height: 70vh;
            overflow: auto;
          }
          @media (max-width: 599px) {
            .mdc-dialog__surface {
              min-width: 100%;

              min-height: 100vh;
              z-index: 10;
            }
          }
        `}</style>
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
    );
  }
}

const ModalWindoComponent = ClickOutside(ModalWindow);

export default function ({ open, ...props }) {
  return open ? (
    <aside
      className="mdc-dialog mdc-dialog--open"
      role="alertdialog"
      aria-labelledby="mdc-dialog-with-list-label"
      aria-describedby="mdc-dialog-with-list-description"
    >
      <ModalWindoComponent {...props} />
      <div className="mdc-dialog__backdrop" />
    </aside>
  ) : null;
}
