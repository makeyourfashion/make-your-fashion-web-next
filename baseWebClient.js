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
};
