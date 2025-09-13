import { configureStore } from '@reduxjs/toolkit'
import baseApi from './api/baseApi'
import employeesReducer from "@/lib/slice/employees/employeesSlice"
import { roleSlice } from './slice/role/roleSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      employees: employeesReducer,
      role: roleSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']