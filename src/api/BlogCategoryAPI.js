import axios from "axios";
import { useEffect, useState } from "react";

function BlogCategoryAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/blog_cetegory");
    setCategories(res.data.categories);
  };
  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    blogCategories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default BlogCategoryAPI;
