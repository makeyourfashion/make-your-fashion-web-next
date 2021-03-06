import React from 'react';
import Router from 'next/router';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';
import { inject, observer } from 'mobx-react';
import ShirtIcon from './ShirtIcon';
import SelectPictureModal from './SelectPictureModal';
import AddTextModal from './AddTextModal';

@inject('designStore') @observer
export default class Menu extends React.Component {
  state = {
    isSelectPicModalOpen: false,
    isAddTextModalOpen: false,
  }

  componentDidMount() {
    this.menu = new MDCSimpleMenu(this.menuDom);
    document.querySelector('.mobile-menu').addEventListener('click', (e) => {
      switch (e.target.getAttribute('data-action')) {
        case 'select-product':
          this.selectProduct();
          break;
        case 'select-design':
          this.handleSelectPicture();
          break;
        case 'add-text':
          this.handleAddText();
          break;
        case 'upload-pic':
          this.handleOpenFileUploadDialog(e);
          break;
        default:
      }
    });
  }

  handleSelect = (id, imgUrl) => {
    this.props.designStore.addImage(id, imgUrl);

    this.setState({
      isSelectPicModalOpen: false,
    });
  }

  selectProduct = () => {
    Router.push('/shop?category=2');
  }

  handleSelectPicture = () => {
    this.setState({
      isSelectPicModalOpen: true,
    });
  }

  handleAddText = () => {
    this.setState({
      isAddTextModalOpen: true,
    });
  }

  handleClosePictureModal = () => {
    this.setState({
      isSelectPicModalOpen: false,
    });
  }

  handleCloseAddTextModal = () => {
    this.setState({
      isAddTextModalOpen: false,
    });
  }

  handleOpenFileUploadDialog = (e) => {
    e.preventDefault();
    this.fileInput.click();
  }

  uploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.designStore.addImage(new Date().getTime(), event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  toggleMenu = () => {
    if (this.menu) {
      this.menu.open = !this.menu.open;
    }
  }

  renderMenu(mobile) {
    return (
      <ul className={`mdc-list ${mobile ? 'mdc-simple-menu__items' : ''}`}>
        <style jsx>{`
          .input-hiddden {
            display: none;
          }
        `}</style>
        <li data-action="select-product" className="mdc-list-item list-item">
          <ShirtIcon />
          <button onClick={this.selectProduct} ref={(r) => { this.selectProductBtn = r; }} className="icon-button">
            选择产品
          </button>
        </li>
        <li data-action="select-design" className="mdc-list-item list-item">
          <i className="material-icons" aria-hidden="true">collections</i>
          <button onClick={this.handleSelectPicture} className="icon-button">
            选择设计
          </button>
        </li>
        <li data-action="add-text" className="mdc-list-item list-item">
          <i className="material-icons" aria-hidden="true">text_fields</i>
          <button onClick={this.handleAddText} className="icon-button">
            添加文字
          </button>
        </li>
        <li data-action="upload-pic" className="mdc-list-item list-item">
          <input className="input-hiddden" type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
          <i className="material-icons">file_upload</i>
          <button onClick={this.handleOpenFileUploadDialog} className="icon-button">
            上传图片
          </button>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        <style jsx>{`
          i {
            display: inline-table;
            vertical-align: middle;
          }
          .list-item {
            margin-bottom: 10px;
          }
          .menu-button {
            background: none;
            border: none;
            width: 24px;
            height: 24px;
            padding: 0;
            margin: 0;
            margin-right: 24px;
            box-sizing: border-box;
          }

          @media (max-width: 599px) {
            .desktop-menu {
              display: none;
            }
          }
          @media (min-width: 600px) {
            .mobile-menu {
              display: none;
            }
          }

        `}</style>
        <SelectPictureModal
          onSelect={this.handleSelect}
          onClose={this.handleClosePictureModal}
          open={this.state.isSelectPicModalOpen}
        />
        <AddTextModal open={this.state.isAddTextModalOpen} onClose={this.handleCloseAddTextModal} />
        <div className="desktop-menu">
          { this.renderMenu(false) }
        </div>
        <div className="mobile-menu">
          <button onClick={this.toggleMenu} className="menu-button material-icons">menu</button>
          <div className="mdc-simple-menu" tabIndex="-1" ref={(r) => { this.menuDom = r; }}>
            { this.renderMenu(true) }
          </div>
        </div>
      </div>
    );
  }
}
