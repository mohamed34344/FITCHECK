import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {

    const allOrders = JSON.parse(localStorage.getItem('orders_history')) || [];

    if (user?.email) {

      const filtered = allOrders.filter(
        (order) => order.userEmail?.toLowerCase() === user.email.toLowerCase()
      );
      setUserOrders(filtered);
    } else {
      setUserOrders([]);
    }
  }, [user]);

  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Order History</h3>
          <p className="text-muted small mb-0">
            Track and manage orders for: <strong className="text-dark">{user?.email}</strong>
          </p>
        </div>
        <Link to="/profile" className="btn btn-outline-dark rounded-pill px-3 btn-sm">
          <i className="bi bi-arrow-left me-1"></i> Back to Profile
        </Link>
      </div>

      {userOrders.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-4 text-center p-5">
          <div className="py-4">
            <i className="bi bi-bag-x text-muted display-4 mb-3 d-block"></i>
            <h5 className="fw-bold">No orders found for this account</h5>
            <p className="text-muted">You haven't placed any orders yet using this email address.</p>
            <Link to="/products" className="btn btn-dark rounded-pill px-4 mt-2">
              Start Shopping
            </Link>
          </div>
        </Card>
      ) : (
        <div className="d-flex flex-column gap-4">
          {userOrders.map((order, index) => (
            <Card key={order.id || index} className="border-0 shadow-sm rounded-4 p-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-3 mb-3 border-bottom">
                <div>
                  <span className="fw-bold text-dark fs-5">Order #{order.id || index + 1}</span>
                  <div className="text-muted small">
                    Date: {order.date || new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="success" className="px-3 py-2 rounded-pill fw-normal">
                    {order.status || 'Completed'}
                  </Badge>
                  <span className="fw-bold text-dark fs-5 ms-2">${order.totalAmount || order.total || 0}</span>
                </div>
              </div>

   
              <Table responsive borderless align="middle" className="mb-0">
                <thead className="table-light rounded-3">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title || item.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded-3"
                            />
                          )}
                          <div>
                            <div className="fw-semibold text-dark">{item.title || item.name}</div>
                            {item.size && <small className="text-muted">Size: {item.size}</small>}
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>x{item.quantity || item.count || 1}</td>
                      <td className="text-end fw-semibold">
                        ${(item.price * (item.quantity || item.count || 1)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;