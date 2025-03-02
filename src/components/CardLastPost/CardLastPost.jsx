import './CardLastPost.css';

export const CardLastPost = ({ post, isLast }) => {
	const { namePost, description, authorName, postStatus } = post;
	return (
		<div className='last_post_wrap'>
			<article
				className={`last_post ${
					isLast && 'new'
				} ${postStatus.toLowerCase()}lastPost`}
			>
				<h3>{namePost}</h3>
				<p>{description}</p>
				<p>{authorName}</p>
			</article>
		</div>
	);
};
