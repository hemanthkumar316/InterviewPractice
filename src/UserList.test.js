import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UserList from "./UserList";

// Mock axios
jest.mock("axios");

// Mock data
const mockUsers = [
  {
    "id": 1,
    "name": "Test User",
    "username": "Bret",
    "email": "sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "city": "Gwenborough"
    },
    "phone": "1-770-736-0988",
    "website": "hildegard.org"
  }
]

describe("UserList Component", () => {
  // Reset all mocks after each test to avoid test pollution
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test 1: Shows loading state initially
  it("should display loading indicator on initial render", () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // ✅ Test 2: Renders user list after successful API call
  it("should render list of users after successful API response", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    // Wait for loading to finish and users to appear
    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
    //   expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    });

    // Loading indicator should be gone
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // ✅ Test 3: Shows "No users found" when API returns empty array
  it('should display "No users found" when API returns empty array', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // ✅ Test 4: Shows "No users found" when API call fails
  it('should display "No users found" when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // ✅ Test 5: Calls the correct API endpoint
  it("should call the JSONPlaceholder users endpoint", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users"
      );
    });

    // Ensure it was called exactly once
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  // ✅ Test 6: Renders the correct number of user elements
  it("should render the correct number of user items", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      const userItems = screen.getAllByText(/Test/);
      expect(userItems).toHaveLength(1);
    });
  });

  // ✅ Test 7: Loading state is hidden after API call completes
  it("should hide loading indicator after data is fetched", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UserList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});