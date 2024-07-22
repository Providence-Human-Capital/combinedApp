import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { API } from "../../../../config";
import { useSelector } from "react-redux";

const fetchDrugs = async () => {
  const { data } = await axios.get(`${API}/api/drug`);
  return data.data;
};

const createOrder = async ({ orderData, token }) => {
  const { data } = await axios.post(`${API}/api/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const OrderForm = () => {
  const token = useSelector((state) => state.auth.token);

  const queryClient = useQueryClient();
  const { data: drugs, isLoading: drugsLoading, error: drugsError } = useQuery("drugs", fetchDrugs);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [clinicName, setClinicName] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation((orderData) => createOrder({ orderData, token }), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("orders");
      alert("Order created successfully");
    },
    onError: (error) => {
      alert(`Error creating order: ${error.message}`);
    },
  });

  const handleAddDrug = () => {
    setSelectedDrugs([...selectedDrugs, { drug_id: "", quantity: 1 }]);
  };

  const handleDrugChange = (index, field, value) => {
    const newSelectedDrugs = [...selectedDrugs];
    newSelectedDrugs[index][field] = value;
    setSelectedDrugs(newSelectedDrugs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      clinic_name: clinicName,
      password,
      order_items: selectedDrugs,
    });
  };

  if (drugsLoading) return <div>Loading...</div>;
  if (drugsError) return <div>Error loading drugs</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Clinic Name</label>
        <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {selectedDrugs.map((selectedDrug, index) => (
        <div key={index}>
          <label>Drug</label>
          <select
            value={selectedDrug.drug_id}
            onChange={(e) => handleDrugChange(index, "drug_id", e.target.value)}
            required
          >
            <option value="">Select a drug</option>
            {drugs.map((drug) => (
              <option key={drug.id} value={drug.id}>
                {drug.name}
              </option>
            ))}
          </select>
          <label>Quantity</label>
          <input
            type="number"
            value={selectedDrug.quantity}
            onChange={(e) => handleDrugChange(index, "quantity", e.target.value)}
            min="1"
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddDrug}>
        Add Drug
      </button>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
