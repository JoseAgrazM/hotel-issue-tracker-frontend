import { useState, useMemo } from 'react';

export const useSortAndFilter = (initialPosts, initialState = '') => {
	const [sortById, setSortById] = useState(false);
	const [filterTitle, setFilterTitle] = useState(initialState);

	const toggleSortById = () => {
		setSortById(prevState => !prevState);
	};

	// Filtrar posts por título
	const filteredPosts = useMemo(() => {
		if (!filterTitle) return initialPosts; // Si no hay filtro, devuelve todos los posts

		return initialPosts.filter(post =>
			post.namePost.toLowerCase().includes(filterTitle.toLowerCase())
		);
	}, [initialPosts, filterTitle]);

	// Ordenar posts por ID (si sortById es true)
	const sortedPosts = useMemo(() => {
		return sortById
			? [...filteredPosts].sort((a, b) => a.id - b.id)
			: filteredPosts;
	}, [filteredPosts, sortById]);

	return {
		sortedPosts,
		filterTitle,
		setFilterTitle,
		toggleSortById,
		isSortedById: sortById,
	};
};
