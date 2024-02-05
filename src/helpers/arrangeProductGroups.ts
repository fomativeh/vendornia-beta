import { Dispatch } from "react";
export const arrangeProductGroups = (
  products: any,
  setProductGroups: Dispatch<any>,
  setUncategorized: Dispatch<any>
) => {
  const allProductGroups: any = [];
  const uncategorizedGroups: any = [];

  // Iterate through each product in the products array
  products?.forEach((product: any) => {
    // Check if the product's category already exists in allProductGroups
    const categoryIndex = allProductGroups.findIndex(
      (group: any) => group.category === product.category
    );

    if (categoryIndex === -1) {
      // If the category doesn't exist, create a new group
      allProductGroups.push({
        category: product.category,
        products: [product],
      });
    } else {
      // If the category already exists, add the product to that group
      allProductGroups[categoryIndex].products.push(product);
    }
  });

  // Filter out groups with only one product
  allProductGroups.forEach((group: any) => {
    if (group.products.length <= 1) {
      uncategorizedGroups.push(...group.products);
    }
  });

  // Filter out groups with only one product and move them to the uncategorized array
  const filteredGroups = allProductGroups.filter(
    (group: any) => group.products.length > 1
  );

  // Set the filtered product groups
  setProductGroups(filteredGroups);

  // Set the uncategorized groups as an array of products
  setUncategorized(uncategorizedGroups);
};

  