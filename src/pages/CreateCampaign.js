import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../api/campaignService";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    goal_amount: "",
    deadline: "",
    category: "",
    raised_amount: 0,
    web3_raised_amount: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateCampaignData(campaignData));
    setIsSubmitting(true);
  };

  const validateCampaignData = (data) => {
    let errors = {};

    if (!data.title.trim()) {
      errors.title = "Title is required";
    }

    if (!data.description.trim()) {
      errors.description = "Description is required";
    }

    if (!data.goal_amount || data.goal_amount <= 0) {
      errors.goal_amount = "Goal amount must be greater than 0";
    }

    if (!data.deadline || new Date(data.deadline) < new Date()) {
      errors.deadline = "Deadline must be in the future";
    }

    if (!data.category) {
      errors.category = "Please select a category";
    }

    return errors;
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      postCampaignData();
    }
  }, [errors]);

  const postCampaignData = async () => {
    try {
      const response = await createCampaign(campaignData);
      console.log("Campaign created successfully:", response);
      navigate("/"); // Redirect to the home page or any other route after successful campaign creation
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={campaignData.title}
        placeholder="Title"
      />
      {errors.title && <p>{errors.title}</p>}
      <textarea
        name="description"
        onChange={handleChange}
        value={campaignData.description}
        placeholder="Description"
      />
      {errors.description && <p>{errors.description}</p>}
      <input
        type="number"
        name="goal_amount"
        onChange={handleChange}
        value={campaignData.goal_amount}
        placeholder="Goal Amount"
      />
      {errors.goal_amount && <p>{errors.goal_amount}</p>}
      <input
        type="datetime-local"
        name="deadline"
        onChange={handleChange}
        value={campaignData.deadline}
        placeholder="Deadline"
      />
      {errors.deadline && <p>{errors.deadline}</p>}
      <select
        name="category"
        onChange={handleChange}
        value={campaignData.category}
      >
        <option value="">Select Category</option>
        <option value="AN">Animals</option>
        <option value="BU">Business</option>
        <option value="CO">Community</option>
        <option value="CR">Creative</option>
        <option value="ED">Education</option>
        <option value="EM">Emergencies</option>
        <option value="EN">Environment</option>
        <option value="EV">Events</option>
        <option value="FA">Faith</option>
        <option value="FM">Family</option>
        <option value="FN">Funeral & Memorial</option>
        <option value="MD">Medical</option>
        <option value="MB">Monthly Bills</option>
        <option value="NW">Newlyweds</option>
        <option value="OT">Other</option>
        <option value="SP">Sports</option>
        <option value="TR">Travel</option>
        <option value="UR">Ukraine Relief</option>
        <option value="VO">Volunteer</option>
        <option value="WI">Wishes</option>
      </select>
      {errors.category && <p>{errors.category}</p>}
      <input
        type="checkbox"
        name="is_active"
        checked={campaignData.is_active}
        onChange={(e) =>
          setCampaignData({ ...campaignData, is_active: e.target.checked })
        }
      />{" "}
      Is Active
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CreateCampaign;
