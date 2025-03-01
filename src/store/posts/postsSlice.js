import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		isLoadingPost: true,
		posts: [],
		postActive: null,
	},
	reducers: {
		onAddNewPost: (state, { payload }) => {
			state.posts.push(payload);
		},
		onLoadPosts: (state, { payload = [] }) => {
			state.isLoadingPost = false;
			state.posts = [];
			payload.forEach(post => {
				state.posts.push(post);

				// const exist = state.posts.some(dbPost => dbPost.id === post.id);
				// if (!exist) {
				// 	state.posts.push(post);
				// }
			});
		},
		onLogoutPosts: state => {
			state.isLoadingPost = true;
			state.posts = [];
			state.activePost = null;
		},

		onDeletePost: (state, { payload }) => {
			state.posts.filter(post => post.id !== payload.id);
		},
		onActivePost: (state, { payload }) => {
			state.postActive = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onAddNewPost,
	onLoadPosts,
	onLogoutPosts,
	onDeletePost,
	onActivePost,
} = postsSlice.actions;
