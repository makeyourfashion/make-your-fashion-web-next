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
