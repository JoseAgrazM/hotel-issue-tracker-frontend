import { useDispatch, useSelector } from 'react-redux';
import hotelManagerApi from '../api/HotelManagerApi';
import {
	onAddNewPost,
	onLoadPosts,
	onLogoutPosts,
	onDeletePost,
	onActivePost,
} from '../store';
import { useCompanyStore, useAuthStore } from './';
import Swal from 'sweetalert2';

export const usePostsStore = () => {
	const { isLoadingPost, posts, postActive } = useSelector(
		state => state.posts
	);
	const { companyActive, startLoadCompanyActive } = useCompanyStore();
	const { userLog } = useAuthStore();
	const dispatch = useDispatch();
	const nameComplete = `${userLog?.name} ${userLog?.surname}`;

	const startCreatePost = async post => {
		try {
			if (userLog.role === 'SUPERADMIN') {
				const { data } = await hotelManagerApi.post('/post/new', {
					...post,
					authorAdminId: userLog.id,
					authorName: nameComplete,
					companyId: companyActive.id,
					solvedAt: post.postStatus !== 'DONE' ? null : new Date(),
					solvedById: post.postStatus !== 'DONE' ? null : userLog?.id,
					solvedByName:
						post.postStatus !== 'DONE' ? null : nameComplete,
				});
				dispatch(onAddNewPost(data.postAdmin));
				startLoadCompanyActive(companyActive);
				return data;
			}

			const { data } = await hotelManagerApi.post('/post/new', {
				...post,
				authorId: userLog.id,
				authorName: nameComplete,
				companyId: companyActive.id,
				solvedAt: post.postStatus !== 'DONE' ? null : new Date(),
				solvedById: post.postStatus !== 'DONE' ? null : userLog?.id,
				solvedByName: post.postStatus !== 'DONE' ? null : nameComplete,
			});

			dispatch(onAddNewPost(data.postUser));
			startLoadCompanyActive(companyActive);

			return data;
		} catch (error) {
			Swal.fire(
				'Error al crear nuevo post',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startLoadPost = async () => {
		if (!companyActive?.id) return;

		try {
			const { data } = await hotelManagerApi.get(
				`/post/company/${companyActive?.id}`
			);

			dispatch(onLoadPosts(data?.posts));
		} catch (error) {
			Swal.fire(
				'Error al recuperar los posts',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startRemovePost = async id => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async result => {
				if (result.isConfirmed) {
					const { data } = await hotelManagerApi.delete(
						`/post/${id}`
					);

					dispatch(onDeletePost(data.postDelete));
					startLoadCompanyActive(companyActive);
					Swal.fire({
						title: 'Deleted!',
						text: 'Your file has been deleted.',
						icon: 'success',
					});
				}
			});
		} catch (error) {
			Swal.fire(
				'Error al eliminar usuario',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startPostActive = post => {
		dispatch(onActivePost(post));
	};

	const startEditPost = async post => {
		const { id, postStatus } = post;
		try {
			const { data } = await hotelManagerApi.patch(
				`/post/edit-post/${id}`,
				{
					...post,
					solvedAt: postStatus !== 'DONE' ? null : new Date(),
					solvedById: post.postStatus !== 'DONE' ? null : userLog?.id,
					solvedByName:
						post.postStatus !== 'DONE' ? null : nameComplete,
				}
			);

			startLoadCompanyActive(companyActive);
			return data;
		} catch (error) {
			Swal.fire(
				'Error al actualizar el post',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startClearPost = () => {
		dispatch(onLogoutPosts());
	};

	return {
		//* Properties
		isLoadingPost,
		posts,
		postActive,
		//* Methods
		startCreatePost,
		startLoadPost,
		startClearPost,
		startRemovePost,
		startPostActive,
		startEditPost,
	};
};
