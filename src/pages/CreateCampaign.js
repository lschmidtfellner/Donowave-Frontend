import React, { useState } from "react";
import axios from "axios";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    goal_amount: "",
    deadline: "",
    category: "",
    raised_amount: 0,
    web3_raised_amount: 0,
    is_active: true,
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
    setErrors(validate(campaignData));
    setIsSubmitting(true);
  };

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!campaignData.title.trim()) {
      isValid = false;
      errors.title = "Title is required";
    }

    if (!campaignData.description.trim()) {
      isValid = false;
      errors.description = "Description is required";
    }

    if (!campaignData.goal_amount || campaignData.goal_amount <= 0) {
      isValid = false;
      errors.goal_amount = "Goal amount must be greater than 0";
    }

    if (
      !campaignData.deadline ||
      new Date(campaignData.deadline) < new Date()
    ) {
      isValid = false;
      errors.deadline = "Deadline must be in the future";
    }

    if (!campaignData.category) {
      isValid = false;
      errors.category = "Please select a category";
    }

    setErrors(errors);
    return isValid;
  };

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      postCampaignData();
    }
  }, [errors]);

  const postCampaignData = async () => {
    try {
      const response = await axios.post(
        "https://project4-fundraiser-52c48ba180da.herokuapp.com/api/campaigns/",
        campaignData
      );
      console.log("Campaign created successfully:", response.data);
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
