import { findFirstImageForCategory } from "./findFirstImageForCategory";
export const arrangeCollections = (products: any) => {
  const productsAndCategories: any = [];
  products?.forEach((eachProduct: any) => {
    if (productsAndCategories.some((item: any) => item.categoryName === eachProduct.category)) {
      productsAndCategories.forEach((eachItem: any) => {
        if (eachItem.categoryName === eachProduct.category) {
          eachItem.products.push(eachProduct);
        }
      });
    } else {
      productsAndCategories.push({ categoryName: eachProduct.category, products: [eachProduct] });
    }
  });

  let categoryNames: any = [];

  products?.forEach((product: any) => {
    if (!categoryNames.some((category: any) => category.category === product.category)) {
      categoryNames.push({
        category: product.category,
        categoryImage: findFirstImageForCategory(products, product.category),
      });
    }
  });

  // Filter out categories with fewer than two products
  categoryNames = categoryNames.filter((categoryName: any) => {
    const categoryProducts = productsAndCategories.find((item: any) => item.categoryName === categoryName.category);
    return categoryProducts?.products.length > 1;
  });

  return categoryNames;
};
