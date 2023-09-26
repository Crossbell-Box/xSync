import React from "react";
import { Modal, Button, Card, LoadingOverlay } from "@mantine/core";

import { useUnbindAccount } from "@crossbell/connect-kit";
import { useAccountCharacter } from "@crossbell/connect-kit";

import { useTwitterUnavailableNoticeModalState } from "@/modals/twitter-unavailable-notice.modal.state";

export function openTwitterUnavailableNoticeModal() {
	useTwitterUnavailableNoticeModalState.getState().show();
}

export function TwitterUnavailableNoticeModal() {
	const { isActive, hide } = useTwitterUnavailableNoticeModalState();

	const character = useAccountCharacter();

	const unbindAccount = useUnbindAccount(character?.characterId);

	return (
		<Modal
			opened={isActive}
			onClose={hide}
			zIndex={11}
			padding={0}
			classNames={{ content: "rounded-28px overflow-hidden" }}
			withCloseButton={false}
			closeOnClickOutside={true}
			closeOnEscape={true}
		>
			<Card className="flex flex-col justify-between">
				<LoadingOverlay visible={unbindAccount.isLoading} />

				<Card.Section>
					<div className="p-24px mb-24px">
						<h4 className="text-24px leading-32px font-400 mt-0 mb-12px">
							Oops, there's something wrong
						</h4>

						<p className="text-16px leading-24px font-400 mt-0 mb-48px">
							Due to the new API policy of X (aka. Twitter), currently we are
							facing issues with its content syncing. <br />
							<br />
							We've provided a{" "}
							<a
								className="text-blue-primary"
								href="https://crossbell-io-updates.xlog.app/How-to-import-all-history-tweets-onto-Crossbell"
							>
								Full Sync
							</a>{" "}
							manual if you'd like to fully sync those to your Crossbell
							Character. <br />
							<br />
							Sorry for the inconvenience and thanks for your patience. If
							there's any updates on the syncing issue, we'd like to share with
							you ASAP.
						</p>
					</div>
				</Card.Section>

				<div className="flex flex-row justify-end">
					<Button
						className="font-500"
						color="blue"
						variant="outline"
						size="md"
						radius={100}
						onClick={hide}
					>
						Got it
					</Button>
				</div>
			</Card>
		</Modal>
	);
}
