import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    users: [],
    isLoading: false,
    error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await axios.get('http://localhost:8000/user')
    return res.data
})

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
    const res = await axios.post('http://localhost:8000/user', newUser)
})

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
    const res = await axios.patch(`http://localhost:8000/user/${data.id}`, {
      name: data.name,
      email: data.email,
      phone: data.phone
    })
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const res = await axios.delete(`http://localhost:8000/user/${id}`)
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = 'Error: Unable to connect to server'
      })
      // builder.addCase(addUser.pending, (state, action) => {
      //   state.isLoading = true
      // })
      builder.addCase(addUser.fulfilled, (state, action) => {
        // state.isLoading = false
        state.users = [...state.users, action.payload]
      })
      builder.addCase(addUser.rejected, (state, action) => {
        // state.isLoading = false
        state.error = 'Error: Unable to add new contact'
      })
      builder.addCase(updateUser.fulfilled, (state, action) => {
        // state.isLoading = false
        state.users = [...state.users, action.payload]
      })
      builder.addCase(updateUser.rejected, (state, action) => {
        // state.isLoading = false
        state.error = 'Error: Unable to update contact'
      })
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        // state.isLoading = false
        state.users = state.users.filter(user => user.id !== action.payload)
      })
      builder.addCase(deleteUser.rejected, (state, action) => {
        // state.isLoading = false
        state.error = 'Error: Unable to delete contact'
      })
    },
})

// export const { updateUser } = userSlice.actions
export default userSlice.reducer;