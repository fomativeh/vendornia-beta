import { arrangedProductsType } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

//Groups products according to category(shoes, bags, etc)
export const arrangeProductsInGroups = (allProducts:any[], setArrangedProducts: Dispatch<SetStateAction<arrangedProductsType[]>>) => {
    let groupedItems: arrangedProductsType[] = [];

    allProducts.forEach((productToArrange) => {
        const existingGroup = groupedItems.find(
            (eachItem) => eachItem.category === productToArrange.category
        );

        if (existingGroup) {
            existingGroup.products.push(productToArrange);
        } else {
            groupedItems.push({
                category: productToArrange.category,
                products: [productToArrange],
            });
        }
    });

    setArrangedProducts(groupedItems);
};
