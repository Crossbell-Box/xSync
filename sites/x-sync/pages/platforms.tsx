import "react-medium-image-zoom/dist/styles.css";

import { Platforms } from "@/platforms";
import { UnbindingModal, TwitterUnavailableNoticeModal } from "@/modals";

export default function PlatformsPage() {
	return (
		<>
			<UnbindingModal />
			<TwitterUnavailableNoticeModal />
			<Platforms />
		</>
	);
}
