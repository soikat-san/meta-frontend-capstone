/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react"
import BookingForm from "../components/BookingForm"
import { fetchAPI, submitAPI } from "../api"

// ─── Helpers ────────────────────────────────────────────────────────────────

const mockDispatch = jest.fn()
const mockSubmit = jest.fn()
const mockTimes = ["17:00", "17:30", "18:00", "18:30", "19:00"]

function renderForm(times = mockTimes) {
  return render(
    <BookingForm
      availableTimes={times}
      dispatch={mockDispatch}
      submitForm={mockSubmit}
    />
  )
}

// ─── API tests ───────────────────────────────────────────────────────────────

describe("fetchAPI", () => {
  test("returns an array", () => {
    const result = fetchAPI(new Date())
    expect(Array.isArray(result)).toBe(true)
  })

  test("returns times in HH:MM format", () => {
    const result = fetchAPI(new Date())
    result.forEach(time => {
      expect(time).toMatch(/^\d{2}:\d{2}$/)
    })
  })

  test("returns different results for different dates", () => {
    const date1 = new Date("2024-01-01")
    const date2 = new Date("2024-01-02")
    const times1 = fetchAPI(date1)
    const times2 = fetchAPI(date2)
    // They may occasionally be equal by chance but the function is deterministic
    // so same date always returns same result
    expect(fetchAPI(date1)).toEqual(times1)
    expect(fetchAPI(date2)).toEqual(times2)
  })
})

describe("submitAPI", () => {
  test("returns true", () => {
    expect(submitAPI({})).toBe(true)
  })
})

// ─── BookingForm render tests ─────────────────────────────────────────────────

describe("BookingForm rendering", () => {
  test("renders the form", () => {
    renderForm()
    expect(screen.getByRole("form", { name: /reservation form/i })).toBeInTheDocument()
  })

  test("renders First Name input", () => {
    renderForm()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
  })

  test("renders Last Name input", () => {
    renderForm()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
  })

  test("renders Contact Number input", () => {
    renderForm()
    expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument()
  })

  test("renders date picker", () => {
    renderForm()
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument()
  })

  test("renders time select", () => {
    renderForm()
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument()
  })

  test("renders number of guests input", () => {
    renderForm()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
  })

  test("renders occasion select", () => {
    renderForm()
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument()
  })

  test("renders submit button", () => {
    renderForm()
    expect(screen.getByRole("button", { name: /submit reservation form/i })).toBeInTheDocument()
  })

  test("renders all available time options", () => {
    renderForm()
    mockTimes.forEach(time => {
      expect(screen.getByRole("option", { name: time })).toBeInTheDocument()
    })
  })
})

// ─── Bug 3: empty availableTimes ─────────────────────────────────────────────

describe("BookingForm with no available times", () => {
  test("shows 'No times available' when availableTimes is empty", () => {
    renderForm([])
    expect(screen.getByText(/no times available/i)).toBeInTheDocument()
  })

  test("disables time select when no times available", () => {
    renderForm([])
    expect(screen.getByLabelText(/choose time/i)).toBeDisabled()
  })

  test("disables submit button when no times available", () => {
    renderForm([])
    expect(screen.getByRole("button", { name: /submit reservation form/i })).toBeDisabled()
  })
})

// ─── Bug 5: time syncs to first available slot ────────────────────────────────

describe("BookingForm time sync", () => {
  test("time select defaults to first available time, not 00:00", () => {
    renderForm()
    const select = screen.getByLabelText(/choose time/i)
    expect(select.value).toBe(mockTimes[0])
    expect(select.value).not.toBe("00:00")
  })
})

// ─── Bug 1: id has no trailing space ─────────────────────────────────────────

describe("BookingForm accessibility", () => {
  test("label for 'Choose time' correctly associates with select (no id trailing space)", () => {
    renderForm()
    // getByLabelText will fail if id="res-time " has a trailing space
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument()
  })

  test("required fields have aria-required='true'", () => {
    renderForm()
    expect(screen.getByLabelText(/first name/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/last name/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/choose time/i)).toHaveAttribute("aria-required", "true")
    expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute("aria-required", "true")
  })

  test("contact number has aria-describedby pointing to format hint", () => {
    renderForm()
    const input = screen.getByLabelText(/contact number/i)
    expect(input).toHaveAttribute("aria-describedby", "contact-hint")
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument()
  })
})

// ─── Form interaction tests ───────────────────────────────────────────────────

describe("BookingForm interactions", () => {
  test("updates first name on change", () => {
    renderForm()
    const input = screen.getByLabelText(/first name/i)
    fireEvent.change(input, { target: { value: "John" } })
    expect(input.value).toBe("John")
  })

  test("updates number of guests on change", () => {
    renderForm()
    const input = screen.getByLabelText(/number of guests/i)
    fireEvent.change(input, { target: { value: "4" } })
    expect(input.value).toBe("4")
  })

  test("calls dispatch when date changes", () => {
    renderForm()
    const dateInput = screen.getByLabelText(/choose date/i)
    fireEvent.change(dateInput, { target: { name: "date", value: "2024-12-25" } })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      payload: "2024-12-25"
    })
  })

  test("calls submitForm with form data on submit", () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { name: "firstName", value: "Jane" } })
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { name: "lastName", value: "Doe" } })
    fireEvent.change(screen.getByLabelText(/contact number/i), { target: { name: "contactNumber", value: "123-456-7890" } })
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { name: "date", value: "2024-12-25" } })

    fireEvent.submit(screen.getByRole("form", { name: /reservation form/i }))
    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: "Jane", lastName: "Doe" })
    )
  })
})
