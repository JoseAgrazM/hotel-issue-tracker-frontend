import { createSlice } from '@reduxjs/toolkit';

export const companySlice = createSlice({
	name: 'company',
	initialState: {
		isLoadingCompany: true,
		companies: [],
		companyActive: null,
		errorMessage: null,
	},
	reducers: {
		onAddNewCompany: (state, { payload }) => {
			state.companies.push(payload);
		},
		onLoadCompanies: (state, { payload = [] }) => {
			state.isLoadingCompany = false;
			state.companies = [];
			payload.forEach(company => {
				state.companies.push(company);

				// const exist = state.companies.some(
				// 	dbCompany => dbCompany.id === company.id
				// );
				// if (!exist) state.companies.push(company);
			});
		},
		onShowErrorMesage: (state, { payload }) => {
			state.isLoadingCompany = false;
			state.errorMessage = payload;
		},
		clearErrorMessageCompany: state => {
			state.errorMessage = undefined;
		},
		onSetActiveCompany: (state, { payload }) => {
			state.companyActive = payload;
		},
		onLogoutCompany: state => {
			state.isLoadingCompany = true;
			state.companies = [];
			state.companyActive = null;
			state.errorMessage = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onAddNewCompany,
	onLoadCompanies,
	onShowErrorMesage,
	clearErrorMessageCompany,
	onSetActiveCompany,
	onLogoutCompany,
} = companySlice.actions;
