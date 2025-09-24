import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const PersonalHeader = () => {
	const { publication } = useAppContext();
	const [isScrolled, setIsScrolled] = useState(false);

	// Handle scroll effect for header
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);

	const navList = (
		<ul className="hidden lg:flex list-none flex-row items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a 
						href={item.url} 
						target="_blank" 
						rel="noopener noreferrer" 
						className="relative transition-all duration-300 hover:text-primary-500 dark:hover:text-primary-400 group"
					>
						{item.label}
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="relative transition-all duration-300 hover:text-primary-500 dark:hover:text-primary-400 group flex items-center gap-1">
								More
								<svg className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="flex flex-col items-stretch gap-1 rounded-xl border bg-white/90 backdrop-blur-sm text-sm font-medium text-neutral-600 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800/90 dark:text-neutral-300 p-2 min-w-[160px] animate-in fade-in-0 zoom-in-95"
								sideOffset={5}
								align="end"
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block w-full px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-primary-500 dark:hover:text-primary-400"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-sm ${
			isScrolled 
				? 'bg-white/80 dark:bg-neutral-950/80 shadow-sm border-b border-gray-200/50 dark:border-neutral-800/50' 
				: 'bg-transparent'
		}`}>
			<div className="max-w-2xl mx-auto px-5 py-6">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<h1 className="flex-shrink-0">
							<Link
								className="group flex flex-row items-center gap-3 text-xl font-bold leading-tight tracking-tight text-black dark:text-white transition-all duration-300 hover:scale-105"
								href="/"
								aria-label={`${publication.author.name}'s blog home page`}
							>
								{publication.author.profilePicture && (
									<div className="relative">
										<img
											className="block h-10 w-10 rounded-full fill-current transition-all duration-300 group-hover:ring-2 group-hover:ring-primary-500/20 group-hover:ring-offset-2 group-hover:ring-offset-white dark:group-hover:ring-offset-neutral-950"
											alt={publication.author.name}
											src={resizeImage(publication.author.profilePicture, {
												w: 400,
												h: 400,
												c: 'face',
											})}
										/>
										<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950 animate-pulse" />
									</div>
								)}
								<div className="flex flex-col">
									<span className="leading-tight">{publication.title}</span>
									{publication.descriptionSEO && (
										<span className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-tight mt-0.5">
											{publication.descriptionSEO.slice(0, 50)}...
										</span>
									)}
								</div>
							</Link>
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<nav>{navList}</nav>
						
						{/* Subscribe/Newsletter Button for larger screens */}
						<div className="hidden lg:block">
							<button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl">
								Subscribe
							</button>
						</div>

						{/* Mobile menu button */}
						<button className="lg:hidden p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};
