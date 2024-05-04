import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  create,
  deletet,
  findAll,
  update,
} from "../../../service/ProductService";
import {
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [data, setData] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({});

  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    formUpdate.resetFields();
    setIsEditModalOpen(false);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "tenSanPham",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === 1 ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="blue">Không hoạt động</Tag>
        ),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>
            <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const showEditModal = (record) => {
    formUpdate.setFieldsValue({ id: record.id, name: record.name });
    setIsEditModalOpen(true);
  };

  const handleEditCancelX = () => {
    formUpdate.resetFields();
    setIsEditModalOpen(false);
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa màu này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await deletet(record.id);
          toast.success("Xóa thành công!");
          loadTable();
        } catch (error) {
          console.error("Lỗi khi xóa màu: ", error);
          toast.error("Xóa thất bại.");
        }
      },
      onCancel: () => {},
    });
  };
  //Hiện list danh sách lên
  const loadTable = async () => {
    try {
      const response = await findAll();
      setData(response.data.data.list);
      setTotalPage(response.data.total);
      console.log(response.data.data.list);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
  };
  useEffect(() => {
    loadTable();
  }, []);
  const handleAdd = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn thêm màu mới?",
      okText: "OK",
      okType: "danger",
      cancelText: "Đóng",
      onOk: async () => {
        try {
          const values = await form.validateFields();
          // values.name = values.name.trim().replace(/\s+/g, " ");

          const response = await create(values);
          console.log(response);
          setIsModalOpen(false);
          toast.success("Thêm mới thành công!");
          loadTable();
          form.resetFields();
        } catch (error) {
          console.error("Lỗi khi tạo màu: ", error);
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
            return;
          } else {
            toast.error("Thêm mới thất bại.");
          }
        }
      },
      onCancel: () => {},
    });
  };
  const handleUpdate = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn cập nhập màu không?",
      okText: "OK",
      okType: "danger",
      cancelText: "Đóng",
      onOk: async () => {
        try {
          const values = await formUpdate.validateFields();
          console.log(values);
          const response = await update(values);
          console.log(response);
          setIsEditModalOpen(false);

          toast.success("Cập nhật thành công!");
          loadTable();
        } catch (error) {
          console.error("Lỗi khi cập nhật màu: ", error);
          if (error.response.data.code === 300) {
            toast.error(error.response.data.message);
            return;
          } else {
            toast.error("Cập nhập thất bại.");
          }
        }
      },

      onCancel: () => {},
    });
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        title="Cập nhật màu"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        onOk={handleUpdate}
      >
        <Form form={formUpdate} name="editForm" initialValues={editFormData}>
          <Form.Item name="id" hidden>
            <Input value={editFormData?.id} />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="name"
            style={{ width: "360px", marginLeft: "40px" }}
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input value={editFormData?.name} placeholder="Tên" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm màu"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleAdd}
      >
        <Form onFinish={handleAdd} form={form} onF>
          <Form.Item
            label="Tên"
            name="name"
            style={{ width: "360px", marginLeft: "40px" }}
            rules={[{ required: true, message: "Tên không được để trống!" }]}
          >
            <Input placeholder="Tên" />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        // onClick={handleAdd}
        type="primary"
        onClick={showModal}
        style={{
          marginBottom: 16,
        }}
      >
        Thêm
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        key={data.id}
        pagination={{
          pageSize: 5,
          total: totalPage,
        }}
      />
    </div>
  );
};

export default Product;
