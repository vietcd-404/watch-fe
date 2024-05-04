import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    AppstoreOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const menus = [
    {
        key: "1",
        label: <Link to="/">Tổng quan</Link>,
        icon: <HomeOutlined />
    },
    {
        label: "Thuộc tính",
        key: "2",
        icon: <AppstoreOutlined />,
        children: [
            { label: <Link to="/product">Sản phẩm</Link>, key: "3", icon: <VideoCameraOutlined/> },
            { label: "Tên sản phẩm", key: "/product", icon: <UploadOutlined/> }
        ]
    },
]
export default menus;