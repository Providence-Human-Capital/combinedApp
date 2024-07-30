import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../config";
import Loading from "../../components/Loading.jsx/Loading";
import OrderForm from "./forms/OrderForm";

const fetchDrugs = async () => {
  const { data } = await axios.get(`${API}/api/drug`); // Make sure this is the correct endpoint
  return data.data;
};

const Drugs = () => {
  const { data, error, isLoading } = useQuery("drugs", fetchDrugs);

  if (isLoading)
    return (
      <div className="content">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  if (error) return <div>Error fetching data</div>;

  const styles = {
    containerStyles: {
      minHeight: "60vh",
      overflow: "auto",
    },
  };

  return (
    <>
      <BreadCrumb title={"Drugs Management"} activeTab={"Drugs Management"} />
      <section className="content">
        <OrderForm />
        <div className="row">
          <h4
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Providence Health Drug Management
          </h4>
          <div className="box">
            <div className="box-body">
              <div
                className="table-responsive rounded card-table"
                style={styles.containerStyles}
              >
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">Name</th>
                      <th className="bb-2"> Code</th>
                      <th className="bb-2">Pack Size</th>
                      <th className="bb-2">Category</th>
                      <th className="bb-2">Manufacturer</th>
                      <th className="bb-2">Batch Number</th>
                      <th className="bb-2">Expiration Date</th>
                      <th className="bb-2">Quantity</th>
                      <th className="bb-2">Price</th>
                      <th className="bb-2">Description</th>
                      <th className="bb-2">Dose</th>
                      <th className="bb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((drug) => (
                      <tr key={drug.id}>
                        <td>{drug.name}</td>
                        <td>{drug.code}</td>
                        <td>{drug.pack_size}</td>
                        <td>{drug.category}</td>
                        <td>{drug.manufacturer}</td>
                        <td>{drug.batch_number}</td>
                        <td>
                          {new Date(drug.expiration_date).toLocaleDateString()}
                        </td>
                        <td>{drug.quantity}</td>
                        <td>{drug.price}</td>
                        <td>{drug.description}</td>
                        <td>{drug.dose}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Drugs;
