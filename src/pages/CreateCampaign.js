import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaign } from '../api/campaignService';
import Swal from 'sweetalert2';

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    goal_amount: '',
    deadline: '',
    category: '',
    raised_amount: 0,
    web3_raised_amount: 0
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCampaignData({
      ...campaignData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors(validateCampaignData(campaignData))
    setIsSubmitting(true)
    setTimeout(() => {
      window.location.reload()
  }, 2000)
  Swal.fire({
      icon: 'success',
      title: "You have successfully created a campaign!"
  }).then(() => {
    navigate('/myaccount');
  });
  }

  const validateCampaignData = (data) => {
    let errors = {}

    if (!data.title.trim()) {
      errors.title = 'Title is required'
    }

    if (!data.description.trim()) {
      errors.description = 'Description is required'
    }

    if (!data.goal_amount || data.goal_amount <= 0) {
      errors.goal_amount = 'Goal amount must be greater than 0'
    }

    if (!data.deadline || new Date(data.deadline) < new Date()) {
      errors.deadline = 'Deadline must be in the future'
    }

    if (!data.category) {
      errors.category = 'Please select a category'
    }

    return errors
  }

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      postCampaignData()
    }
  }, [errors])

  const postCampaignData = async () => {
    try {
      const response = await createCampaign(campaignData)
      console.log('Campaign created successfully:', response)
      navigate('/') // Redirect to the home page or any other route after successful campaign creation
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

  return (
    <div className="flex flex-col items-center mt-8 w-full mx-auto max-w-screen-lg z-50">
      <div className="w-10/12 mt-4 bg-white rounded-md py-8">
        <div className="w-full text-center">
          <form onSubmit={handleSubmit}>
            <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10 ml-8">
              Create a Campaign
            </h2>
            <div className="lg:w-2/5 md:w-2/5 w-10/12 text-left mx-auto">
              <label className="font-bold text-xs ml-4">TITLE:</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={campaignData.title}
                placeholder="Title"
                className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
              />
              {errors.title && <p>{errors.title}</p>}
            </div>
            <div className="lg:w-2/5 md:w-2/5 w-10/12 text-left mx-auto">
            <label className="font-bold text-xs ml-4">DESCRIPTION:</label>
              <input
                name="description"
                onChange={handleChange}
                value={campaignData.description}
                placeholder="Description"
                className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
              />
              {errors.description && <p>{errors.description}</p>}
            </div>
            <div className="lg:w-2/5 md:w-2/5 w-10/12 text-left mx-auto">
            <label className="font-bold text-xs ml-4">GOAL:</label>
              <input
                type="number"
                name="goal_amount"
                onChange={handleChange}
                value={campaignData.goal_amount}
                placeholder="Goal Amount"
                className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
              />
              {errors.goal_amount && <p>{errors.goal_amount}</p>}
            </div>
            <div className="lg:w-2/5 md:w-2/5 w-10/12 text-left mx-auto">
            <label className="font-bold text-xs ml-4">DEADLINE:</label>
              <input
                type="datetime-local"
                name="deadline"
                onChange={handleChange}
                value={campaignData.deadline}
                placeholder="Deadline"
                className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
              />
              {errors.deadline && <p>{errors.deadline}</p>}
            </div>
            <div className="lg:w-2/5 md:w-2/5 w-10/12 text-left mx-auto">
            <label className="font-bold text-xs ml-4">SELECT CATEGORY:</label>
              <select
                name="category"
                onChange={handleChange}
                value={campaignData.category}

                className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
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
            </div>
            <button type="submit" className="aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/2 text-white font-bold  hover:text-black mt-4 text-xs">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign
