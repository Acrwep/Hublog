import React, { useState, useMemo } from "react";
import { Row, Col, Divider, Spin } from "antd";
import "../styles.css";
import Loader from "../../Common/Loader";
import { getCategories, updateProductivity } from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import { useDispatch, useSelector } from "react-redux";
import { storeCategories } from "../../Redux/slice";

export default function Categories({ loading }) {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);
  const [updateLoading, setUpdateLoading] = useState(false);

  const getCategoryData = async () => {
    try {
      const response = await getCategories();
      const categoriesList = response?.data;
      dispatch(storeCategories(categoriesList));
    } catch (error) {
      dispatch(storeCategories([]));
    } finally {
      setTimeout(() => {
        setUpdateLoading(false);
      }, 350);
    }
  };

  const handleProductive = async (categoryId) => {
    setUpdateLoading(true);
    try {
      const response = await updateProductivity(categoryId, 1);
      CommonToaster("Category updated", "success");
    } catch (error) {
      console.log("update productivity error", error);
      CommonToaster("Category update failed", "error");
    } finally {
      setTimeout(() => {
        getCategoryData();
      }, 350);
    }
  };

  const handleNeutral = async (categoryId) => {
    setUpdateLoading(true);
    try {
      const response = await updateProductivity(categoryId, 2);
      CommonToaster("Category updated", "success");
    } catch (error) {
      console.log("update productivity error", error);
      CommonToaster("Category update failed", "error");
    } finally {
      setTimeout(() => {
        getCategoryData();
      }, 350);
    }
  };

  const handleUnproductive = async (categoryId) => {
    setUpdateLoading(true);
    try {
      const response = await updateProductivity(categoryId, 3);
      CommonToaster("Category updated", "success");
    } catch (error) {
      console.log("update productivity error", error);
      CommonToaster("Category update failed", "error");
    } finally {
      setTimeout(() => {
        getCategoryData();
      }, 350);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="productivityrules_categoryContainer"
          style={{ opacity: updateLoading ? "0.7" : "1" }}
        >
          <Divider style={{ margin: "0" }} />
          {categoriesList.map((item) => (
            <React.Fragment>
              <Row className="category_nameContainer">
                <Col xs={24} sm={24} lg={12} xl={12}>
                  <p style={{ fontWeight: "600" }}>{item.categoryName}</p>
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
                      {item.productivityId === 1 ? (
                        <button className="category_activeproductivebutton">
                          <p className="category_productivebuttontext">
                            Productive
                          </p>
                        </button>
                      ) : (
                        <button
                          className="category_productivebutton"
                          onClick={() => handleProductive(item.categoryId)}
                        >
                          <p className="category_productivebuttontext">
                            Productive
                          </p>
                        </button>
                      )}
                    </Col>
                    <Col span={8}>
                      {item.productivityId === 2 ? (
                        <button className="category_neutralproductivebutton">
                          <p className="category_productivebuttontext">
                            Neutral
                          </p>
                        </button>
                      ) : (
                        <button
                          className="category_productivebutton"
                          onClick={() => handleNeutral(item.categoryId)}
                        >
                          <p className="category_productivebuttontext">
                            Neutral
                          </p>
                        </button>
                      )}
                    </Col>
                    <Col span={8}>
                      {item.productivityId === 3 ? (
                        <button className="category_unproductivebutton">
                          <p className="category_productivebuttontext">
                            Unproductive
                          </p>
                        </button>
                      ) : (
                        <button
                          className="category_productivebutton"
                          onClick={() => handleUnproductive(item.categoryId)}
                        >
                          <p className="category_productivebuttontext">
                            Unproductive
                          </p>
                        </button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Divider style={{ margin: "0", marginTop: "12px" }} />
            </React.Fragment>
          ))}
          {updateLoading ? (
            <div className="settingsproductivity_spinContainer">
              <Spin />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
