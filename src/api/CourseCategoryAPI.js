import { useEffect, useState } from "react";
import axios from "axios";

function CourseCategoriesAPI() {
  const [category, setCategory] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/course_cetegory/");
    setCategory(res.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    category: [category, setCategory],
    callback: [callback, setCallback],
  };
}

export default CourseCategoriesAPI;
