import * as React from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { API } from "../../config/API";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

const Drafts = () => {
  let no = 1;
  const navigate = useNavigate();
  let {
    data: draft,
    refetch,
    isLoading,
  } = useQuery("draftCache", async () => {
    const response = await API.get("/articles");
    return response.data.data.filter((p) => p.status === "draft");
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

      navigate("/");
      console.log("ini data updated", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? null : (
        <div>
          {draft?.length != 0 ? (
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
                          <BsTrash onClick={() => handleSubmitrash(item.id)} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1>No data on Draft</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Drafts;
