import { readExcelFile, getCategoriesFromExcel } from "./utils/excel";
import HomeClient from "./_components/HomeClient";

export default async function Home() {
  let excelData = [];
  let categories = [];

  try {
    excelData = await readExcelFile();
    categories = await getCategoriesFromExcel();
  } catch (error) {
    console.error("Excel Read Error:", error);
  }

  // Group products
  const groupedByPage = excelData.reduce((acc, item) => {
    const page = item.page || "unknown";
    (acc[page] ||= []).push(item);
    return acc;
  }, {});

  return (
    <HomeClient
      excelData={excelData}
      page1={groupedByPage["1"] || []}
      page2={groupedByPage["2"] || []}
      page3={groupedByPage["3"] || []}
      categories={categories}
    />
  );
}
