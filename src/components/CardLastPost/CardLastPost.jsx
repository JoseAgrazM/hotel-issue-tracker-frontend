import './CardLastPost.css';

export const CardLastPost = ({ post, isLast }) => {
	const { namePost, description, authorName, postStatus, nameRoomId } = post;

	return (
		<div className='last_post_wrap'>
			<article
				className={`last_post ${
					isLast && 'new'
				} ${postStatus.toLowerCase()}lastPost`}
			>
				<div className='card_header'>
					<span className='author_label'>Title:</span>
					<h3 className='card_title'>{namePost}</h3>
					<span className='card_room'>
						Room: <strong>{nameRoomId}</strong>
					</span>
				</div>

				<div className='card_description'>
					<p>{description}</p>
				</div>

				<div className='card_footer'>
					<div className='author_info'>
						<span className='author_label'>Author:</span>
						<span className='author_name'>
							<strong>{authorName}</strong>
						</span>
					</div>
				</div>
			</article>
		</div>
	);
};
