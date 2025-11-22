import { createSlice,nanoid,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Async thunk for adding a todo
export const addTodoAsync = createAsyncThunk(
        'todo/addTodoAsync',
        async (text, { rejectWithValue }) => {
          try {
            const newTodo = { id: nanoid(), task: text, status: false };
            const response = await axios.post('http://localhost:3030/todos', newTodo);
            return response.data; // returned to fulfilled reducer
          } catch (error) {
            return rejectWithValue(error.response.data || error.message);
          }
        }
      );

export const fetchTodosAsync = createAsyncThunk(
        "todo/fetchTodosAsync",
        async () => {
          const res = await axios.get("http://localhost:3030/todos");
          return res.data;
        }
      );

// Delete todo
export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodoAsync",
  async (id) => {
    await axios.delete(`http://localhost:3030/todos/${id}`);
    return id; // return id to reducer
  }
);

//Update task status
export const updateTodosAsync = createAsyncThunk(
  "todo/updateTodoAsync",
  async (id) => {
   const res= await axios.patch(`http://localhost:3030/todos/${id}`);
    // return id; // return id to reducer
    console.log(res.data,"res.data");
      return res.data;
  }
)

const initialState ={ todos : [] };
                   
            
export const todoSlice = createSlice({
                name : "todo",
                initialState,
                reducers : {},
                extraReducers: (builder) => {
                    builder
                        .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                        state.todos = action.payload;
                        })
                      // Pending state
                      .addCase(addTodoAsync.pending, (state) => {
                        state.loading = true;
                        state.error = null;
                      })
                      // Fulfilled state
                      .addCase(addTodoAsync.fulfilled, (state, action) => {
                        state.todos.push(action.payload);
                        state.loading = false;
                      })
                      // Rejected state
                      .addCase(addTodoAsync.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.payload;
                      })
                      // Delete
                      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                      state.todos = state.todos.filter((t) => t.id !== action.payload);
                      })
                      // Update 
                       .addCase(updateTodosAsync.fulfilled, (state, action) => {
                        const updated = action.payload; // now contains todo object
                           const index = state.todos.findIndex(t => t.id === updated.id);
                          if (index !== -1) {
                              state.todos[index] = updated;
                          }
                        })
                  },
                        
                    }
                );

export const {addTodo ,deleteTodo, updateTodo} = todoSlice.actions; // to create action for each reducer
export default todoSlice.reducer;