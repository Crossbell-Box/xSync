import { ActionIcon, Space, Text, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useWindowScroll } from "@mantine/hooks";

export default function Header({
	children,
	hasBackButton = false,
}: PropsWithChildren<{
	hasBackButton?: boolean;
}>) {
	const router = useRouter();

	const handleCLickBack = () => {
		// TODO: this would be a bug if the previous page was not the app
		if (history.length > 0) {
			router.back();
		} else {
			router.push("/feed");
		}
	};

	const [scroll] = useWindowScroll();

	const scrolled = scroll.y > 0;

	return (
		<>
			<div
				className="absolute top-0 left-0 right-0 z-0 h-100px"
				style={{
					background:
						"linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,1)), url(/images/header-texture.svg)",
				}}
			/>

			<header
				className={classNames(
					"sticky top-0 my-0 z-100 flex items-center relative transition-all duration-200",
					{
						"bg-white/96 backdrop-blur": scrolled,
					}
				)}
			>
				<Space w={8} />
				{hasBackButton && (
					<ActionIcon
						className="flex items-center justify-center"
						onClick={handleCLickBack}
					>
						<Text className="i-csb:back text-size-3xl" />
					</ActionIcon>
				)}
				<Space w={8} />
				<Title order={2} className="py-3 font-semibold text-size-4xl">
					{children}
				</Title>
			</header>
		</>
	);
}