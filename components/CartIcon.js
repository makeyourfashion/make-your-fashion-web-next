import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

function CartIcon({ cartStore }) {
  return (
    <div className="wrapper">
      <style jsx>{`
        .cart-icon {
          position: relative;
          padding-right: 10px;
        }
        .badge {
          position: absolute;
          right: 10px;
          top: -10px;
          width: 17px;
          height: 17px;
          background-color: #ff5a5f;
          border-radius: 50%;
          color: white;
          font-size: 12px;
          font-weight: 500;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <Link href="/cart">
        <a>
          <div className="cart-icon">
            <i className="material-icons icon-button">shopping_cart</i>
            <div className="badge">{cartStore.numOfItems}</div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default inject('cartStore')(observer(CartIcon));
