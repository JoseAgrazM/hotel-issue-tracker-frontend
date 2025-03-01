import './InfoPersonalProfile.css';

export const InfoPersonalProfile = ({ userLog }) => {
	const roleCaptilized = ` ${userLog?.role
		.charAt(0)
		.toUpperCase()}${userLog?.role.slice(1).toLowerCase()}`;

	return (
		<div className='info_personal'>
			<section>
				<p>
					Llevas{' '}
					{Math.floor(
						(Date.now() - new Date(userLog?.createdAt).getTime()) /
							(1000 * 60 * 60 * 24)
					)}{' '}
					días en la empresa
				</p>

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
