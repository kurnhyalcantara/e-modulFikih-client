import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (token) {
      const getStudent = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            "https://api-fikih-mts-bontouse.herokuapp.com/api/student/profile",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          setList(res.data.student.enrolled);
          setUser(res.data.student);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getStudent();
    }
  }, [token]);

  const addList = (tokenCourse, course) => {
    return new Promise((resolve, reject) => {
      const check = list.every((item) => {
        return item?.courseDetails?._id !== course.courseDetails._id;
      });
      if (check) {
        setList([...list, { ...course }]);
        axios
          .patch(
            `https://api-fikih-mts-bontouse.herokuapp.com/api/course/enroll/${course.courseDetails._id}`,
            { enrolled: [...list, { ...course }], token: tokenCourse },
            {
              headers: { Authorization: token },
            }
          )
          .then(() => {
            resolve("Successfully Enrolled");
          })
          .catch((err) => {
            reject(err.response.data.msg);
          });
      }
    });
  };

  return {
    isLogged: [isLogged, setIsLogged],
    callback: [callback, setCallback],
    user: [user, setUser],
    loading: [loading, setLoading],
    addList: addList,
    list: [list, setList],
  };
}

export default UserAPI;
