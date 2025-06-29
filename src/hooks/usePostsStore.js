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
import { useNavigate } from 'react-router-dom';

export const usePostsStore = () => {
	const { isLoadingPost, posts, postActive } = useSelector(
		state => state.posts
	);
	const { companyActive, startLoadCompanyActive } = useCompanyStore();
	const { userLog } = useAuthStore();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const nameComplete = `${userLog?.name} ${userLog?.surname}`;

	const startCreatePost = async post => {
		try {
			if (userLog?.role === 'SUPERADMIN') {
				const { data } = await hotelManagerApi.post('/post/new', {
					...post,
					authorAdminId: userLog?.id,
					authorName: nameComplete,
					companyId: companyActive?.id,
					solvedAt: post?.postStatus !== 'DONE' ? null : new Date(),
					solvedById:
						post?.postStatus !== 'DONE' ? null : userLog?.id,
					solvedByName:
						post?.postStatus !== 'DONE' ? null : nameComplete,
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
			if (error?.response?.data?.msg === 'Token no valido') {
				navigate('/login');
			}
			Swal.fire(
				'Error al recuperar las habitaciones',
				error?.response?.data?.msg,
				'error'
			);
		}
	};

	const startRemovePost = async id => {
		try {
			Swal.fire({
				title: '¿Estás seguro?',
				text: '¡No podrás revertir esto!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '¡Sí, eliminar publicación!',
			}).then(async result => {
				if (result.isConfirmed) {
					const { data } = await hotelManagerApi.delete(
						`/post/${id}`
					);

					dispatch(onDeletePost(data.postDelete));
					startLoadCompanyActive(companyActive);
					Swal.fire({
						title: '¡Eliminado!',
						text: 'La publicación ha sido eliminada con éxito.',
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
