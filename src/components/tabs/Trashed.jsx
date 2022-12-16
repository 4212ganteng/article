import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "react-query";
import { API } from "../../config/API";
import { useNavigate } from "react-router";

const Trashed = () => {
  const navigate = useNavigate();

  let no = 1;
  let {
    data: thrash,
    refetch,
    isLoading,
  } = useQuery("trashCache", async () => {
    const response = await API.get("/articles");
    return response.data.data.filter((p) => p.status === "thrash");
  });

  React.useEffect(() => {
    refetch();
    thrash;
  }, []);

  return (
    <>
      {isLoading ? null : (
        <div>
          {thrash?.length != 0 ? (
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
                {thrash?.map((item, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td className="text-center">{no++}</td>
                      <td>Lorem ipsum dolor sit amet</td>
                      <td>Lorem</td>
                      <td className="text-center">
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-lg-2 me-md-2 me-0 mb-lg-0 mb-md-0 mb-2"
                        >
                          <BsPencilSquare
                            onClick={() => navigate(`/edit/${item.id}`)}
                          />
                        </Button>
                        <Button variant="danger" size="sm">
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>No data on Trashed</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Trashed;
