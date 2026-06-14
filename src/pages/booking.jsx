import { useReducer } from "react"
import BookingForm from "../components/BookingForm"
import { fetchAPI, submitAPI } from "../api"
import { useNavigate } from "react-router-dom"

function initializeTimes() {
  return fetchAPI(new Date())
}

function updateTimes(date) {
  const dateObj = new Date(date)
  return fetchAPI(dateObj)
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES":
      return updateTimes(action.payload)
    default:
      return state
  }
}

export default function BookingPage() {
  const navigate = useNavigate()
  const [availableTimes, dispatch] = useReducer(reducer, undefined, initializeTimes)

  function submitForm(formData) {
    const isSubmitted = submitAPI(formData)
    if (isSubmitted) {
      navigate("/confirmed")
    }
  }

  return (
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
      submitForm={submitForm}
    />
  )
}
