import Image from "next/image";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL
	? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}`
	: "https://gateway.pinata.cloud";

export default function Files(props: any) {
	const uri = `${GATEWAY_URL}/ipfs/${props.cid}/${encodeURIComponent(props.fileName)}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`
	return (
		<div className="file-viewer">
			<a
				href={uri}
				rel="noopener noreferrer"
				target="_blank"
				className="border-b-2 border-solid border-accent bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent animate-animategradient hover:scale-110 transition-all duration-300 ease-in-out"
			>
				<Image src={uri} alt={props.alt} width={200} height={150} />
			</a>
		</div>
	);
}
