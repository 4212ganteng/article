import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/API";

const Previeww = () => {
  const [form, setForm] = React.useState();
  const { id } = useParams();
  let no = 1;
  const navigate = useNavigate();
  let { data: draft, isLoading } = useQuery("previewCache", async () => {
    const response = await API.get("/articles");
    return response.data.data.filter((p) => p.status === "publish");
  });

  // update to trash

  const handleSubmitrash = async (a) => {
    try {
      // Store data with FormData as object
      const field = {
        status: "thrash",
      };

      // Insert product data
      const response = await API.patch(`/article/${a}`, field);

      console.log("ini data updated", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-5" style={{ marginTop: "200" }}>
      <div className="m-5"></div>
      {isLoading ? null : (
        <div className="container">
          {draft?.length != 0 ? (
            <Table striped bordered hover size="sm" className="mt-5">
              <thead>
                <tr className="text-center mt-5">
                  <th>No</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {draft?.map((item, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td className="text-center">{no++}</td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
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
                          <BsTrash onClick={(a) => handleSubmitrash(item.id)} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>No data on publish</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Previeww;
