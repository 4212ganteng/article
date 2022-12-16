import axios from "axios";
import * as React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/API";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  // console.log(params);
  const navigate = useNavigate();

  const [form, setForm] = React.useState();

  const { data: article, isLoading } = useQuery("articleCache", async () => {
    const response = await API.get(`/article/${id}`);
    console.log(response);
    return response.data.data;
  });
  React.useEffect(() => {
    if (article) {
      setForm({
        ...form,

        title: article.title,
        content: article.content,
        category: article.category,
        status: "publish",
      });
    }
  }, [article]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitpublish = async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const field = {
        title: form.title,
        content: form.content,
        category: form.category,
        status: "publish",
      };

      // Insert product data
      const response = await API.patch("/article/" + id, field);

      console.log("ini data updated", response.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitdraft = async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const field = {
        title: form.title,
        content: form.content,
        category: form.category,
        status: "draft",
      };

      // Insert product data
      const response = await API.patch("/article/" + id, field);

      console.log("ini data updated", response.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? null : (
        <div className="content">
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form?.title}
                  placeholder="Enter title"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={form?.category}
                  placeholder="Enter category"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  name="content"
                  as="textarea"
                  value={form?.content}
                  rows={5}
                  placeholder="Type content here"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="button me-3"
                onClick={handleSubmitpublish}
              >
                Publish
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="button"
                onClick={handleSubmitdraft}
              >
                Draft
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </>
  );
};

export default Edit;
