"use server";

import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export const readExcelFile = async () => {
  try {
    const filePath = path.join(process.cwd(), "public", "products.xlsx");
    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};

export const getCategoriesFromExcel = async () => {
  try {
    const products = await readExcelFile();
    
    // Extract unique categories
    const categoriesMap = new Map();
    
    products.forEach((product) => {
      if (product.category && product.category.trim()) {
        const categoryName = product.category.trim();
        if (!categoriesMap.has(categoryName)) {
          // Create slug from category name
          const slug = categoryName
            .toLowerCase()
            .replace(/&/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          // Use the product's image for category display
          const image = product.category_img 
          
          categoriesMap.set(categoryName, {
            name: categoryName,
            slug: slug,
            image: image,
          });
        }
      }
    });
    
    const categoryList = Array.from(categoriesMap.values());
    return categoryList;
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};
