// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Modal from '../Modal';
import TextInput from '../TextInput';

@inject('designStore') @observer
export default class AddTextModal extends React.Component {
  state = {
    text: '',
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  handleAddText = (e) => {
    e.preventDefault();
    this.props.designStore.addText({
      text: this.state.text,
    });
    this.setState({
      text: '',
    });
    this.props.onClose();
  }

  disableSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Modal
        onAccept={this.handleAddText}
        onClose={this.props.onClose}
        open={this.props.open}
        title="添加文字"
      >
        <form onSubmit={this.disableSubmit} >
          <div className="form-field">
            <TextInput
              ref={(r) => { this.input = r ? r.inputRef : null; }}
              multiline
              label="请输入文字"
              value={this.state.text}
              onChange={this.handleChangeText}
            />
          </div>
        </form>
      </Modal>
    );
  }
}
