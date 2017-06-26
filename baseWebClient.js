/* global fetch */

require('isomorphic-fetch');

function getSpecs(catalogId) {
  return fetch(`http://59.110.141.38:9090/baseWeb/specs/${catalogId}`)
    .then(response => response.json())
    .then(products => products.map(product => ({
      id: product.id,
      name: product.title,
      des: product.des,
      imgUrl: product.baseUrl,
      category: product.catalogId,
      cost: product.cost,
    })));
}

function getHistories() {
  return [
    {
      products: [{
        id: 100,
        qty: 1,
        img: '/static/image/100.png',
        name: 'stephen curry 体恤',
      }, {
        id: 101,
        qty: 1,
        img: '/static/image/101.png',
        name: 'james harden 体恤',
      }],
      date: '2017年，6月 20日',
      status: '已发货',
      trackNumber: '123456789112',
      qty: 1,
      shipmentInfo: {
        address: '山东省 济南市 长清区 御龙湾小区 203楼',
        name: '和朴轩',
        phone: '13685312558',
      },
      paymentInfo: {
        price: 100,
        shipFee: 10,
        promotion: 20,
        total: 90,
      },
    }, {
      products: [{
        id: 100,
        qty: 2,
        img: '/static/image/100.png',
        name: 'stephen curry 体恤',
      }],
      date: '2017年，3月 13日',
      status: '已收货',
      trackNumber: '123456789112',
      qty: 1,
      shipmentInfo: {
        address: '山东省 济南市 长清区 御龙湾小区 203楼',
        name: '和朴轩',
        phone: '13685312558',
      },
      paymentInfo: {
        price: 120,
        shipFee: 10,
        promotion: 20,
        total: 110,
      },
    },
  ];
}

function getSpec(id) {
  return fetch(`http://59.110.141.38:9090/baseWeb/specs/spec/${id}`)
    .then(response => response.json())
    .then(product => ({
      id: product.baseSpec.id,
      name: product.baseSpec.title,
      des: product.baseSpec.des,
      sizes: product.baseSpec.sizes.split(','),
      category: product.baseSpec.catalogId,
      pics: product.defaultPics.map(pic => ({
        id: pic.id,
        type: pic.type,
        smallUrl: pic.smallUrl,
        midUrl: pic.midUrl,
        largeUrl: pic.largeUrl,
      })),
    }));
}

function getCatalog(id) {
  return fetch(`http://59.110.141.38:9090/baseWeb/catalogs/${id}`)
    .then(response => response.json())
    .then(catalogs => catalogs.map(catalog => ({
      id: catalog.id,
      name: catalog.name,
      isParent: catalog.isParent,
    })));
}

function getDesigns() {
  return getCatalog(100)
    .then(catalogs => Promise.all(catalogs.map(catalog => getSpecs(catalog.id)))
      .then(specs => catalogs.map((catalog, index) => ({
        id: catalog.id,
        name: catalog.name,
        designs: specs[index],
      }))));
}

function getProductsByCatalog(id) {
  return getCatalog(id)
    .then(categories => Promise.all(
      categories.map(
        category => getSpecs(category.id)
          .then(products => ({
            category,
            products,
          })))
    )).then(categoryList => categoryList.map(category => ({
      id: category.category.id,
      name: category.category.name,
      products: category.products,
    })));
}

module.exports = {
  getSpecs,
  getCatalog,
  getSpec,
  getDesigns,
  getProductsByCatalog,
  getHistories,
};
