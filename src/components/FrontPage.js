import React, { useState, useEffect } from "react";
import { useAuth } from "@frontegg/react";
import "./FrontPage.css";
import ImgMediaCard from "./ImgMediaCard";
import proper from "../helper/proper";
import OrdersTable from "./OrdersTable";

const CustomerTable = ({ portno }) => {
  const { user, isAuthenticated } = useAuth();
  const [productList, setProductList] = useState([]);
  const [bestSellingItem, setBestSellingItem] = useState([]);
  const [orders, setOrders] = useState([]);
  const [largestOrder, setLargestOrder] = useState([]);
  const [isDisplayTable, setToggleButtton] = useState(false);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    var url = "http://localhost:" + portno + "/getAllShopItems";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        setProductList(responseJSON);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    var url = "http://localhost:" + portno + "/bestSellingItem";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        setBestSellingItem(responseJSON);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    getLargestBuyHandler();
  }, []);

  const queryCustomerOrders = () => {
    // const response =  fetch(url);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const data = response.json();
    // const rows = data.map((element) => {
    //   return element;
    // });
    // setOrders(rows);
    var url = `http://localhost:${portno}/customer/all?cEmail=${user?.email}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const rows = data.map((element) => {
          return element;
        });
        setOrders(rows);
      })
      .catch((error) => console.log("error", error));
  };

  const getLargestBuyHandler = () => {
    var url = `http://localhost:${portno}/largestBuy?cEmail=${user?.email}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLargestOrder(data[0]);
      })
      .catch((error) => console.log("error", error));
  };

  //display all the shop orders of the customer with
  //1. customer name
  //2. item name
  //3. item quantity
  //4. shipping date
  let showTable = <p></p>;
  if (isDisplayTable) {
    showTable = <OrdersTable customer_orders={orders} />;
  } else {
    setOrders(0);
    setToggleButtton(true);
  }
  let content = showTable;
  const queryHandlerToggle = () => {
    if (isDisplayTable) queryCustomerOrders();
    else {
      setOrders(0);
      setToggleButtton(true);
    }
  };

  return (
    <div className='Page'>
      <div className='Welcome'>
        <h2>Welcome back, {proper(user?.name)}</h2>
        <button onClick={queryHandlerToggle}>Show order history</button>
      </div>
      <div>
        {/* {orders} */}

        {/* {console.log(orders)} */}
        {content}
      </div>
      <div>
        <h2>Largest order for {proper(user?.name)}</h2>
        <ImgMediaCard order={largestOrder} />
      </div>
      <div>
        <h2>Best Selling phone in the shop</h2>
        {bestSellingItem.map((products) => (
          <li key={products.id}>
            Phone Model: {products.name}, Price: ${products.price}
          </li>
        ))}
      </div>
      <div className='Products-list'>
        <h2>Phones for sale</h2>
        <ul>
          {productList.map((products) => (
            <li key={products.id}>
              Phone Model: {products.name}, price: {products.price}
              <button>Purchase</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerTable;
