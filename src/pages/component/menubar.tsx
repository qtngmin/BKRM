import React, {
  Component,
  ReactComponentElement,
  useEffect,
  useState,
} from "react";
import "./component.css";
import {
  Navigate,
  Link,
  Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as Logo } from "../../icon/appLogo.svg";
import { ReactComponent as IconTongquan } from "../../icon/menu-tongquan.svg";
import { ReactComponent as IconHanghoa } from "../../icon/menu-hanghoa.svg";
import { ReactComponent as IconGiaodich } from "../../icon/menu-giaodich.svg";
import { ReactComponent as IconDoitac } from "../../icon/menu-doitac.svg";
import { ReactComponent as IconNV } from "../../icon/menu-nhanvien.svg";
import { ReactComponent as IconKhuyenmai } from "../../icon/menu-khuyenmai.svg";
import { ReactComponent as IconBaocao } from "../../icon/menu-baocao.svg";
import { ReactComponent as IconLogout } from "../../icon/logout.svg";
import { ReactComponent as IconTransIn } from "../../icon/trans-in.svg";
import { ReactComponent as IconTransOut } from "../../icon/trans-out.svg";
import { ReactComponent as IconTransInActive } from "../../icon/trans-in-active.svg";
import { ReactComponent as IconTransOutActive } from "../../icon/trans-out-active.svg";

import { Account } from "./account";

type menuState = [
  {
    title: string;
    icon: Component;
    iconActive?: Component;
    linkto: string;
    status: boolean;
    children?: HTMLElement; 
  }
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuHover, setMenuHover] = useState<string>();

  const menuList = [
    {
      title: "Tổng quan",
      icon: <IconTongquan />,
      linkto: "tongquan",
      status: location.pathname.includes("tongquan"),
    },
    {
      title: "Hàng hóa",
      icon: <IconHanghoa />,
      linkto: "hanghoa/",
      status: location.pathname.includes("hanghoa"),
    },
    {
      title: "Giao dịch",
      icon: <IconGiaodich />,
      linkto: "giaodich",
      status: location.pathname.includes("giaodich"),
      children: [
        {
          title: "Nhập hàng",
          icon: <IconTransIn />,
          iconActive: <IconTransInActive />,
          linkto: "giaodich/nhap",
          status: location.pathname.includes("giaodich/nhap"),
        },
        {
          title: "Xuất hàng",
          icon: <IconTransOut />,
          iconActive: <IconTransOutActive />,
          linkto: "giaodich/xuat",
          status: location.pathname.includes("giaodich/xuat"),
        },
      ],
    },
    {
      title: "Đối tác",
      icon: <IconDoitac />,
      linkto: "doitac",
      status: location.pathname.includes("doitac"),
    },
    {
      title: "Nhân viên",
      icon: <IconNV />,
      linkto: "nhanvien",
      status: location.pathname.includes("nhanvien"),
    },
    {
      title: "Khuyến mãi",
      icon: <IconKhuyenmai />,
      linkto: "khuyenmai",
      status: location.pathname.includes("khuyenmai"),
    },
    {
      title: "Báo cáo",
      icon: <IconBaocao />,
      linkto: "baocao",
      status: location.pathname.includes("baocao"),
    },
  ];

  return (
    <header className="navbar">
      <div className="navbar__title navbar__item">
        <Logo />
      </div>
      {menuList.map((item) => (
        <div
          className={`navbar__menu ${item.status && "navbar__menu_active"}`}
          onMouseEnter={() => {
            item.children &&
              item.children.length > 0 &&
              setMenuHover(item.title);
          }}
          onMouseLeave={() => {
            menuHover && setMenuHover(undefined);
          }}
        >
          <div
            className={"navbar__item"}
            onClick={() => {!item.children && navigate(item.linkto)}}
          >
            {item.icon} {item.title}
          </div>
          {menuHover === item.title && (
            <div className="menu-child">
              {item.children?.map((chil, index) => (
                <div key={index} onClick={() => navigate(chil.linkto)} className={`child-element ${chil.status && 'child-element-active'}`}>
                  {chil.status ? chil.iconActive : chil.icon} {chil.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/*<Account/>*/}
      <div className="account-container">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M46.757 45.0264C44.1672 40.5264 39.3039 37.5029 33.7492 37.5029L26.2492 37.5029C20.6945 37.5029 15.8312 40.5264 13.2414 45.0264C17.3664 49.6201 23.343 52.5029 29.9992 52.5029C36.6555 52.5029 42.632 49.6084 46.757 45.0264ZM-0.000793458 30.0029C-0.000793457 22.0464 3.15991 14.4158 8.786 8.78973C14.4121 3.16364 22.0427 0.00292969 29.9992 0.00292969C37.9557 0.00292969 45.5863 3.16364 51.2124 8.78973C56.8385 14.4158 59.9992 22.0464 59.9992 30.0029C59.9992 37.9594 56.8385 45.59 51.2124 51.2161C45.5863 56.8422 37.9557 60.0029 29.9992 60.0029C22.0427 60.0029 14.4121 56.8422 8.786 51.2161C3.15991 45.59 -0.000793458 37.9594 -0.000793458 30.0029ZM29.9992 31.8779C32.237 31.8779 34.3831 30.989 35.9654 29.4066C37.5478 27.8243 38.4367 25.6782 38.4367 23.4404C38.4367 21.2027 37.5478 19.0566 35.9654 17.4742C34.3831 15.8919 32.237 15.0029 29.9992 15.0029C27.7614 15.0029 25.6153 15.8919 24.033 17.4742C22.4507 19.0566 21.5617 21.2027 21.5617 23.4404C21.5617 25.6782 22.4507 27.8243 24.033 29.4066C25.6153 30.989 27.7614 31.8779 29.9992 31.8779Z"
            fill="white"
          />
        </svg>
        <div className="infor">
          {/*<h5>Tuan Nguyen</h5>
<h6>Free Account</h6>*/}
          <div>Tuan Nguyen</div>
          <div>Free Account</div>
        </div>
        <IconLogout />
      </div>
    </header>
  );
}
