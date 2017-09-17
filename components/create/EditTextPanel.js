import React from 'react';
import { range } from 'lodash';
import { inject, observer } from 'mobx-react';
import CirclePicker from 'react-color/lib/components/circle/Circle';
import { fontList, COLORS } from './consts';
import TextInput from '../TextInput';
import { SelectField, SelectItem } from '../SelectField';

const defaultText = {
  font_size: 30,
  font_family: 'Arial',
  text: '',
};

@inject('designStore') @observer
export default class EditTextPanel extends React.Component {
  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleChangeText = (e) => {
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      text: e.target.value,
    });
  }

  handleChangeFont = (font_family) => {
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      font_family,
    });
  }

  handleChangeFontSize = (fontSize) => {
    const text = this.props.designStore.selectedText || defaultText;
    console.log(text);
    this.props.designStore.updateText({
      id: text.id,
      font_size: +fontSize,
    });
  }

  handleChangeColor = (color) => {
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      color: color.hex,
    });
  }

  handleAlignCenter = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'center',
    });
  }

  handleAlignLeft = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'left',
    });
  }

  handleAlignRight = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      align: 'right',
    });
  }

  handleBoldSelect= (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      bold: !text.bold,
    });
  }

  handleItalicSelect = (e) => {
    e.preventDefault();
    const text = this.props.designStore.selectedText || defaultText;
    this.props.designStore.updateText({
      id: text.id,
      italic: !text.italic,
    });
  }

  render() {
    const text = this.props.designStore.selectedText || defaultText;

    return (
      <div className="edit-text-panel">
        <style jsx>{`
          .edit-text-panel {
            margin: 20px 0 40px 0;
          }
          label {
            display: block;
            padding-bottom: 10px;
          }
          .active-text {
            border: 1px solid #ff5a5f;
          }
          .select-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .select-list > div {
            width: 47.5%;
          }
          .select-list div:not(:last-child) {
            margin-right: 5%;
          }
          [title~="#fff"] {
            border: 1px solid #000;
          }
        `}</style>
        <div className="form-field">
          <TextInput
            autoFocus
            icon="text_fields"
            ref={(r) => { this.input = r ? r.inputRef : null; }}
            multiline
            label="文字"
            value={text.text}
            onChange={this.handleChangeText}
          />
        </div>
        <div className="form-field select-list">
          <div>
            <label htmlFor="align-select">
              字号：
              <SelectField
                value={text.font_size}
                onChange={this.handleChangeFontSize}
              >
                {
                  range(30, 46).map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
            </label>
          </div>
          <div>
            <label htmlFor="align-select">
              字体：
              <SelectField
                style={{ font_family: text.font_family }}
                value={text.font_family}
                onChange={this.handleChangeFont}
              >
                {
                  fontList.map(n =>
                    <SelectItem key={n} value={n}><span style={{ fontFamily: n }}>{n}</span></SelectItem>,
                  )
                }
              </SelectField>
            </label>
          </div>
        </div>
        <div className="select-list form-field">
          <div>
            <label htmlFor="align-select">对齐</label>
            <div id="align-select">
              <i onClick={this.handleAlignCenter} className={`icon-button material-icons ${text.align === 'center' ? 'active-text' : ''}`}>format_align_center</i>
              <i onClick={this.handleAlignLeft} className={`icon-button material-icons ${text.align === 'left' ? 'active-text' : ''}`}>format_align_left</i>
              <i onClick={this.handleAlignRight} className={`icon-button material-icons ${text.align === 'right' ? 'active-text' : ''}`}>format_align_right</i>
            </div>
          </div>
          <div>
            <label htmlFor="format-select">字体格式</label>
            <div id="format-select">
              <i onClick={this.handleBoldSelect} className={`icon-button material-icons ${text.bold ? 'active-text' : ''}`}>format_bold</i>
              <i onClick={this.handleItalicSelect} className={`icon-button material-icons ${text.italic ? 'active-text' : ''}`}>format_italic</i>
            </div>
          </div>
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
