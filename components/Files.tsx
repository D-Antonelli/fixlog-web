import { useState } from "react";
import Image from "next/image";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL
	? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}`
	: "https://gateway.pinata.cloud";

export default function Files(props: any) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const uri = `${GATEWAY_URL}/ipfs/${props.cid}/${encodeURIComponent(props.fileName)}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}&img-width=200&img-height=150&img-fit=contain`;

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleImageError = () => {
		setLoading(false);
		setError(true);
	};

	return (
		<div className="file-viewer">
			<a
				href={uri}
				rel="noopener noreferrer"
				target="_blank"
				className="relative border-b-2 border-solid border-accent bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent animate-animategradient hover:scale-110 transition-all duration-300 ease-in-out"
			>
				{/* Show a loading image with subtle pulse animation */}
				{loading && !error && (
					<div className="flex w-[200px] items-center justify-center bg-gray-200 animate-pulse inset-0">
						<Image
							src="/loading.png" // Update with the correct path to the "loading" image
							alt="Loading..."
							width={200}
							height={150}
							className="opacity-50 animate-pulse" // Add subtle pulse animation
						/>
				</div>
				)}
				{/* Show fallback image if there's an error */}
				{error ? (
					<img
						src="/image-not-loaded.png" // Replace with your fallback image path
						alt="Image failed to load"
						width={200}
						height={150}
					/>
				) : (
					<img
						src={uri}
						alt={props.alt}
						width={200}
						height={150}
						onLoad={handleImageLoad}
						onError={handleImageError}
						style={{ display: loading ? 'none' : 'block' }} // Hide original image while loading
					/>
				)}
			</a>
		</div>
	);
}