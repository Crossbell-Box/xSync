import { create } from "zustand";

export type TwitterUnavailableNoticeModalState = {
	isActive: boolean;

	show: () => void;
	hide: () => void;
};

export const useTwitterUnavailableNoticeModalState =
	create<TwitterUnavailableNoticeModalState>((set) => ({
		isActive: false,

		show() {
			set({ isActive: true });
		},

		hide() {
			set({ isActive: false });
		},
	}));
