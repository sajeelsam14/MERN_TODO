import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Nav from "../components/Nav";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Pagination,
  Alert,
} from "react-bootstrap";
const Home = () => {
  let userDataJSON = localStorage.getItem("userData");
  let user;
  userDataJSON
    ? (user = JSON.parse(userDataJSON))
    : (user = {
        "._id": "",
      });

  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [skip, setskip] = useState(0);
  const [length, setlength] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 3;
  const totalPages = Math.ceil(length.length / itemsPerPage);
  useEffect(() => {
    const config = {
      headers: {
        userid: user._id,
      },
    };
    const fetchData = async () => {
      fetch("/data/todo", config)
        .then((res) => res.json())
        .then((data) => setlength(data))
        .catch((err) => console.log(err));
      setLoading(true);
      try {
        setLoading(true);
        setData([]);
        const { data } = await axios.get(`/data?skip=${skip}`, config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [skip, message]);
  const handleDelete = async (d) => {
    setMessage("");
    setLoading(true);
    await axios
      .delete(`/data/${d}`)
      .then((res) => {
        setMessage(res.data.message);
        setLoading(false);
        setShow(true);
      })
      .catch((err) => {
        setMessage(response.data.message);
        setLoading(false);
      });
  };
  const handlePaginationClick = (pageNumber) => {
    const newSkip = (pageNumber - 1) * itemsPerPage;
    setskip(newSkip, Data);
  };

  return (
    <React.Fragment>
      <Nav />
      <Container>
        {show && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <p>{message}</p>
          </Alert>
        )}
        <Table className="Table">
          <thead>
            <tr className="row">
              <th className="col-lg-6">Taks</th>
              <th className="col-lg-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Loading && <Loader />}
            {error && <Error children={error} />}
            {Data &&
              Data.map((d) => (
                <tr key={d._id} className="row">
                  <td className="col-lg-5">{d.task}</td>

                  <td className="col-lg-5">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(d._id)}
                    >
                      Delete ❌
                    </Button>
                    <Button
                      variant="outline-info"
                      className="ms-3"
                      onClick={() => navigate(`/data/${d._id}`)}
                    >
                      Edit 📝
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <Pagination className="pagination d-flex justify-content-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            onClick={() => handlePaginationClick(index + 1)}
            active={skip === index * itemsPerPage}
          >
            <span className="p-3">{index + 1}</span>
          </Pagination.Item>
        ))}
      </Pagination>
    </React.Fragment>
  );
};

export default Home;
