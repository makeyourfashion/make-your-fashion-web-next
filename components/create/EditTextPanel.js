import React from 'react';
import { range } from 'lodash';
import { inject, observer } from 'mobx-react';
import CirclePicker from 'react-color/lib/components/circle/Circle';
import { fontList, COLORS } from './consts';
import TextInput from '../TextInput';
import { SelectField, SelectItem } from '../SelectField';

@inject('designStore') @observer
export default class EditTextPanel extends React.Component {
  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleChangeText = (e) => {
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      text: e.target.value,
    });
  }

  handleChangeFont = (fontFamily) => {
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      fontFamily,
    });
  }

  handleChangeFontSize = (fontSize) => {
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      fontSize: +fontSize,
    });
  }

  handleChangeColor = (color) => {
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      color: color.hex,
    });
  }

  handleAlignCenter = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'center',
    });
  }

  handleAlignLeft = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'left',
    });
  }

  handleAlignRight = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'right',
    });
  }

  handleBoldSelect= (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      bold: !text.bold,
    });
  }

  handleItalicSelect = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText;
    this.props.designStore.updateText({
      id: text.id,
      italic: !text.italic,
    });
  }

  render() {
    const text = this.props.designStore.selectedText;
    if (!text) {
      return null;
    }
    return (
      <div className="edit-text-panel">
        <style jsx>{`
          .edit-text-panel {
            margin: 20px 0 40px 0;
          }
          .active-text {
            border: 1px solid #ff5a5f;
          }
          .select-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .select {
            width: 45%;
            margin-right: 5%;
          }
          [title~="#fff"] {
            border: 1px solid #000;
          }
        `}</style>
        <div className="form-field">
          <TextInput
            ref={(r) => { this.input = r ? r.inputRef : null; }}
            multiline
            label="文字"
            value={text.text}
            onChange={this.handleChangeText}
          />
        </div>
        <div className="form-field select-list">
          <div className="select">
            <label htmlFor="align-select">字号<br /></label>
            <SelectField
              value={text.fontSize}
              onChange={this.handleChangeFontSize}
            >
              {
                range(30, 46).map(n =>
                  <SelectItem key={n} value={n}>{n}</SelectItem>,
                )
              }
            </SelectField>
          </div>
          <div className="select">
            <label htmlFor="align-select">字体<br /></label>
            <SelectField
              style={{ fontFamily: text.fontFamily }}
              value={text.fontFamily}
              onChange={this.handleChangeFont}
            >
              {
                fontList.map(n =>
                  <SelectItem key={n} value={n}><span style={{ fontFamily: n }}>{n}</span></SelectItem>,
                )
              }
            </SelectField>
          </div>
        </div>
        <label htmlFor="align-select">对齐</label>
        <div className="form-field" id="align-select">
          <i onClick={this.handleAlignCenter} className={`icon-button material-icons ${text.align === 'center' ? 'active-text' : ''}`}>format_align_center</i>
          <i onClick={this.handleAlignLeft} className={`icon-button material-icons ${text.align === 'left' ? 'active-text' : ''}`}>format_align_left</i>
          <i onClick={this.handleAlignRight} className={`icon-button material-icons ${text.align === 'right' ? 'active-text' : ''}`}>format_align_right</i>
        </div>
        <label htmlFor="format-select">字体格式</label>
        <div className="form-field" id="format-select">
          <i onClick={this.handleBoldSelect} className={`icon-button material-icons ${text.bold ? 'active-text' : ''}`}>format_bold</i>
          <i onClick={this.handleItalicSelect} className={`icon-button material-icons ${text.italic ? 'active-text' : ''}`}>format_italic</i>
        </div>
        <label htmlFor="color-picker">颜色</label>
        <CirclePicker
          id="color-picker"
          colors={COLORS}
          color={text.color}
          onChange={this.handleChangeColor}
          width="100%"
          triangle="hide"
        />
      </div>
    );
  }
}
