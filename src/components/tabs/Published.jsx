import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "react-query";
import { API } from "../../config/API";
import { useNavigate } from "react-router-dom";

let test = [];

const Published = () => {
  const navigate = useNavigate();
  const [paginationLimit, setPaginationLimit] = React.useState(3);
  const [paginationOffset, setPaginationOffset] = React.useState(0);
  const [currentPagination, setCurrentPagination] = React.useState(0);
  const [paginationLength, setPaginationLength] = React.useState(1);
  // const [test, setTest] = React.useState([0]);

  let {
    data: publish,
    refetch,
    isLoading,
  } = useQuery("publishCache", async () => {
    const response = await API.get(
      `http://localhost:8000/api/v1/articles/${paginationLimit}/${paginationOffset}`
    );
    return response.data.data;
  });

  function handlePagination(current) {
    if (currentPagination <= current) {
      console.log("tambah", current + paginationLimit);
      setPaginationOffset(current + paginationLimit);
    } else {
      console.log("kurang", current - paginationLimit);
      setPaginationOffset(current - paginationLimit);
    }
    refetch();
  }

  async function testttt() {
    const response = await API.get(`http://localhost:8000/api/v1/articles`);
    // console.log(Math.floor(response.data.data.length / paginationLimit) + 1);
    for (
      let x = 1;
      x <= Math.floor(response.data.data.length / paginationLimit) + 1;
      x++
    ) {
      console.log(x);
      test.push(x);
      test = [...new Set(test)];
    }
  }

  React.useEffect(() => {
    refetch();
    testttt();
  }, [paginationLimit, paginationOffset, isLoading]);

  return (
    <>
      {isLoading ? null : (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {publish?.map((item, index) => {
                return (
                  <tr key={index.toString()}>
                    <td className="text-center">{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-lg-2 mb-md-2 me-0 mb-lg-0 mb-md-0 mb-2"
                      >
                        <BsPencilSquare />
                      </Button>
                      <Button variant="danger" size="sm">
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* bikin map sama logic */}
          </Table>
          {test?.map((item, index) => (
            <Button
              onClick={() => handlePagination(item)}
              key={index.toString()}
            >
              {item}
            </Button>
          ))}
          <button onClick={() => console.log(test)}></button>
        </div>
      )}
    </>
  );
};

export default Published;
