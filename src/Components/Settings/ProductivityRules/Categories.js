import React from "react";
import { Row, Col, Divider } from "antd";
import "../styles.css";

export default function Categories() {
  const categories = [
    { id: 1, name: "Analytics", type: 1 },
    { id: 2, name: "Banking & Finance", type: 2 },
  ];
  return (
    <div className="productivityrules_categoryContainer">
      <Divider style={{ margin: "0" }} />
      {categories.map((item) => (
        <React.Fragment>
          {/* <div className="productivityrules_categoryContainer"> */}
          <Row style={{ marginTop: "12px" }}>
            <Col
              xs={24}
              sm={24}
              lg={12}
              xl={12}
              className="category_nameContainer"
            >
              <p style={{ fontWeight: "600" }}>{item.name}</p>
            </Col>
            <Col
              xs={24}
              sm={24}
              lg={12}
              xl={12}
              className="category_productivebuttonContainer"
            >
              <Row gutter={16}>
                <Col span={8}>
                  <button className="category_productivebutton">
                    <p className="category_productivebuttontext">Productive</p>
                  </button>
                </Col>
                <Col span={8}>
                  <button className="category_productivebutton">
                    <p className="category_productivebuttontext">Neutral</p>
                  </button>
                </Col>
                <Col span={8}>
                  <button className="category_productivebutton">
                    <p className="category_productivebuttontext">
                      Unproductive
                    </p>
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ margin: "0", marginTop: "12px" }} />
          {/* </div> */}
        </React.Fragment>
      ))}
    </div>
  );
}
