import './InfoPersonalProfile.css';

export const InfoPersonalProfile = ({ userLog }) => {
	const roleCaptilized = ` ${userLog?.role?.charAt(0)?.toUpperCase()}${userLog?.role?.slice(1)?.toLowerCase()}`;

	const timeInCompany = Math.floor(
		(Date.now() - new Date(userLog?.createdAt).getTime()) /
			(1000 * 60 * 60 * 24)
	);

	return (
		<div className='info_personal'>
			<section>
				{timeInCompany === 1 ? (
					<p>Llevas {timeInCompany} día en la empresa</p>
				) : (
					<p>Llevas {timeInCompany} días en la empresa</p>
				)}

				<p>
					<strong>Role: </strong>
					<label className='info_role_profile'>
						{roleCaptilized}
					</label>
				</p>
				<p>
					<strong>Posts publicados: </strong>
					{userLog?.posts?.length || 0}
				</p>
				<p>
					<strong>Posts completados: </strong>
					{userLog?.posts?.filter(
						post => post.solvedById === userLog?.id
					)?.length || 0}
				</p>
			</section>
		</div>
	);
};
