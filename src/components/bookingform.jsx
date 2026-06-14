import { useState, useEffect } from "react"

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    date: "",
    time: "",
    noOfGuests: 1,
    occasion: "Birthday"
  })

  useEffect(() => {
    if (availableTimes.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, time: availableTimes[0] }))
    } else {
      setFormData(prev => ({ ...prev, time: "" }))
    }
  }, [availableTimes])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    dispatch({ type: "UPDATE_TIMES", payload: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitForm(formData)
  }

  const currentDate = new Date().toISOString().split("T")[0]

  const options =
    availableTimes.length > 0
      ? availableTimes.map(time => (
          <option key={time} value={time}>
            {time}
          </option>
        ))
      : <option disabled value="">No times available for this date</option>

  return (
    <main>
      <p className="desc-text form-desc">
        Please fill in the form below accurately to enable us serve you nicely.
      </p>
      <form onSubmit={handleSubmit} aria-label="Table reservation form">

        <div className="seperate">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
            required
            aria-required="true"
          />
        </div>

        <div className="seperate">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            required
            aria-required="true"
          />
        </div>

        <div className="seperate">
          <label htmlFor="contact-number">
            Contact Number{" "}
            <span id="contact-hint" style={{ fontSize: "14px", fontWeight: 400 }}>
              (Format: 123-456-7890)
            </span>
          </label>
          <input
            type="text"
            id="contact-number"
            name="contactNumber"
            placeholder="123-456-7890"
            value={formData.contactNumber}
            onChange={handleFormChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            aria-required="true"
            aria-describedby="contact-hint"
          />
        </div>

        <div className="seperate date-time">
          <div className="seperate-child">
            <label htmlFor="res-date">Choose date</label>
            <input
              type="date"
              id="res-date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              required
              aria-required="true"
              min={currentDate}
            />
          </div>
          <div className="seperate-child">
            <label htmlFor="res-time">Choose time</label>
            <select
              id="res-time"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
              required
              aria-required="true"
              disabled={availableTimes.length === 0}
            >
              {options}
            </select>
          </div>
        </div>

        <div className="seperate guests-occasion">
          <div className="seperate-child">
            <label htmlFor="guests">Number of guests</label>
            <input
              type="number"
              placeholder="1"
              min="1"
              max="10"
              required
              aria-required="true"
              id="guests"
              name="noOfGuests"
              value={formData.noOfGuests}
              onChange={handleFormChange}
            />
          </div>
          <div className="seperate-child">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              required
              aria-required="true"
              value={formData.occasion}
              onChange={handleFormChange}
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>
        </div>

        <input
          className="submit"
          type="submit"
          value="Reserve"
          aria-label="Submit reservation form"
          disabled={availableTimes.length === 0}
        />
      </form>
    </main>
  )
}
