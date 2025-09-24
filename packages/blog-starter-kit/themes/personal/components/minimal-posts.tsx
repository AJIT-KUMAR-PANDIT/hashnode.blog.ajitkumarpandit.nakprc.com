import { PostFragment } from '../generated/graphql';
import { MinimalPostPreview } from './minimal-post-preview';

type Props = {
	posts: PostFragment[];
	context: 'home' | 'series' | 'tag';
};

export const MinimalPosts = ({ posts, context }: Props) => {
	return (
		<section className="w-full space-y-8">
			{context === 'home' && posts.length > 0 && (
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Latest Articles
					</h2>
					<span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
						{posts.length} {posts.length === 1 ? 'post' : 'posts'}
					</span>
				</div>
			)}

			<div className="grid gap-8">
				{posts.map((post, index) => (
					<div
						key={post.id}
						className="opacity-0 animate-in slide-in-from-bottom-4 duration-700"
						style={{
							animationDelay: `${index * 150}ms`,
							animationFillMode: 'forwards',
						}}
					>
						<MinimalPostPreview
							title={post.title}
							date={post.publishedAt}
							author={{
								name: post.author.name,
							}}
							slug={post.slug}
							commentCount={post.comments?.totalDocuments}
							brief={post.brief}
							tags={post.tags?.map((tag) => ({ name: tag.name, slug: tag.slug }))}
							readTimeInMinutes={post.readTimeInMinutes}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
