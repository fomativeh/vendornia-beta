export const findFirstImageForCategory = (products: any, category: string) => {
    for (const product of products) {
      if (product.category === category) {
        if (product.images.length > 0) {
          return product.images[0]; // Return the first image for the category
        }
        return product.images; // Return the only image for the category
      }
    }
  };