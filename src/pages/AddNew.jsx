import axios from "axios";
import * as React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/API";

const AddNew = () => {
  const [form, setForm] = React.useState();
  const [penampung, setPenampung] = React.useState();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitpublish = async (e) => {
    try {
      e.preventDefault();
      const field = {
        title: form.title,
        content: form.content,
        category: form.category,
        status: "publish",
      };
      await API.post("/article", field);

      toast.success("Success created with statush publish");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitdraft = async (e) => {
    try {
      e.preventDefault();
      const field = {
        title: form.title,
        content: form.content,
        category: form.category,
        status: "draft",
      };
      await API.post("/article", field);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content">
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Enter category"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              name="content"
              as="textarea"
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
  );
};

export default AddNew;
