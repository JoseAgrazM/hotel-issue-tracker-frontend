export const InfoPersonalProfile = ({
	userLog,
	companyActive,
	postsCompany,
}) => {
	const roleCapitalized = `${userLog?.role
		?.charAt(0)
		?.toUpperCase()}${userLog?.role?.slice(1)?.toLowerCase()}`;

	const timeInCompany = Math.floor(
		(Date.now() - new Date(userLog?.createdAt).getTime()) /
			(1000 * 60 * 60 * 24)
	);

	const postsUserLogInCompany = postsCompany?.filter(
		post =>
			post?.authorAdminId === userLog?.id ||
			post?.authorId === userLog?.id
	);

	return (
		<div className='max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6 text-gray-800'>
			<section className='text-lg space-y-4'>
				<p className='font-semibold text-xl'>
					{timeInCompany === 1
						? `Llevas ${timeInCompany} día en la empresa`
						: `Llevas ${timeInCompany} días en la empresa`}
				</p>

				<p className='text-lg'>
					<strong className='font-semibold'>Role:</strong>{' '}
					<span className='info_role_profile text-blue-600 font-medium'>
						{roleCapitalized}
					</span>
				</p>

				<p className='text-lg'>
					<strong className='font-semibold'>Posts publicados:</strong>{' '}
					<span className='font-medium'>
						{postsUserLogInCompany?.length || 0}
					</span>
				</p>

				<p className='text-lg'>
					<strong className='font-semibold'>
						Posts completados:
					</strong>{' '}
					<span className='font-medium'>
						{postsCompany?.filter(
							post => post?.solvedById === userLog?.id
						)?.length || 0}
					</span>
				</p>
			</section>
		</div>
	);
};
