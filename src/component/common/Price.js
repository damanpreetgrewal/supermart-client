import React from 'react';

const Discount = ({ product, card }) => {
  return (
    <div className="font-serif product-price font-bold">
      {product.discount ? (
        <span
          className={
            card
              ? 'inline-block text-lg font-semibold text-gray-800'
              : 'inline-block text-2xl'
          }
        >
          ${product.price}
        </span>
      ) : (
        <span
          className={
            card
              ? 'inline-block text-lg font-semibold text-gray-800'
              : 'inline-block text-2xl'
          }
        >
          ${product.originalPrice}
        </span>
      )}
      {product.discount ? (
        <del
          className={
            card
              ? 'sm:text-sm font-normal text-base text-gray-400 ml-1'
              : 'text-lg font-normal text-gray-400 ml-1'
          }
        >
          ${product.originalPrice}
        </del>
      ) : null}
    </div>
  );
};

export default Discount;
