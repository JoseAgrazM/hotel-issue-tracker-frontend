import './CardLastPost.css';

export const CardLastPost = ({ post, isLast }) => {
	const { id, namePost, description, authorName } = post;
	return (
		<div className='last_post_wrap'>
			<article className={`last_post ${isLast && 'new'}`}>
				<h3>
					{id} - {namePost}
				</h3>
				<p>{description}</p>
				<p>{authorName}</p>
			</article>
		</div>
	);
};
